"use client";
import React from "react";
import useProject from "~/hooks/use-project";
import { api } from "~/trpc/react";
import MeetingCard from "../dashboard/meeting-card";
import Link from "next/link";
import { Badge } from "~/components/ui/badge";
import { Button } from "~/components/ui/button";
import { Card } from "~/components/ui/card";
import {
  Calendar,
  FileText,
  ArrowRight,
  Loader2,
  Clock,
  Check,
  Trash,
} from "lucide-react";
import { toast } from "sonner";
import { ref } from "firebase/storage";
import useRefetch from "~/hooks/use-refetch";

const MeetingsPage = () => {
  const { projectId } = useProject();
  const { data: meetings, isLoading } = api.project.getMeetings.useQuery(
    { projectId },
    { refetchInterval: 5000 },
  );
  const deleteMeeting = api.project.deleteMeeting.useMutation();
  const refetch = useRefetch();

  return (
    <div className="space-y-6">
      <MeetingCard />

      {/* Header Section */}
      <div className="flex items-center justify-between border-b pb-4">
        <div>
          <h1 className="from-primary via-primary/80 to-primary/60 bg-gradient-to-r bg-clip-text text-3xl font-bold text-transparent">
            Your Meetings
          </h1>
          <p className="text-muted-foreground mt-1 text-sm">
            {meetings?.length || 0} total meetings recorded
          </p>
        </div>
      </div>

      {/* Loading State */}
      {isLoading && (
        <Card className="flex items-center justify-center py-16">
          <div className="flex flex-col items-center gap-3">
            <Loader2 className="text-primary size-8 animate-spin" />
            <p className="text-muted-foreground text-sm">Loading meetings...</p>
          </div>
        </Card>
      )}

      {/* Empty State */}
      {!isLoading && meetings && meetings.length === 0 && (
        <Card className="flex flex-col items-center justify-center gap-4 rounded-lg border border-dashed py-16">
          <div className="bg-muted rounded-full p-4">
            <FileText className="text-muted-foreground size-8" />
          </div>
          <div className="text-center">
            <h3 className="text-lg font-semibold">No meetings yet</h3>
            <p className="text-muted-foreground mt-1 max-w-md text-sm">
              Upload your first meeting recording to get started with AI-powered
              meeting analysis
            </p>
          </div>
        </Card>
      )}

      {/* Meetings List - Table Style */}
      {!isLoading && meetings && meetings.length > 0 && (
        <div className="overflow-hidden rounded-lg border">
          <div className="divide-y">
            {meetings.map((meeting, index) => (
              <Link
                key={meeting.id}
                href={`/meetings/${meeting.id}`}
                className="group hover:bg-muted/50 block transition-colors"
              >
                <Card className="border-primary/20 p-2 shadow-md transition-all duration-300 hover:shadow-xl">
                  <div className="flex items-center justify-between gap-6 p-4">
                    {/* Left Section */}
                    <div className="flex min-w-0 flex-1 items-center gap-4">
                      {/* Number Badge */}
                      <div className="bg-primary/10 text-primary flex size-10 shrink-0 items-center justify-center rounded-md text-sm font-semibold">
                        {index + 1}
                      </div>

                      {/* Meeting Info */}
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center gap-2">
                          <h3 className="group-hover:text-primary truncate text-lg font-semibold">
                            {meeting.name}
                          </h3>
                          {meeting.status === "PROCESSING" && (
                            <Badge
                              variant="outline"
                              className="shrink-0 border-yellow-700 bg-yellow-500/20 font-bold text-yellow-700"
                            >
                              <Loader2 className="mr-1 size-3 animate-spin" />
                              Processing
                            </Badge>
                          )}
                          {meeting.status === "COMPLETED" && (
                            <Badge
                              variant="outline"
                              className="shrink-0 border-green-700/50 bg-green-500/20 text-green-700"
                            >
                              <Check className="mr-1 size-3" />
                              Completed
                            </Badge>
                          )}
                        </div>

                        <div className="text-muted-foreground mt-1 flex items-center gap-4 text-sm">
                          <div className="flex items-center gap-1.5">
                            <Calendar className="size-3.5" />
                            <span>
                              {meeting.createdAt.toLocaleDateString()}
                            </span>
                          </div>
                          <div className="flex items-center gap-1.5">
                            <Clock className="size-3.5" />
                            <span>
                              {meeting.createdAt.toLocaleTimeString()}
                            </span>
                          </div>
                          <div className="flex items-center gap-1.5">
                            <FileText className="size-3.5" />
                            <span>
                              {meeting.issues.length}{" "}
                              {meeting.issues.length === 1 ? "issue" : "issues"}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Right Section - Actions */}
                    <div className="flex shrink-0 items-center justify-center gap-2">
                      <Button
                        variant="outline"
                        className="group/btn border-primary/50 bg-primary/10 text-primary hover:text-primary hover:bg-primary/20 h-9 gap-2 px-3"
                      >
                        <span>View</span>
                        <ArrowRight className="size-4 transition-transform group-hover/btn:translate-x-1" />
                      </Button>
                      <Button
                        variant="outline"
                        className="group/delete border-destructive/50 bg-destructive/10 text-destructive hover:text-destructive hover:bg-destructive/20 h-9 w-9"
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          deleteMeeting.mutate(
                            { meetingId: meeting.id },
                            {
                              onSuccess() {
                                toast.success("Meeting deleted successfully");
                                refetch();
                              },
                            },
                          );
                        }}
                        disabled={deleteMeeting.isPending}
                      >
                        <Trash className="size-4 transition-transform group-hover/delete:scale-110" />
                      </Button>
                    </div>
                  </div>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default MeetingsPage;
