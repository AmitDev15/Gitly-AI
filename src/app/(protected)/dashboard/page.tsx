"use client";

import {
  ExternalLink,
  Github,
  GitBranch,
  Sparkles,
  Activity,
} from "lucide-react";
import Link from "next/link";
import useProject from "~/hooks/use-project";
import { Card, CardContent } from "~/components/ui/card";
import { Separator } from "~/components/ui/separator";
import CommitLog from "./commit-log";
import AskQuestionCard from "./ask-question-card";
import MeetingCard from "./meeting-card";
import ArchiveButton from "./archive-button";
import InviteButton from "./invite-button";
import TeamMembers from "./team-member";

const DashboardPage = () => {
  const { project } = useProject();
  return (
    <div className="space-y-6">
      {/* Welcome Banner */}
      <div className="group from-primary via-primary/95 to-primary/85 hover:shadow-primary/25 relative overflow-hidden rounded-lg bg-gradient-to-br p-0.5 shadow-lg transition-all duration-500">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PGNpcmNsZSBjeD0iMzAiIGN5PSIzMCIgcj0iMS41IiBmaWxsPSJ3aGl0ZSIgZmlsbC1vcGFjaXR5PSIwLjIiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JpZCkiLz48L3N2Zz4=')] opacity-40"></div>
        <div className="absolute top-0 right-0 size-32 rounded-full bg-white/10 blur-3xl"></div>
        <div className="absolute bottom-0 left-0 size-32 rounded-full bg-white/5 blur-3xl"></div>

        <div className="from-primary via-primary/90 to-primary/80 relative overflow-hidden rounded-md bg-gradient-to-br p-3 backdrop-blur-sm">
          <div className="flex items-center justify-between gap-4">
            {/* Left Content */}
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <Sparkles className="size-4 animate-pulse text-white" />
                <h1 className="text-xl font-bold text-white md:text-2xl">
                  Welcome back! 👋
                </h1>
                {/* <div className="ml-1 inline-flex items-center gap-1.5 rounded-full bg-white/20 px-2.5 py-0.5 backdrop-blur-sm">
                  <span className="text-xs font-semibold text-white">
                    AI-Powered Development
                  </span>
                </div> */}
              </div>

              <div className="mt-2 flex flex-wrap items-center gap-2">
                <p className="text-sm font-medium text-white/95">
                  {project?.name || "Your Project Dashboard"}
                </p>
                <span className="text-white/40">•</span>
                <div className="flex items-center gap-1 rounded-md bg-white/10 px-2 py-0.5 backdrop-blur-sm">
                  <div className="size-1.5 animate-pulse rounded-full bg-green-400"></div>
                  <span className="text-xs font-medium text-white/90">
                    All Systems Operational
                  </span>
                </div>
                <span className="text-white/40">•</span>
                <div className="flex items-center gap-1 rounded-md bg-white/10 px-2 py-0.5 backdrop-blur-sm">
                  <GitBranch className="size-3 text-white/80" />
                  <span className="text-xs font-medium text-white/90">
                    Repository Connected
                  </span>
                </div>
              </div>
            </div>

            {/* Right Stats */}
            <div className="hidden shrink-0 md:flex md:items-center md:gap-2">
              <div className="rounded-lg bg-white/10 px-3 py-2 text-center backdrop-blur-sm transition-transform hover:scale-105">
                <div className="text-xs font-medium text-white/70">Today</div>
                <div className="text-lg font-bold text-white">
                  {new Date().toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Repository Card */}
      <Card className="group border-primary/20 relative overflow-hidden shadow-lg transition-all duration-300 hover:shadow-xl">
        <div className="from-primary/50 via-primary to-primary/50 absolute inset-x-0 top-0 h-1 bg-gradient-to-r"></div>
        <CardContent className="p-6">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            {/* GitHub Link */}
            <div className="flex items-start gap-4">
              <div className="from-primary/20 via-primary/15 to-primary/10 flex size-14 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br shadow-inner transition-transform group-hover:scale-110">
                <Github className="text-primary size-7" />
              </div>
              <div className="flex-1 space-y-2">
                <div className="flex items-center gap-2">
                  <p className="text-muted-foreground text-sm font-semibold tracking-wide uppercase">
                    Connected Repository
                  </p>
                  <div className="size-2 animate-pulse rounded-full bg-green-500"></div>
                </div>
                <Link
                  href={project?.githubUrl ?? "#"}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group/link hover:text-primary inline-flex items-center gap-2 text-lg font-bold transition-all"
                >
                  <GitBranch className="size-5 transition-transform group-hover/link:rotate-12" />
                  <span className="from-foreground to-foreground/80 group-hover/link:from-primary group-hover/link:to-primary/80 bg-gradient-to-r bg-clip-text transition-all">
                    {project?.githubUrl
                      ? project.githubUrl
                          .replace("https://github.com/", "")
                          .replace(".git", "")
                      : "No Repository Linked"}
                  </span>
                  <ExternalLink className="size-5 opacity-0 transition-all group-hover/link:translate-x-1 group-hover/link:opacity-100" />
                </Link>
              </div>
            </div>

            <Separator className="lg:hidden" />

            {/* Actions */}
            <div className="flex flex-wrap items-center gap-3">
              <TeamMembers />
              <Separator
                orientation="vertical"
                className="hidden h-8 lg:block"
              />
              <InviteButton />
              <ArchiveButton />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Quick Actions Section */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-5">
        <AskQuestionCard />
        <MeetingCard />
      </div>

      {/* Commit History Section */}
      <div className="space-y-4">
        <Card className="border-primary/20 from-background to-muted/20 bg-gradient-to-br shadow-md">
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <div className="from-primary/20 to-primary/10 flex size-10 items-center justify-center rounded-lg bg-gradient-to-br">
                <Activity className="text-primary size-5" />
              </div>
              <div>
                <h2 className="text-xl font-bold">Recent Activity</h2>
                <p className="text-muted-foreground text-sm">
                  Latest commits and updates
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
        <CommitLog />
      </div>
    </div>
  );
};

export default DashboardPage;
