"use client";
import React, { Fragment, useState } from "react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "~/components/ui/sheet";
import useProject from "~/hooks/use-project";
import { api } from "~/trpc/react";
import AskQuestionCard from "../dashboard/ask-question-card";
import MDEditor from "@uiw/react-md-editor";
import CodeReferences from "../dashboard/code-references";
import { Calendar, FileCode, MessageSquare, Sparkles } from "lucide-react";
import { Card } from "~/components/ui/card";

const QAPage = () => {
  const { projectId } = useProject();
  const { data: questions } = api.project.getQuestions.useQuery({ projectId });
  const [questionIndex, setQuestionIndex] = useState(0);
  const question = questions?.[questionIndex];
  return (
    <Sheet>
      <div className="space-y-6">
        <AskQuestionCard />
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="bg-primary/10 flex size-10 items-center justify-center rounded-xl">
                <MessageSquare className="text-primary size-5" />
              </div>
              <div>
                <h1 className="text-2xl font-bold">Saved Questions</h1>
                <p className="text-muted-foreground text-sm">
                  View your previous Q&A history
                </p>
              </div>
            </div>
            {questions && questions.length > 0 && (
              <div className="bg-primary/10 text-primary rounded-full px-4 py-2 text-sm font-semibold">
                {questions.length}{" "}
                {questions.length === 1 ? "Question" : "Questions"}
              </div>
            )}
          </div>
          {questions && questions.length > 0 ? (
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {questions.map((question, index) => (
                <Fragment key={question.id}>
                  <SheetTrigger onClick={() => setQuestionIndex(index)} asChild>
                    <Card className="group hover:border-primary/30 w-full cursor-pointer transition-all hover:shadow-lg">
                      <div className="space-y-4 p-5">
                        {/* Header with Avatar and Date */}
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <img
                              className="ring-primary/20 rounded-full ring-2"
                              height={40}
                              width={40}
                              src={question.user.imageUrl ?? ""}
                              alt="User avatar"
                            />
                            <div className="flex flex-col">
                              <span className="text-xs font-medium">
                                {question.user.firstName}{" "}
                                {question.user.lastName}
                              </span>
                              <span className="text-muted-foreground flex items-center gap-1 text-xs">
                                <Calendar className="size-3" />
                                {question.createdAt.toLocaleDateString()}
                              </span>
                            </div>
                          </div>
                          <Sparkles className="text-primary size-5 opacity-60 transition-opacity group-hover:opacity-100" />
                        </div>

                        {/* Question */}
                        <div className="space-y-2">
                          <h3 className="line-clamp-2 text-base leading-tight font-semibold">
                            {question.question}
                          </h3>
                          <p className="text-muted-foreground line-clamp-3 text-sm leading-relaxed">
                            {question.answer}
                          </p>
                        </div>

                        {/* Footer */}
                        <div className="border-t pt-3">
                          <div className="flex items-center justify-between text-xs">
                            <span className="text-muted-foreground flex items-center gap-1">
                              <FileCode className="size-3" />
                              {(question.filesReferences as any[])?.length ||
                                0}{" "}
                              files referenced
                            </span>
                            <span className="text-primary font-medium group-hover:underline">
                              View Details →
                            </span>
                          </div>
                        </div>
                      </div>
                    </Card>
                  </SheetTrigger>
                </Fragment>
              ))}
            </div>
          ) : (
            <Card className="border-dashed">
              <div className="flex flex-col items-center justify-center py-16 text-center">
                <div className="bg-muted mb-4 rounded-full p-6">
                  <MessageSquare className="text-muted-foreground size-12" />
                </div>
                <h3 className="mb-2 text-lg font-semibold">
                  No saved questions yet
                </h3>
                <p className="text-muted-foreground mb-4 text-sm">
                  Start asking questions about your codebase to see them here
                </p>
              </div>
            </Card>
          )}
        </div>
      </div>
      {/*Question Detail Sheet */}
      {question && (
        <SheetContent className="overflow-y-auto sm:max-w-[90vw]">
          <SheetHeader className="space-y-4">
            <div className="flex items-start gap-3">
              <div className="bg-primary/10 flex size-12 shrink-0 items-center justify-center rounded-xl">
                <Sparkles className="text-primary size-6" />
              </div>
              <div className="flex-1 space-y-1">
                <SheetTitle className="text-xl leading-tight">
                  {question.question}
                </SheetTitle>
                <div className="text-muted-foreground flex items-center gap-4 text-sm">
                  <div className="flex items-center gap-2">
                    <img
                      className="rounded-full"
                      height={24}
                      width={24}
                      src={question.user.imageUrl ?? ""}
                      alt="User avatar"
                    />
                    <span>
                      {question.user.firstName} {question.user.lastName}
                    </span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Calendar className="size-4" />
                    {question.createdAt.toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </div>
                </div>
              </div>
            </div>

            {/* Answer Section */}
            <div className="border-primary/20 from-background to-primary/5 space-y-4 rounded-xl border bg-gradient-to-br p-6 shadow-sm">
              <div className="border-primary/10 flex items-center gap-2 border-b pb-3">
                <Sparkles className="text-primary size-5" />
                <h3 className="font-semibold">AI-Generated Answer</h3>
              </div>
              <div
                data-color-mode="light"
                className="prose prose-sm max-w-none"
              >
                <MDEditor.Markdown
                  source={question.answer}
                  className="[&::-webkit-scrollbar-thumb]:bg-primary rounded-lg border bg-white p-6 shadow-inner [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-track]:bg-gray-100"
                />
              </div>
            </div>

            {/* Code References Section */}
            {(question.filesReferences as any[])?.length > 0 && (
              <div className="bg-muted/30 space-y-3 rounded-xl border p-6">
                <h4 className="flex items-center gap-2 text-sm font-semibold">
                  <FileCode className="size-4" />
                  Referenced Files ({(question.filesReferences as any[]).length}
                  )
                </h4>
                <CodeReferences
                  filesReferences={(question.filesReferences ?? []) as any}
                />
              </div>
            )}
          </SheetHeader>
        </SheetContent>
      )}
    </Sheet>
  );
};

export default QAPage;
