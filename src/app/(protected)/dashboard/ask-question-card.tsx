"use client";

import { DialogTitle } from "@radix-ui/react-dialog";
import { Loader2, Sparkles } from "lucide-react";
import Image from "next/image";
import React, { useState } from "react";
import { Button } from "~/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import { Dialog, DialogContent, DialogHeader } from "~/components/ui/dialog";
import { Textarea } from "~/components/ui/textarea";
import useProject from "~/hooks/use-project";
import { cn } from "~/lib/utils";
import { askQuestion } from "./action";
import { readStreamableValue } from "@ai-sdk/rsc";
import MDEditor from "@uiw/react-md-editor";
import CodeReferences from "./code-references";
import { api } from "~/trpc/react";
import { toast } from "sonner";
import useRefetch from "~/hooks/use-refetch";

const AskQuestionCard = () => {
  const { project } = useProject();
  const [open, setOpen] = useState(false);
  const [question, setQuestion] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [filesReferences, setFilesReferences] = useState<
    { fileName: string; sourceCode: string; summary: string }[]
  >([]);
  const [answer, setAnswer] = useState("");
  const saveAnswer = api.project.saveAnswer.useMutation();

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setAnswer("");
    setFilesReferences([]);
    if (!project?.id) return;

    setIsLoading(true);

    const { output, filesReferences } = await askQuestion(question, project.id);
    setOpen(true);
    setFilesReferences(filesReferences);

    // console.log(
    //   "========================Received streamable value:=======================>\n",
    //   output,
    // );
    // console.log(
    //   "========================Received file references:=======================>\n",
    //   filesReferences,
    // );

    for await (const delta of readStreamableValue(output)) {
      if (delta) {
        setAnswer((ans) => ans + delta);
      }
    }
    setIsLoading(false);
  };

  const refetch = useRefetch();

  return (
    <>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="[&::-webkit-scrollbar-thumb]:bg-primary [&::-webkit-scrollbar-thumb]:hover:bg-primary/80 gap-0 overflow-y-scroll p-0 sm:max-h-[90vh] sm:max-w-[90vw] [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-track]:bg-gray-100">
          {/* Header Section */}
          <DialogHeader className="from-primary/10 via-primary/5 to-background border-b bg-gradient-to-r p-6">
            <div className="flex items-start justify-between gap-4">
              <DialogTitle className="flex items-center gap-3">
                <div className="bg-primary/10 ring-primary/20 flex size-10 items-center justify-center rounded-xl ring-2">
                  <Sparkles className="text-primary size-5" />
                </div>
                <div>
                  <h2 className="text-xl font-bold">AI Response</h2>
                  <p className="text-muted-foreground text-sm font-normal">
                    Powered by Gitly AI
                  </p>
                </div>
              </DialogTitle>
              <div className="flex items-center gap-2">
                <Button
                  disabled={saveAnswer.isPending}
                  variant="default"
                  size="sm"
                  className="mr-8 gap-2"
                  onClick={() => {
                    saveAnswer.mutate(
                      {
                        projectId: project!.id,
                        question,
                        answer,
                        filesReferences,
                      },
                      {
                        onSuccess: () => {
                          toast.success("Answer saved successfully!");
                          refetch();
                        },
                        onError: () => {
                          toast.error("Failed to save answer");
                        },
                      },
                    );
                  }}
                >
                  {saveAnswer.isPending ? (
                    <>
                      <Loader2 className="size-4 animate-spin" />
                      Saving...
                    </>
                  ) : (
                    <>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="size-4"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z" />
                        <polyline points="17 21 17 13 7 13 7 21" />
                        <polyline points="7 3 7 8 15 8" />
                      </svg>
                      Save Answer
                    </>
                  )}
                </Button>
              </div>
            </div>
          </DialogHeader>

          {/* Content Section */}
          <div className="flex-1 overflow-hidden p-6">
            {isLoading ? (
              <div className="flex h-full flex-col items-center justify-center gap-4 py-12">
                <div className="relative">
                  <Loader2 className="text-primary size-16 animate-spin" />
                  <Sparkles className="text-primary/60 absolute inset-0 m-auto size-6 animate-pulse" />
                </div>
                <div className="text-center">
                  <p className="text-lg font-semibold">
                    Analyzing your codebase...
                  </p>
                  <p className="text-muted-foreground text-sm">
                    This may take a few moments
                  </p>
                </div>
              </div>
            ) : (
              <div className="space-y-6">
                {/* Question Display */}
                <div className="border-primary/30 bg-primary/5 rounded-lg border border-dashed p-4">
                  <p className="text-muted-foreground mb-1 text-xs font-semibold tracking-wider uppercase">
                    Your Question
                  </p>
                  <p className="text-sm font-medium">{question}</p>
                </div>

                {/* Answer Section */}
                <div className="border-primary/20 from-background to-primary/5 rounded-xl border bg-gradient-to-br shadow-sm">
                  <div className="border-primary/10 bg-primary/5 flex items-center gap-2 border-b px-4 py-3">
                    <Sparkles className="text-primary size-5" />
                    <h3 className="font-semibold">AI-Generated Response</h3>
                    <div className="bg-primary/20 text-primary ml-auto rounded-full px-3 py-1 text-xs font-medium">
                      {filesReferences.length} files referenced
                    </div>
                  </div>

                  <div className="p-6">
                    <div className="prose prose-sm prose-slate dark:prose-invert max-w-none">
                      <div data-color-mode="light">
                        <MDEditor.Markdown
                          source={answer || "No response generated."}
                          className="[&::-webkit-scrollbar-thumb]:bg-primary [&::-webkit-scrollbar-thumb]:hover:bg-primary/80 !h-full max-h-[45vh] overflow-y-auto rounded-lg border bg-white p-6 shadow-inner dark:bg-slate-950 [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-track]:bg-gray-100"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Code References */}
                {filesReferences.length > 0 && (
                  <div className="bg-muted/30 rounded-xl border p-4">
                    <h4 className="mb-3 flex items-center gap-2 text-sm font-semibold">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="size-4"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <polyline points="16 18 22 12 16 6" />
                        <polyline points="8 6 2 12 8 18" />
                      </svg>
                      Referenced Files
                    </h4>
                    <CodeReferences filesReferences={filesReferences} />
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Footer Section */}
          <div className="bg-muted/30 border-t p-4">
            <div className="flex items-center justify-between">
              <p className="text-muted-foreground text-xs">
                Response generated using semantic search and AI analysis
              </p>
              <Button
                type="button"
                variant="outline"
                onClick={() => {
                  setOpen(false);
                }}
              >
                Close
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      <Card className="border-primary/20 group relative col-span-3 overflow-hidden shadow-md transition-all duration-300 hover:shadow-xl">
        {/* Gradient accent with animation */}
        <div className="from-primary/30 via-primary to-primary/30 absolute inset-x-0 top-0 h-1 bg-gradient-to-r transition-all group-hover:h-1.5" />

        <CardHeader className="space-y-1">
          <div className="flex items-center gap-2">
            <div className="bg-primary/10 flex size-8 items-center justify-center rounded-lg">
              <Sparkles className="text-primary size-4" />
            </div>
            <CardTitle className="text-xl">Ask a Question</CardTitle>
          </div>
          <p className="text-muted-foreground text-sm">
            Get instant answers about your codebase using AI
          </p>
        </CardHeader>

        <CardContent>
          <form onSubmit={onSubmit} className="space-y-4">
            <div className="relative">
              <Textarea
                placeholder="What would you like to know about your codebase?"
                className={cn(
                  "min-h-[140px] resize-none rounded-lg border-2 transition-colors",
                  "focus:border-primary focus:ring-primary/20 focus:ring-2",
                  "placeholder:text-muted-foreground/60",
                )}
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
                disabled={isLoading}
              />
              <div className="text-muted-foreground absolute right-3 bottom-3 text-xs">
                {question.length} characters
              </div>
            </div>

            <div className="mt-6 flex items-center justify-between">
              <p className="text-muted-foreground text-xs">
                {project?.name ? (
                  <>
                    Analyzing: <span className="font-bold">{project.name}</span>
                  </>
                ) : (
                  "Select a project to get started"
                )}
              </p>
              <Button
                type="submit"
                disabled={!question.trim() || isLoading || !project}
                className="min-w-[120px]"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 size-4 animate-spin" />
                    Thinking...
                  </>
                ) : (
                  <>
                    <Sparkles className="mr-2 size-4" />
                    Ask Gitly
                  </>
                )}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </>
  );
};

export default AskQuestionCard;
