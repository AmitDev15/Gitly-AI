import { SignIn } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";
import { Card } from "~/components/ui/card";
import { Badge } from "~/components/ui/badge";
import { Avatar, AvatarFallback } from "~/components/ui/avatar";
import {
  Github,
  Sparkles,
  Code2,
  Zap,
  GitBranch,
  Star,
  CheckCircle,
} from "lucide-react";

export default function Page() {
  return (
    <div className="flex min-h-screen">
      {/* Left Side - Sign In Form */}
      <div className="bg-background flex w-full flex-col items-center justify-center px-6 lg:w-1/2 lg:px-12">
        <div className="w-full max-w-md space-y-8">
          {/* Logo */}
          <Link href="/" className="flex items-center justify-center gap-3">
            <Image
              src="/logo.webp"
              height={30}
              width={180}
              alt="Gitly AI Logo"
              className="h-auto w-auto"
            />
          </Link>

          {/* Welcome Text */}
          <div className="text-center">
            <h1 className="text-3xl font-bold">Welcome Back!</h1>
            <p className="text-muted-foreground mt-2">
              Sign in to access your dashboard and continue optimizing your code
              analysis.
            </p>
          </div>

          {/* Clerk Sign In Component */}
          <div className="flex justify-center">
            <SignIn
              forceRedirectUrl="/sync-user"
              fallbackRedirectUrl="/sync-user"
              appearance={{
                elements: {
                  rootBox: "w-full",
                  card: "shadow-none w-full",
                  headerTitle: "hidden",
                  headerSubtitle: "hidden",
                  socialButtonsBlockButton:
                    "border-2 hover:bg-muted transition-all",
                  formButtonPrimary:
                    "bg-gradient-to-r from-primary to-primary/80 hover:scale-105 transition-all shadow-lg hover:shadow-primary/50",
                  footerActionLink: "text-primary hover:text-primary/80",
                  formFieldInput:
                    "border-2 focus:border-primary transition-all",
                  dividerLine: "bg-border",
                  dividerText: "text-muted-foreground",
                },
              }}
            />
          </div>

          {/* Additional Info */}
          <p className="text-muted-foreground text-center text-sm">
            Don&apos;t have an account?{" "}
            <Link
              href="/sign-up"
              className="text-primary font-semibold hover:underline"
            >
              Sign Up
            </Link>
          </p>
        </div>
      </div>

      {/* Right Side - Marketing/Testimonial */}
      <div className="from-primary via-primary/90 to-primary/70 relative hidden w-1/2 flex-col justify-between overflow-hidden bg-gradient-to-br p-12 text-white lg:flex">
        {/* Animated Background Elements */}
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <div className="absolute -top-20 -right-20 size-96 animate-pulse rounded-full bg-white/5 blur-3xl"></div>
          <div className="absolute bottom-0 left-0 size-96 animate-pulse rounded-full bg-white/5 blur-3xl delay-1000"></div>
        </div>

        {/* Content */}
        <div className="relative z-10">
          <Badge className="mb-6 border-white/20 bg-white/10 text-white backdrop-blur-sm">
            <Sparkles className="mr-1 size-3" />
            AI-Powered Code Intelligence
          </Badge>
        </div>

        <div className="relative z-10 space-y-8">
          {/* Main Heading */}
          <div>
            <h2 className="mb-4 text-4xl leading-tight font-bold lg:text-5xl">
              Understand Your Codebase Instantly with AI
            </h2>
            <p className="text-lg text-white/80">
              Transform your GitHub repositories into intelligent, searchable
              knowledge bases. Ask questions, get insights, and boost
              productivity.
            </p>
          </div>

          {/* Testimonial Card */}
          <Card className="border-white/10 bg-white/5 p-6 backdrop-blur-sm">
            <div className="mb-4 flex items-center gap-1">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className="size-4 fill-yellow-400 text-yellow-400"
                />
              ))}
            </div>
            <p className="mb-4 text-lg leading-relaxed text-white/90">
              &ldquo;Gitly AI has completely transformed how I onboard to new
              projects. I can understand complex codebases in minutes instead of
              days!&rdquo;
            </p>
            <div className="flex items-center gap-3">
              <Avatar className="size-12 border-2 border-white/20">
                <AvatarFallback className="bg-gradient-to-br from-blue-500 to-blue-600 text-white">
                  JD
                </AvatarFallback>
              </Avatar>
              <div>
                <p className="font-semibold">John Doe</p>
                <p className="text-sm text-white/70">
                  Senior Developer at TechCorp
                </p>
              </div>
            </div>
          </Card>

          {/* Feature Highlights */}
          <div className="grid grid-cols-2 gap-4">
            <div className="flex items-start gap-3">
              <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-white/10 backdrop-blur-sm">
                <Code2 className="size-5" />
              </div>
              <div>
                <h3 className="font-semibold">Smart Q&A</h3>
                <p className="text-sm text-white/70">
                  Ask questions about your code
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-white/10 backdrop-blur-sm">
                <GitBranch className="size-5" />
              </div>
              <div>
                <h3 className="font-semibold">Commit Insights</h3>
                <p className="text-sm text-white/70">
                  AI-powered commit summaries
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-white/10 backdrop-blur-sm">
                <Zap className="size-5" />
              </div>
              <div>
                <h3 className="font-semibold">Fast Indexing</h3>
                <p className="text-sm text-white/70">
                  Instant codebase analysis
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-white/10 backdrop-blur-sm">
                <CheckCircle className="size-5" />
              </div>
              <div>
                <h3 className="font-semibold">Team Ready</h3>
                <p className="text-sm text-white/70">
                  Collaborate with your team
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="relative z-10 flex items-center justify-between border-t border-white/10 pt-8 text-sm text-white/60">
          <p>© 2025 Gitly AI. All rights reserved.</p>
          <div className="flex items-center gap-2">
            <Github className="size-4" />
            <span>Powered by AI</span>
          </div>
        </div>
      </div>
    </div>
  );
}
