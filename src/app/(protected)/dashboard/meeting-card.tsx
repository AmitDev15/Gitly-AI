"use client";
import React, { useState } from "react";
import { Card, CardContent } from "~/components/ui/card";
import { useDropzone } from "react-dropzone";
import { uploadFile } from "~/lib/firebase";
import { Presentation, Upload, FileAudio, Sparkles } from "lucide-react";
import { Button } from "~/components/ui/button";
import { Progress } from "~/components/ui/progress";
import { cn } from "~/lib/utils";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import { api } from "~/trpc/react";
import useProject from "~/hooks/use-project";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";

const MeetingCard = () => {
  const { project } = useProject();
  const processMeeting = useMutation({
    mutationFn: async (data: {
      meetingAudioUrl: string;
      meetingId: string;
      projectId: string;
    }) => {
      const { meetingAudioUrl, meetingId, projectId } = data;
      const response = await axios.post("/api/process-meeting", {
        meetingAudioUrl,
        meetingId,
        projectId,
      });
      return response.data;
    },
  });
  const router = useRouter();
  const [isUploading, setIsUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const uploadMeeting = api.project.uploadMeetingRecording.useMutation();
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: {
      "audio/*": [".mp3", ".wav", ".m4a"],
    },
    multiple: false,
    maxSize: 50_000_000,
    onDrop: async (acceptedFiles) => {
      if (!project) return;
      setIsUploading(true);
      const file = acceptedFiles[0];
      if (!file) return;
      const downloadURL = (await uploadFile(
        file as File,
        setProgress,
      )) as string;
      uploadMeeting.mutate(
        {
          projectId: project.id,
          meetingUrl: downloadURL,
          name: file.name,
        },
        {
          onSuccess: (meeting) => {
            toast.success("Meeting uploaded successfully!");
            router.push("/meetings");
            processMeeting.mutateAsync({
              meetingAudioUrl: downloadURL,
              meetingId: meeting.id,
              projectId: project.id,
            });
          },
          onError: () => {
            toast.error("Failed to upload meeting.");
          },
        },
      );
      setIsUploading(false);
    },
  });

  return (
    <Card
      className={cn(
        "border-primary/20 group relative col-span-2 overflow-hidden shadow-md transition-all duration-300 hover:shadow-xl",
        isDragActive &&
          "border-primary from-primary/10 via-primary/5 ring-primary/20 bg-gradient-to-br to-transparent shadow-xl ring-2",
      )}
    >
      {/* Gradient accent with animation */}
      <div className="from-primary/30 via-primary to-primary/30 absolute inset-x-0 top-0 h-1 bg-gradient-to-r transition-all group-hover:h-1.5" />

      <CardContent className="p-2">
        <div
          {...getRootProps()}
          className={cn(
            "border-primary/20 via-primary/[0.02] relative flex cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed bg-gradient-to-br from-transparent to-transparent p-2 transition-all duration-300",
            isDragActive &&
              "border-primary from-primary/10 via-primary/5 scale-[0.99] bg-gradient-to-br to-transparent",
            !isDragActive &&
              "hover:border-primary/40 hover:from-primary/5 hover:via-primary/[0.03] hover:bg-gradient-to-br hover:to-transparent hover:shadow-inner",
          )}
        >
          {!isUploading ? (
            <div className="flex flex-col items-center text-center">
              {/* Icon Section with enhanced gradient */}
              <div className="relative mb-1 animate-bounce">
                <div className="from-primary/20 via-primary/10 to-primary/5 group-hover:from-primary/30 group-hover:via-primary/15 group-hover:to-primary/10 flex size-8 items-center justify-center rounded-2xl bg-gradient-to-br shadow-lg transition-all duration-300 group-hover:scale-110 group-hover:shadow-xl">
                  <Presentation className="text-primary size-8 transition-transform duration-300 group-hover:scale-110" />
                </div>
                <div className="from-primary to-primary/80 text-primary-foreground ring-background absolute -top-1.5 -right-1.5 flex size-5 items-center justify-center rounded-full bg-gradient-to-br shadow-lg ring-2 transition-all duration-300 group-hover:scale-110 group-hover:rotate-12">
                  <Sparkles className="size-2.5 animate-pulse" />
                </div>
              </div>

              {/* Text Content */}
              <h3 className="from-foreground to-foreground/80 mb-1 bg-gradient-to-r bg-clip-text text-lg font-bold text-transparent">
                Create a New Meeting
              </h3>
              <p className="text-muted-foreground mb-0.5 text-sm font-medium">
                Analyze your meeting with Gitly AI
              </p>
              <p className="text-muted-foreground/80 mb-4 text-xs">
                Supports MP3, WAV, M4A • Max 50MB
              </p>

              {/* Upload Button */}
              <div className="flex flex-col items-center gap-2">
                <Button
                  size="default"
                  className="from-primary to-primary/90 gap-2 bg-gradient-to-r px-6 shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-xl"
                >
                  <Upload className="size-4" />
                  Upload Meeting Audio
                </Button>
                <p className="text-muted-foreground text-xs font-medium">
                  or drag and drop your file here
                </p>
              </div>

              <input className="hidden" {...getInputProps()} />
            </div>
          ) : (
            <div className="flex w-full flex-col items-center gap-3 py-4">
              {/* Uploading State with enhanced styling */}
              <div className="from-primary/20 via-primary/10 to-primary/5 ring-primary/10 flex size-14 items-center justify-center rounded-full bg-gradient-to-br shadow-lg ring-4">
                <FileAudio className="text-primary size-7 animate-pulse" />
              </div>
              <div className="w-full max-w-xs space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="font-semibold">Uploading...</span>
                  <span className="text-primary font-bold">{progress}%</span>
                </div>
                <Progress value={progress} className="h-2 shadow-inner" />
              </div>
              <p className="text-muted-foreground text-xs font-medium">
                Please wait while we upload your meeting audio
              </p>
            </div>
          )}
        </div>

        {/* Features Info with enhanced styling */}
        {!isUploading && (
          <div className="mt-4 grid grid-cols-3 gap-3">
            <div className="group/feature text-center transition-transform hover:scale-105">
              <div className="from-primary/20 via-primary/10 to-primary/5 group-hover/feature:from-primary/30 group-hover/feature:via-primary/15 group-hover/feature:to-primary/10 mx-auto mb-1.5 flex size-9 items-center justify-center rounded-lg bg-gradient-to-br shadow-sm transition-all duration-300 group-hover/feature:shadow-md">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="text-primary size-4.5 transition-transform duration-300 group-hover/feature:scale-110"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M12 20v-6M6 20V10M18 20V4" />
                </svg>
              </div>
              <p className="text-muted-foreground group-hover/feature:text-foreground text-xs font-semibold transition-colors">
                AI Transcription
              </p>
            </div>
            <div className="group/feature text-center transition-transform hover:scale-105">
              <div className="from-primary/20 via-primary/10 to-primary/5 group-hover/feature:from-primary/30 group-hover/feature:via-primary/15 group-hover/feature:to-primary/10 mx-auto mb-1.5 flex size-9 items-center justify-center rounded-lg bg-gradient-to-br shadow-sm transition-all duration-300 group-hover/feature:shadow-md">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="text-primary size-4.5 transition-transform duration-300 group-hover/feature:scale-110"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                </svg>
              </div>
              <p className="text-muted-foreground group-hover/feature:text-foreground text-xs font-semibold transition-colors">
                Smart Summary
              </p>
            </div>
            <div className="group/feature text-center transition-transform hover:scale-105">
              <div className="from-primary/20 via-primary/10 to-primary/5 group-hover/feature:from-primary/30 group-hover/feature:via-primary/15 group-hover/feature:to-primary/10 mx-auto mb-1.5 flex size-9 items-center justify-center rounded-lg bg-gradient-to-br shadow-sm transition-all duration-300 group-hover/feature:shadow-md">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="text-primary size-4.5 transition-transform duration-300 group-hover/feature:scale-110"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
                </svg>
              </div>
              <p className="text-muted-foreground group-hover/feature:text-foreground text-xs font-semibold transition-colors">
                Key Insights
              </p>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default MeetingCard;
