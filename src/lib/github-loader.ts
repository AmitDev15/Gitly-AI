import { db } from "~/server/db";
import { GithubRepoLoader } from "@langchain/community/document_loaders/web/github";
import type { Document } from "@langchain/core/documents";
import { generateEmbedding, summarizeCode } from "./gemini";
import { Octokit } from "octokit";
import { get } from "http";

const getFileCount = async (
  path: string,
  octokit: Octokit,
  githubOwner: string,
  githubRepo: string,
  acc: number = 0,
) => {
  const { data } = await octokit.rest.repos.getContent({
    owner: githubOwner,
    repo: githubRepo,
    path,
  });
  if (!Array.isArray(data) && data.type === "file") {
    return acc + 1;
  }
  if (Array.isArray(data)) {
    let fileCount = 0;
    const directories: string[] = [];
    for (const item of data) {
      if (item.type === "dir") {
        directories.push(item.path);
      } else {
        fileCount++;
      }
    }
    if (directories.length > 0) {
      const directoryCounts = await Promise.all(
        directories.map((dirPath) =>
          getFileCount(dirPath, octokit, githubOwner, githubRepo, 0),
        ),
      );
      fileCount += directoryCounts.reduce((acc, count) => acc + count, 0);
    }
    return acc + fileCount;
  }
  return acc;
};

export const checkCredits = async (githubUrl: string, githubToken?: string) => {
  const octokit = new Octokit({
    auth: githubToken,
  });
  const githubOwner = githubUrl.split("/")[3];
  const githubRepo = githubUrl.split("/")[4];
  if (!githubOwner || !githubRepo) {
    return 0;
  }
  const fileCount = await getFileCount("", octokit, githubOwner, githubRepo, 0);
  return fileCount;
};

export const loadGithubRepo = async (
  githubUrl: string,
  githubToken?: string,
) => {
  const loader = new GithubRepoLoader(githubUrl, {
    accessToken: githubToken || "",
    branch: "main",
    ignoreFiles: [
      "package-lock.json",
      "yarn.lock",
      "pnpm-lock.yaml",
      "bun.lockb",
    ],
    recursive: true,
    unknown: "warn",
    maxConcurrency: 5,
  });
  const docs = await loader.load();
  return docs;
};

export const indexGithubRepo = async (
  projectId: string,
  githubUrl: string,
  githubToken?: string,
) => {
  const docs = await loadGithubRepo(githubUrl, githubToken);
  const allEmbeddings = await generateEmbeddings(docs);

  const results = await Promise.allSettled(
    allEmbeddings.map(async (embedding, index) => {
      console.log(
        `Processing ${index + 1} of ${allEmbeddings.length} embeddings`,
      );
      if (!embedding) {
        console.log(`Skipping embedding ${index + 1} - no data`);
        return;
      }

      try {
        const sourceCodeEmbedding = await db.sourceCodeEmbedding.create({
          data: {
            summary: embedding.summary,
            sourceCode: embedding.sourceCode,
            fileName: embedding.fileName,
            projectId,
          },
        });

        console.log(
          `Created embedding record ${sourceCodeEmbedding.id} for file: ${embedding.fileName}`,
        );

        const vectorString = `[${embedding.embedding.join(",")}]`;
        console.log(
          `Updating vector for ${sourceCodeEmbedding.id}, vector length: ${embedding.embedding.length}`,
        );

        await db.$executeRaw`UPDATE "SourceCodeEmbedding" SET "summaryEmbedding" = ${vectorString}::vector WHERE "id" = ${sourceCodeEmbedding.id}`;

        console.log(`✓ Successfully updated vector for ${embedding.fileName}`);
      } catch (error) {
        console.error(`Error processing embedding ${index + 1}:`, error);
        throw error;
      }
    }),
  );

  const succeeded = results.filter((r) => r.status === "fulfilled").length;
  const failed = results.filter((r) => r.status === "rejected").length;
  console.log(`Indexing complete: ${succeeded} succeeded, ${failed} failed`);
};

const generateEmbeddings = async (docs: Document[]) => {
  return await Promise.all(
    docs.map(async (doc) => {
      const summary = await summarizeCode(doc);
      const embedding = await generateEmbedding(summary);
      return {
        summary,
        embedding,
        sourceCode: JSON.parse(JSON.stringify(doc.pageContent)),
        fileName: doc.metadata.source,
      };
    }),
  );
};
