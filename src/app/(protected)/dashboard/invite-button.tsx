"use client";
import React, { useState } from "react";
import { toast } from "sonner";
import { Button } from "~/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "~/components/ui/dialog";
import { Input } from "~/components/ui/input";
import { Card } from "~/components/ui/card";
import { UserPlus, Copy, Check, Link as LinkIcon } from "lucide-react";
import useProject from "~/hooks/use-project";

const InviteButton = () => {
  const { projectId } = useProject();
  const [open, setOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const inviteLink = `${typeof window !== "undefined" ? window.location.origin : ""}/join/${projectId}`;

  const handleCopy = () => {
    navigator.clipboard.writeText(inviteLink);
    setCopied(true);
    toast.success("Link copied to clipboard", {
      description: "Share this link with your team members",
    });
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <div className="flex items-start gap-4">
              <div className="bg-primary/10 flex size-12 shrink-0 items-center justify-center rounded-full">
                <UserPlus className="text-primary size-6" />
              </div>
              <div className="flex-1 space-y-1">
                <DialogTitle className="text-xl">
                  Invite Team Members
                </DialogTitle>
                <DialogDescription className="text-base">
                  Share this link with your team to collaborate
                </DialogDescription>
              </div>
            </div>
          </DialogHeader>

          <div className="space-y-4 pt-2">
            <Card className="border-primary/20 bg-muted/50 p-4">
              <div className="space-y-3">
                <div className="text-muted-foreground flex items-center gap-2 text-sm font-medium">
                  <LinkIcon className="size-4" />
                  <span>Invitation Link</span>
                </div>
                <div className="flex items-center gap-2">
                  <Input
                    readOnly
                    value={inviteLink}
                    className="bg-background flex-1 cursor-pointer font-mono text-sm select-all"
                    onClick={handleCopy}
                  />
                  <Button
                    size="icon"
                    variant="outline"
                    onClick={handleCopy}
                    className="shrink-0 transition-colors"
                  >
                    {copied ? (
                      <Check className="size-4 text-green-600" />
                    ) : (
                      <Copy className="size-4" />
                    )}
                  </Button>
                </div>
                <p className="text-muted-foreground text-xs">
                  Click the link or the copy button to copy it to your clipboard
                </p>
              </div>
            </Card>

            <div className="rounded-lg border bg-blue-50/50 p-3 dark:bg-blue-950/20">
              <p className="text-muted-foreground text-xs">
                💡 <span className="font-medium">Tip:</span> Anyone with this
                link can join your project. Keep it secure and only share with
                trusted team members.
              </p>
            </div>
          </div>
        </DialogContent>
      </Dialog>
      <Button
        size="sm"
        onClick={() => setOpen(true)}
        className="bg-primary/10 text-primary hover:bg-primary/20 hover:text-primary border-primary/50 hover:border-primary/90 gap-2"
        variant="outline"
      >
        <UserPlus className="size-4" />
        Invite Members
      </Button>
    </>
  );
};

export default InviteButton;
