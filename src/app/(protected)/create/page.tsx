"use client";
import {
  Info,
  Github,
  Sparkles,
  CheckCircle,
  Loader2,
  Link2,
  FolderGit2,
  Key,
  AlertCircle,
} from "lucide-react";
import React from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import { Label } from "~/components/ui/label";
import useRefetch from "~/hooks/use-refetch";
import { api } from "~/trpc/react";

type FormInput = {
  repoUrl: string;
  projectName: string;
  githubToken?: string;
};

const CreatePage = () => {
  const { register, handleSubmit, reset } = useForm<FormInput>();
  const createProject = api.project.createProject.useMutation();
  const checkCredits = api.project.checkCredits.useMutation();
  const refetch = useRefetch();

  function onSubmit(data: FormInput) {
    if (!!checkCredits.data) {
      createProject.mutate(
        {
          name: data.projectName,
          githubUrl: data.repoUrl,
          githubToken: data.githubToken,
        },
        {
          onSuccess: () => {
            toast.success("Project created successfully!", {
              description: "Your repository is being indexed.",
            });
            refetch();
            reset();
          },
          onError: (error) => {
            toast.error("Failed to create project", {
              description: "Please try again later.",
            });
          },
        },
      );
    } else {
      checkCredits.mutate({
        githubUrl: data.repoUrl,
        githubToken: data.githubToken,
      });
    }
  }

  const hasEnoughCredits = checkCredits?.data?.userCredits
    ? checkCredits.data.fileCount <= checkCredits.data.userCredits
    : true;

  return (
    <div className="flex min-h-[calc(100vh-200px)] items-center justify-center p-6">
      <div className="grid w-full max-w-6xl gap-8 lg:grid-cols-2">
        {/* Left Section - Illustration & Info */}
        <div className="flex flex-col justify-center space-y-6">
          <div className="space-y-3">
            <div className="bg-primary/10 inline-flex items-center gap-2 rounded-full px-4 py-2">
              <Sparkles className="text-primary size-4" />
              <span className="text-primary text-sm font-semibold">
                AI-Powered Repository Analysis
              </span>
            </div>
            <h1 className="text-4xl leading-tight font-bold lg:text-5xl">
              Link Your GitHub Repository
            </h1>
            <p className="text-muted-foreground text-lg">
              Connect your repository and let AI help you understand your
              codebase better.
            </p>
          </div>

          {/* Illustration */}
          <div className="relative">
            <div className="from-primary/20 to-primary/5 absolute inset-0 rounded-2xl bg-gradient-to-br blur-3xl"></div>
            <div className="bg-card relative flex items-center justify-center rounded-2xl border p-12">
              <img
                src="/github.svg"
                alt="GitHub illustration"
                className="h-48 w-auto transition-transform hover:scale-105"
              />
            </div>
          </div>

          {/* Features List */}
          <div className="space-y-3">
            <div className="flex items-center gap-3 text-sm">
              <div className="flex size-8 items-center justify-center rounded-lg bg-green-100 dark:bg-green-950">
                <CheckCircle className="size-4 text-green-600 dark:text-green-400" />
              </div>
              <span>Automatic code indexing and analysis</span>
            </div>
            <div className="flex items-center gap-3 text-sm">
              <div className="flex size-8 items-center justify-center rounded-lg bg-blue-100 dark:bg-blue-950">
                <CheckCircle className="size-4 text-blue-600 dark:text-blue-400" />
              </div>
              <span>AI-powered Q&A about your codebase</span>
            </div>
            <div className="flex items-center gap-3 text-sm">
              <div className="flex size-8 items-center justify-center rounded-lg bg-purple-100 dark:bg-purple-950">
                <CheckCircle className="size-4 text-purple-600 dark:text-purple-400" />
              </div>
              <span>Commit summaries and insights</span>
            </div>
          </div>
        </div>

        {/* Right Section - Form */}
        <div className="flex flex-col justify-center">
          <Card className="border-primary/20 shadow-xl">
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="from-primary/20 to-primary/10 flex size-12 items-center justify-center rounded-xl bg-gradient-to-br">
                  <Github className="text-primary size-6" />
                </div>
                <div>
                  <CardTitle className="text-2xl">Create New Project</CardTitle>
                  <CardDescription>
                    Enter your repository details to get started
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                {/* Project Name */}
                <div className="space-y-2">
                  <Label
                    htmlFor="projectName"
                    className="flex items-center gap-2"
                  >
                    <FolderGit2 className="size-4" />
                    Project Name
                  </Label>
                  <Input
                    id="projectName"
                    placeholder="My Awesome Project"
                    type="text"
                    {...register("projectName", { required: true })}
                    required
                    className="h-11"
                  />
                </div>

                {/* Repository URL */}
                <div className="space-y-2">
                  <Label htmlFor="repoUrl" className="flex items-center gap-2">
                    <Link2 className="size-4" />
                    GitHub Repository URL
                  </Label>
                  <Input
                    id="repoUrl"
                    placeholder="https://github.com/username/repo"
                    type="url"
                    {...register("repoUrl", { required: true })}
                    required
                    className="h-11"
                  />
                </div>

                {/* GitHub Token */}
                <div className="space-y-2">
                  <Label
                    htmlFor="githubToken"
                    className="flex items-center gap-2"
                  >
                    <Key className="size-4" />
                    GitHub Token
                    <span className="text-muted-foreground text-xs">
                      (Optional)
                    </span>
                  </Label>
                  <Input
                    id="githubToken"
                    placeholder="ghp_xxxxxxxxxxxx"
                    type="password"
                    {...register("githubToken")}
                    className="h-11"
                  />
                  <p className="text-muted-foreground text-xs">
                    Required for private repositories
                  </p>
                </div>

                {/* Credit Info */}
                {!!checkCredits.data && (
                  <Card
                    className={`${
                      hasEnoughCredits
                        ? "border-green-200 bg-green-50 dark:border-green-900/50 dark:bg-green-950/20"
                        : "border-red-200 bg-red-50 dark:border-red-900/50 dark:bg-red-950/20"
                    }`}
                  >
                    <CardContent className="p-4">
                      <div className="flex gap-3">
                        <div
                          className={`flex size-10 shrink-0 items-center justify-center rounded-lg ${
                            hasEnoughCredits
                              ? "bg-green-100 dark:bg-green-900/30"
                              : "bg-red-100 dark:bg-red-900/30"
                          }`}
                        >
                          {hasEnoughCredits ? (
                            <Info className="size-5 text-green-600 dark:text-green-400" />
                          ) : (
                            <AlertCircle className="size-5 text-red-600 dark:text-red-400" />
                          )}
                        </div>
                        <div className="space-y-1">
                          <p
                            className={`text-sm font-semibold ${
                              hasEnoughCredits
                                ? "text-green-900 dark:text-green-100"
                                : "text-red-900 dark:text-red-100"
                            }`}
                          >
                            {hasEnoughCredits
                              ? "Ready to Create"
                              : "Insufficient Credits"}
                          </p>
                          <p
                            className={`text-sm ${
                              hasEnoughCredits
                                ? "text-green-700 dark:text-green-300"
                                : "text-red-700 dark:text-red-300"
                            }`}
                          >
                            This repository has{" "}
                            <strong>{checkCredits.data?.fileCount}</strong>{" "}
                            files and will cost{" "}
                            <strong>{checkCredits.data?.fileCount}</strong>{" "}
                            credits.
                          </p>
                          <p className="text-muted-foreground text-xs">
                            You have{" "}
                            <strong>{checkCredits.data?.userCredits}</strong>{" "}
                            credits available.
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                )}

                {/* Submit Button */}
                <Button
                  type="submit"
                  className="w-full gap-2"
                  size="lg"
                  disabled={
                    createProject.isPending ||
                    checkCredits.isPending ||
                    !hasEnoughCredits
                  }
                >
                  {createProject.isPending || checkCredits.isPending ? (
                    <>
                      <Loader2 className="size-5 animate-spin" />
                      {createProject.isPending ? "Creating..." : "Checking..."}
                    </>
                  ) : (
                    <>
                      {!!checkCredits.data ? (
                        <>
                          <Github className="size-5" />
                          Create Project
                        </>
                      ) : (
                        <>
                          <Sparkles className="size-5" />
                          Check Credits
                        </>
                      )}
                    </>
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default CreatePage;
