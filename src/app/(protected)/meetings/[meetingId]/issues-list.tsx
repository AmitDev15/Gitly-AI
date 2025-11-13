"use client";
import {
  VideoIcon,
  Calendar,
  Clock,
  MessageSquare,
  Loader2,
  AlertCircle,
} from "lucide-react";
import React, { useState } from "react";
import { Button } from "~/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "~/components/ui/dialog";
import { Badge } from "~/components/ui/badge";
import { api, type RouterOutputs } from "~/trpc/react";

type Props = {
  meetingId: string;
};

const IssuesList = ({ meetingId }: Props) => {
  const { data: meeting, isLoading } = api.project.getMeetingById.useQuery(
    { meetingId },
    {
      refetchInterval: 5000,
    },
  );
  if (isLoading || !meeting) {
    return (
      <div className="flex items-center justify-center p-16">
        <div className="flex flex-col items-center gap-3">
          <Loader2 className="text-primary size-8 animate-spin" />
          <p className="text-muted-foreground text-sm">Loading meeting...</p>
        </div>
      </div>
    );
  }
  return (
    <div className="space-y-6 p-6">
      {/* Header Section */}
      <Card className="border-primary/20 shadow-md">
        <CardHeader className="pb-4">
          <div className="flex items-start gap-4">
            <div className="from-primary/20 to-primary/5 flex size-14 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br">
              <VideoIcon className="text-primary size-7" />
            </div>
            <div className="flex-1 space-y-2">
              <CardTitle className="text-2xl">{meeting.name}</CardTitle>
              <div className="text-muted-foreground flex flex-wrap items-center gap-3 text-sm">
                <div className="flex items-center gap-1.5">
                  <Calendar className="size-4" />
                  <span>
                    {meeting.createdAt.toLocaleDateString("en-IN", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Clock className="size-4" />
                  <span>{meeting.createdAt.toLocaleTimeString()}</span>
                </div>
                <Badge variant="secondary" className="gap-1.5">
                  <AlertCircle className="size-3" />
                  {meeting.issues.length}{" "}
                  {meeting.issues.length === 1 ? "Issue" : "Issues"}
                </Badge>
              </div>
            </div>
          </div>
        </CardHeader>
      </Card>

      {/* Issues Grid */}
      {meeting.issues.length === 0 ? (
        <Card className="border-dashed p-12">
          <div className="flex flex-col items-center gap-3 text-center">
            <MessageSquare className="text-muted-foreground/50 size-12" />
            <h3 className="text-lg font-semibold">No issues found</h3>
            <p className="text-muted-foreground max-w-md text-sm">
              No issues were identified in this meeting recording.
            </p>
          </div>
        </Card>
      ) : (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {meeting.issues.map((issue, index) => (
            <IssueCard key={issue.id} issue={issue} index={index} />
          ))}
        </div>
      )}
    </div>
  );
};

function IssueCard({
  issue,
  index,
}: {
  issue: NonNullable<
    RouterOutputs["project"]["getMeetingById"]
  >["issues"][number];
  index: number;
}) {
  const [open, setOpen] = useState(false);
  return (
    <>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <div className="flex items-start gap-3">
              <Badge className="bg-primary shrink-0">#{index + 1}</Badge>
              <div className="flex-1 space-y-2">
                <DialogTitle className="text-xl leading-tight">
                  {issue.gist}
                </DialogTitle>
                <DialogDescription className="text-base">
                  {issue.headline}
                </DialogDescription>
              </div>
            </div>
          </DialogHeader>

          <div className="space-y-4 pt-4">
            {/* Timestamp Badge */}
            <div className="flex items-center gap-2">
              <Badge variant="secondary" className="gap-1.5">
                <Clock className="size-3" />
                {issue.start} - {issue.end} seconds
              </Badge>
              <Badge variant="outline" className="gap-1.5">
                <Calendar className="size-3" />
                {issue.createdAt.toLocaleDateString("en-IN", {
                  month: "short",
                  day: "numeric",
                  year: "numeric",
                })}
              </Badge>
            </div>

            {/* Summary */}
            <Card className="border-primary bg-muted/50 border-l-4">
              <CardContent className="p-4">
                <p className="text-lg leading-relaxed font-medium italic">
                  &ldquo;{issue.summary}&rdquo;
                </p>
              </CardContent>
            </Card>
          </div>
        </DialogContent>
      </Dialog>

      <Card className="group border-primary/20 relative overflow-hidden shadow-sm transition-all duration-300 hover:shadow-lg">
        <CardHeader className="space-y-3 pb-3">
          <div className="flex items-start justify-between gap-2">
            <Badge className="bg-primary/10 text-primary hover:bg-primary/10 shrink-0">
              #{index + 1}
            </Badge>
          </div>
          <CardTitle className="group-hover:text-primary line-clamp-2 text-lg leading-tight transition-colors">
            {issue.gist}
          </CardTitle>
          <CardDescription className="line-clamp-3 text-sm leading-relaxed">
            {issue.headline}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-3 pt-0">
          <div className="text-muted-foreground flex items-center gap-1.5 text-xs">
            <Clock className="size-3.5" />
            <span>
              {issue.start} - {issue.end}s
            </span>
          </div>
          <Button
            onClick={() => setOpen(true)}
            variant="outline"
            size="sm"
            className="w-full gap-2"
          >
            <MessageSquare className="size-4" />
            View Details
          </Button>
        </CardContent>
      </Card>
    </>
  );
}

export default IssuesList;
