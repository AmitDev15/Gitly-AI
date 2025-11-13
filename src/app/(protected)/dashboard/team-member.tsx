"use client";
import React from "react";
import useProject from "~/hooks/use-project";
import { api } from "~/trpc/react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "~/components/ui/tooltip";
import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar";
import { Badge } from "~/components/ui/badge";
import { Users } from "lucide-react";

const TeamMembers = () => {
  const { projectId } = useProject();
  const { data: members, isLoading } = api.project.getTeamMembers.useQuery({
    projectId,
  });

  if (isLoading) {
    return (
      <div className="flex items-center gap-2">
        <div className="flex -space-x-2">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="border-background bg-muted size-9 animate-pulse rounded-full border-2"
            />
          ))}
        </div>
      </div>
    );
  }

  if (!members || members.length === 0) {
    return (
      <div className="text-muted-foreground flex items-center gap-2 text-sm">
        <Users className="size-4" />
        <span>No team members</span>
      </div>
    );
  }

  const displayMembers = members.slice(0, 5);
  const remainingCount = members.length - displayMembers.length;

  return (
    <div className="flex items-center gap-3">
      <TooltipProvider delayDuration={200}>
        <div className="flex -space-x-2">
          {displayMembers.map((member, index) => {
            const fullName =
              `${member.user.firstName || ""} ${member.user.lastName || ""}`.trim();
            const initials =
              (
                (member.user.firstName?.[0] || "") +
                (member.user.lastName?.[0] || "")
              ).toUpperCase() || "U";

            return (
              <Tooltip key={member.id}>
                <TooltipTrigger asChild>
                  <div
                    className="relative transition-transform hover:z-10 hover:scale-110"
                    style={{ zIndex: displayMembers.length - index }}
                  >
                    <Avatar className="border-background ring-primary/20 hover:ring-primary/50 size-9 border-2 ring-1 transition-all hover:ring-2">
                      <AvatarImage
                        src={member.user.imageUrl || undefined}
                        alt={fullName || "User Avatar"}
                      />
                      <AvatarFallback className="from-primary/20 to-primary/10 text-primary bg-gradient-to-br text-xs font-semibold">
                        {initials}
                      </AvatarFallback>
                    </Avatar>
                  </div>
                </TooltipTrigger>
                <TooltipContent side="bottom" className="font-medium">
                  {fullName || "Team Member"}
                </TooltipContent>
              </Tooltip>
            );
          })}
          {remainingCount > 0 && (
            <Tooltip>
              <TooltipTrigger asChild>
                <div className="border-background from-primary/30 to-primary/20 ring-primary/20 hover:ring-primary/50 relative flex size-9 items-center justify-center rounded-full border-2 bg-gradient-to-br ring-1 transition-all hover:scale-110 hover:ring-2">
                  <span className="text-primary text-xs font-semibold">
                    +{remainingCount}
                  </span>
                </div>
              </TooltipTrigger>
              <TooltipContent side="bottom">
                {remainingCount} more{" "}
                {remainingCount === 1 ? "member" : "members"}
              </TooltipContent>
            </Tooltip>
          )}
        </div>
      </TooltipProvider>
      <Badge
        variant="outline"
        className="gap-1.5 border-1 border-blue-400 bg-white"
      >
        <Users className="size-3" />
        {members.length}
      </Badge>
    </div>
  );
};

export default TeamMembers;
