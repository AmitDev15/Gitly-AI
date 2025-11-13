import z from "zod";
import { createTRPCRouter, protectedProcedure, publicProcedure } from "../trpc";
import { pollCommits } from "~/lib/github";
import { checkCredits, indexGithubRepo } from "~/lib/github-loader";
import { stat } from "fs";
import { get } from "http";

export const projectRouter = createTRPCRouter({
  createProject: protectedProcedure
    .input(
      z.object({
        name: z.string(),
        githubUrl: z.string(),
        githubToken: z.string().optional(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      try {
        const user = await ctx.db.user.findUnique({
          where: { id: ctx.user.userId! },
          select: { credits: true },
        });
        if (!user) {
          throw new Error("User not found");
        }
        const currentCredits = user.credits || 0;
        const fileCount = await checkCredits(
          input.githubUrl,
          input.githubToken,
        );
        if (fileCount > currentCredits) {
          throw new Error(
            `Insufficient credits. You have ${currentCredits} credits but the repository requires ${fileCount} credits.`,
          );
        }
        const project = await ctx.db.project.create({
          data: {
            name: input.name,
            githubUrl: input.githubUrl,
            githubToken: input.githubToken,
            userToProjects: {
              create: {
                userId: ctx.user.userId!,
              },
            },
          },
        });

        // console.log("Project created:", project.id);

        // Run these in the background
        indexGithubRepo(project.id, input.githubUrl, input.githubToken)
          .then(() => console.log("Indexing completed"))
          .catch((error) => console.error("Indexing error:", error));

        pollCommits(project.id)
          .then(() => console.log("Polling completed"))
          .catch((error) => console.error("Polling error:", error));

        await ctx.db.user.update({
          where: { id: ctx.user.userId! },
          data: {
            credits: { decrement: fileCount },
          },
        });

        return project;
      } catch (error) {
        console.error("Error creating project:", error);
        throw error;
      }
    }),
  getProjects: protectedProcedure.query(async ({ ctx }) => {
    return await ctx.db.project.findMany({
      where: {
        userToProjects: {
          some: {
            userId: ctx.user.userId!,
          },
        },
        deletedAt: null,
      },
    });
  }),
  getCommits: protectedProcedure
    .input(
      z.object({
        projectId: z.string(),
      }),
    )
    .query(async ({ ctx, input }) => {
      pollCommits(input.projectId).then().catch(console.error);
      return await ctx.db.githubCommit.findMany({
        where: { projectId: input.projectId },
      });
    }),

  reindexProject: protectedProcedure
    .input(
      z.object({
        projectId: z.string(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const project = await ctx.db.project.findUnique({
        where: { id: input.projectId },
      });

      if (!project) {
        throw new Error("Project not found");
      }

      // Delete existing embeddings
      await ctx.db.sourceCodeEmbedding.deleteMany({
        where: { projectId: input.projectId },
      });

      console.log("Deleted existing embeddings, starting re-index...");

      // Re-index
      await indexGithubRepo(
        project.id,
        project.githubUrl,
        project.githubToken || undefined,
      );

      return { success: true };
    }),

  saveAnswer: protectedProcedure
    .input(
      z.object({
        projectId: z.string(),
        question: z.string(),
        answer: z.string(),
        filesReferences: z.any(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      return await ctx.db.question.create({
        data: {
          answer: input.answer,
          filesReferences: input.filesReferences,
          projectId: input.projectId,
          question: input.question,
          userId: ctx.user.userId!,
        },
      });
    }),

  getQuestions: protectedProcedure
    .input(z.object({ projectId: z.string() }))
    .query(async ({ ctx, input }) => {
      return await ctx.db.question.findMany({
        where: { projectId: input.projectId },
        include: { user: true },
        orderBy: { createdAt: "desc" },
      });
    }),
  uploadMeetingRecording: protectedProcedure
    .input(
      z.object({
        projectId: z.string(),
        meetingUrl: z.string(),
        name: z.string(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const meeting = await ctx.db.meeting.create({
        data: {
          meetingAudioUrl: input.meetingUrl,
          projectId: input.projectId,
          name: input.name,
          userId: ctx.user.userId!,
          status: "PROCESSING",
        },
      });
      return meeting;
    }),

  getMeetings: protectedProcedure
    .input(z.object({ projectId: z.string() }))
    .query(async ({ ctx, input }) => {
      return await ctx.db.meeting.findMany({
        where: { projectId: input.projectId },
        include: { issues: true },
        orderBy: { createdAt: "desc" },
      });
    }),

  deleteMeeting: protectedProcedure
    .input(z.object({ meetingId: z.string() }))
    .mutation(async ({ ctx, input }) => {
      return await ctx.db.meeting.delete({
        where: { id: input.meetingId },
      });
    }),

  getMeetingById: protectedProcedure
    .input(z.object({ meetingId: z.string() }))
    .query(async ({ ctx, input }) => {
      return await ctx.db.meeting.findUnique({
        where: { id: input.meetingId },
        include: { issues: true },
      });
    }),

  archiveProject: protectedProcedure
    .input(z.object({ projectId: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const project = await ctx.db.project.update({
        where: { id: input.projectId },
        data: { deletedAt: new Date() },
      });
      return project;
    }),

  getTeamMembers: protectedProcedure
    .input(z.object({ projectId: z.string() }))
    .query(async ({ ctx, input }) => {
      return await ctx.db.userToProject.findMany({
        where: { projectId: input.projectId },
        include: { user: true },
      });
    }),

  getMyCredits: protectedProcedure.query(async ({ ctx }) => {
    return await ctx.db.user.findUnique({
      where: { id: ctx.user.userId! },
      select: { credits: true },
    });
  }),

  checkCredits: protectedProcedure
    .input(
      z.object({ githubUrl: z.string(), githubToken: z.string().optional() }),
    )
    .mutation(async ({ ctx, input }) => {
      const fileCount = await checkCredits(input.githubUrl, input.githubToken);
      const userCredits = await ctx.db.user.findUnique({
        where: { id: ctx.user.userId! },
        select: { credits: true },
      });
      return { fileCount, userCredits: userCredits?.credits || 0 };
    }),

  getCreditsTransaction: protectedProcedure.query(async ({ ctx }) => {
    return await ctx.db.stripeTransaction.findMany({
      where: { userId: ctx.user.userId! },
      orderBy: { createdAt: "desc" },
    });
  }),
});
