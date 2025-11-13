"use client";
import React, { useState } from "react";
import { toast } from "sonner";
import { Button } from "~/components/ui/button";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "~/components/ui/alert-dialog";
import { Archive, Loader2, AlertTriangle } from "lucide-react";
import useProject from "~/hooks/use-project";
import useRefetch from "~/hooks/use-refetch";
import { api } from "~/trpc/react";

const ArchiveButton = () => {
  const [open, setOpen] = useState(false);
  const archiveProject = api.project.archiveProject.useMutation();
  const { projectId } = useProject();
  const refetch = useRefetch();

  const handleArchive = () => {
    archiveProject.mutate(
      { projectId },
      {
        onSuccess: () => {
          toast.success("Project archived successfully", {
            description: "The project has been moved to your archive.",
          });
          setOpen(false);
          refetch();
        },
        onError: () => {
          toast.error("Failed to archive project", {
            description: "Please try again later.",
          });
        },
      },
    );
  };

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger asChild>
        <Button
          size="sm"
          variant="outline"
          className="border-destructive/50 bg-destructive/10 text-destructive hover:bg-destructive/20 hover:text-destructive gap-2"
        >
          <Archive className="size-4" />
          Archive Project
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent className="max-w-md">
        <AlertDialogHeader>
          <div className="flex items-start gap-4">
            <div className="bg-destructive/10 flex size-12 shrink-0 items-center justify-center rounded-full">
              <AlertTriangle className="text-destructive size-6" />
            </div>
            <div className="flex-1 space-y-2">
              <AlertDialogTitle className="text-xl">
                Archive this project?
              </AlertDialogTitle>
              <AlertDialogDescription className="text-base leading-relaxed">
                This action will move the project to your archive. You can
                restore it later from the archived projects section.
              </AlertDialogDescription>
            </div>
          </div>
        </AlertDialogHeader>
        <AlertDialogFooter className="gap-2 sm:gap-2">
          <AlertDialogCancel disabled={archiveProject.isPending}>
            Cancel
          </AlertDialogCancel>
          <AlertDialogAction
            onClick={(e) => {
              e.preventDefault();
              handleArchive();
            }}
            disabled={archiveProject.isPending}
            className="bg-destructive hover:bg-destructive/90 gap-2"
          >
            {archiveProject.isPending ? (
              <>
                <Loader2 className="size-4 animate-spin" />
                Archiving...
              </>
            ) : (
              <>
                <Archive className="size-4" />
                Archive Project
              </>
            )}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default ArchiveButton;
