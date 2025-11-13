"use client";

import {
  Bot,
  CreditCard,
  LayoutDashboard,
  Plus,
  Presentation,
  Sparkles,
  FolderGit2,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "~/components/ui/button";
import { Badge } from "~/components/ui/badge";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
  SidebarFooter,
} from "~/components/ui/sidebar";
import useProject from "~/hooks/use-project";

import { cn } from "~/lib/utils";

const items = [
  {
    title: "Dashboard",
    url: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    title: "Q&A",
    url: "/qa",
    icon: Bot,
    badge: "AI",
  },
  {
    title: "Meetings",
    url: "/meetings",
    icon: Presentation,
  },
  {
    title: "Billing",
    url: "/billing",
    icon: CreditCard,
  },
];

export function AppSidebar() {
  const pathname = usePathname();
  const { open } = useSidebar();
  const { projects, projectId, setProjectId } = useProject();
  return (
    <Sidebar collapsible="icon" variant="floating">
      <SidebarHeader>
        <div
          className={cn("flex items-center gap-3 px-2 py-3", {
            "justify-center": !open,
          })}
        >
          <div className="from-primary to-primary/70 flex size-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br shadow-lg transition-transform hover:scale-105">
            <Image
              src="/logo-icon.png"
              alt="Gitly AI"
              width={24}
              height={24}
              className="brightness-0 invert"
            />
          </div>
          {open && (
            <div className="flex flex-col">
              <h1 className="text-lg font-bold">Gitly AI</h1>
              <Badge
                variant="secondary"
                className="h-4 w-fit px-1.5 text-[10px] font-medium"
              >
                v1.0
              </Badge>
            </div>
          )}
        </div>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className="text-muted-foreground text-xs font-semibold tracking-wider uppercase">
            Navigation
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => {
                const isActive = pathname === item.url;
                return (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild>
                      <Link
                        href={item.url}
                        className={cn(
                          "group relative overflow-hidden rounded-lg transition-all duration-200",
                          {
                            "from-primary to-primary/80 shadow-primary/20 bg-gradient-to-r text-white shadow-md":
                              isActive,
                            "hover:bg-muted": !isActive,
                          },
                          !open && "justify-center",
                        )}
                      >
                        <item.icon
                          className={cn(
                            "transition-transform group-hover:scale-110",
                            {
                              "text-white": isActive,
                            },
                          )}
                        />
                        {open && (
                          <>
                            <span className="font-medium">{item.title}</span>
                            {item.badge && (
                              <Badge
                                variant={isActive ? "secondary" : "outline"}
                                className="ml-auto h-5 px-2 text-[10px]"
                              >
                                {item.badge}
                              </Badge>
                            )}
                          </>
                        )}
                        {isActive && (
                          <div className="bg-primary/20 absolute inset-0 -z-10 animate-pulse"></div>
                        )}
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup>
          {open ? (
            <SidebarGroupLabel className="text-muted-foreground text-xs font-semibold tracking-wider uppercase">
              <FolderGit2 className="mr-1 inline-block size-3" />
              Your Projects
            </SidebarGroupLabel>
          ) : (
            <div className="flex justify-center py-2">
              <FolderGit2 className="text-muted-foreground size-4" />
            </div>
          )}
          <SidebarGroupContent>
            <SidebarMenu>
              {projects?.map((project) => {
                const isSelected = project.id === projectId;
                return (
                  <SidebarMenuItem
                    key={project.name}
                    className="cursor-pointer"
                  >
                    <SidebarMenuButton
                      asChild={open}
                      onClick={() => setProjectId(project.id)}
                      className={cn(
                        "group hover:bg-muted rounded-lg transition-all duration-200",
                        {
                          "bg-primary/10 border-primary/20 border shadow-sm":
                            isSelected && open,
                          "from-primary to-primary/80 shadow-primary/20 bg-gradient-to-r shadow-md":
                            isSelected && !open,
                        },
                      )}
                    >
                      {open ? (
                        <div className="flex items-center gap-2">
                          <div
                            className={cn(
                              "from-primary/20 to-primary/10 flex size-8 items-center justify-center rounded-lg border-2 bg-gradient-to-br font-semibold transition-all",
                              {
                                "from-primary to-primary/80 border-primary shadow-primary/20 scale-105 text-white shadow-md":
                                  isSelected,
                                "border-primary/20 text-primary group-hover:scale-105":
                                  !isSelected,
                              },
                            )}
                          >
                            {project.name.charAt(0).toUpperCase()}
                          </div>
                          <span
                            className={cn("font-medium transition-colors", {
                              "text-primary": isSelected,
                            })}
                          >
                            {project.name}
                          </span>
                        </div>
                      ) : (
                        <div
                          className={cn(
                            "from-primary/20 to-primary/10 flex size-8 items-center justify-center rounded-lg border-2 bg-gradient-to-br font-semibold transition-all",
                            {
                              "text-white": isSelected,
                              "border-primary/20 text-primary group-hover:scale-105":
                                !isSelected,
                            },
                          )}
                        >
                          {project.name.charAt(0).toUpperCase()}
                        </div>
                      )}
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
              <div className="h-2"></div>
              {open && (
                <SidebarMenuItem>
                  <Link href="/create" className="w-full">
                    <Button
                      variant="outline"
                      size="default"
                      className="from-primary/5 to-primary/10 hover:from-primary hover:to-primary/80 group border-primary/30 hover:shadow-primary/20 w-full border-2 border-dashed bg-gradient-to-r transition-all hover:border-solid hover:text-white hover:shadow-lg"
                    >
                      <Plus className="transition-transform group-hover:rotate-90" />
                      Create Project
                    </Button>
                  </Link>
                </SidebarMenuItem>
              )}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter>
        {open && (
          <div className="border-t px-4 py-3">
            <div className="bg-primary/5 border-primary/10 flex items-center gap-2 rounded-lg border p-3">
              <Sparkles className="text-primary size-5 shrink-0" />
              <div className="text-xs">
                <p className="font-semibold">AI-Powered</p>
                <p className="text-muted-foreground">Code Intelligence</p>
              </div>
            </div>
          </div>
        )}
      </SidebarFooter>
    </Sidebar>
  );
}
