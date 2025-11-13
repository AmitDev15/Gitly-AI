import { UserButton } from "@clerk/nextjs";
import React from "react";
import { SidebarProvider, SidebarTrigger } from "~/components/ui/sidebar";
import { AppSidebar } from "./app-sidebar";
import { Bell, Search, Sparkles } from "lucide-react";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { Badge } from "~/components/ui/badge";

type Props = {
  children: React.ReactNode;
};
const SidebarLayout = ({ children }: Props) => {
  return (
    <SidebarProvider>
      <AppSidebar />
      <main className="flex h-screen w-full flex-col">
        {/* Header */}
        <div className="from-background/95 via-background/98 to-background border-primary/10 relative z-10 mx-6 mt-2 border-b bg-gradient-to-r shadow-md backdrop-blur-xl">
          {/* Gradient overlay */}
          <div className="from-primary/5 pointer-events-none absolute inset-0 bg-gradient-to-r via-transparent to-purple-500/5"></div>

          <div className="relative flex items-center gap-4 px-6 py-4">
            {/* Left Section */}
            <div className="flex items-center gap-4">
              <SidebarTrigger className="hover:bg-primary/10 hover:shadow-primary/20 rounded-lg p-2 transition-all hover:scale-105 hover:shadow-md" />

              <div className="from-primary/20 via-primary/10 hidden h-10 w-px bg-gradient-to-b to-transparent md:block"></div>

              {/* Search Bar */}
              <div className="relative hidden md:block">
                <Search className="text-muted-foreground pointer-events-none absolute top-1/2 left-4 size-4 -translate-y-1/2" />
                <Input
                  placeholder="Search projects, meetings, or type '/' for commands..."
                  className="border-primary/20 focus:border-primary focus:shadow-primary/20 bg-background/50 placeholder:text-muted-foreground/60 h-11 w-96 rounded-xl border-2 pr-4 pl-11 backdrop-blur-sm transition-all focus:w-96 focus:shadow-lg"
                />
              </div>
            </div>

            {/* Center - Optional quick actions */}
            <div className="ml-auto flex items-center gap-2">
              {/* AI Status Badge */}
              <div className="from-primary/10 via-primary/5 hidden items-center gap-2 rounded-xl bg-gradient-to-r to-transparent px-4 py-2 backdrop-blur-sm md:flex">
                <div className="relative">
                  <Sparkles className="text-primary size-5 animate-pulse" />
                  <div className="bg-primary/30 absolute inset-0 animate-ping rounded-full"></div>
                </div>
                <div className="flex flex-col">
                  <span className="text-xs font-semibold">AI Assistant</span>
                  <span className="text-muted-foreground text-[10px]">
                    Active & Ready
                  </span>
                </div>
              </div>
            </div>

            {/* Right Section */}
            <div className="flex items-center gap-3">
              {/* Mobile Search Icon */}
              <Button
                variant="ghost"
                size="icon"
                className="hover:bg-primary/10 hover:shadow-primary/20 rounded-xl transition-all hover:shadow-md md:hidden"
              >
                <Search className="size-5" />
              </Button>

              {/* Notifications */}
              {/* <Button
                variant="ghost"
                size="icon"
                className="hover:bg-primary/10 hover:shadow-primary/20 group relative rounded-xl transition-all hover:shadow-md"
              >
                <Bell className="size-5 transition-transform group-hover:rotate-12" />
                <span className="bg-primary absolute top-2 right-2 flex size-2 items-center justify-center rounded-full">
                  <span className="bg-primary absolute size-full animate-ping rounded-full opacity-75"></span>
                </span>
              </Button> */}

              {/* Divider */}
              <div className="from-primary/20 via-primary/10 h-10 w-px bg-gradient-to-b to-transparent"></div>

              {/* User Profile Section */}
              <div className="hover:bg-primary/5 flex items-center gap-3 rounded-xl p-1.5 pr-3 transition-colors">
                <UserButton
                  appearance={{
                    elements: {
                      avatarBox:
                        "size-10 ring-2 ring-primary/30 ring-offset-2 ring-offset-background transition-all hover:ring-primary/50 hover:scale-105",
                      userButtonPopoverCard: "shadow-2xl border-primary/20",
                    },
                  }}
                />
                <div className="hidden flex-col lg:flex">
                  <span className="text-sm font-semibold">Welcome back!</span>
                  <span className="text-muted-foreground text-xs">
                    Ready to code
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Content Area */}
        <div className="flex-1 overflow-hidden p-6">
          <div className="bg-background/50 border-primary/10 h-full overflow-y-auto rounded-2xl border shadow-xl backdrop-blur-sm">
            <div className="p-6">{children}</div>
          </div>
        </div>
      </main>
    </SidebarProvider>
  );
};

export default SidebarLayout;
