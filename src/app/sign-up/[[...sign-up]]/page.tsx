import { SignUp } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";
import { Card } from "~/components/ui/card";
import { Badge } from "~/components/ui/badge";
import {
  Github,
  Sparkles,
  Zap,
  Shield,
  Users,
  Rocket,
  CheckCircle,
  TrendingUp,
} from "lucide-react";

export default function Page() {
  return (
    <div className="flex min-h-screen">
      {/* Left Side - Sign Up Form */}
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
            <h1 className="text-3xl font-bold">Get Started Free!</h1>
            <p className="text-muted-foreground mt-2">
              Create your account and start understanding your codebase with AI
              in minutes.
            </p>
          </div>

          {/* Clerk Sign Up Component */}
          <div className="flex justify-center">
            <SignUp
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
            Already have an account?{" "}
            <Link
              href="/sign-in"
              className="text-primary font-semibold hover:underline"
            >
              Sign In
            </Link>
          </p>
        </div>
      </div>

      {/* Right Side - Marketing/Features */}
      <div className="from-primary via-primary/90 to-primary/70 relative hidden w-1/2 flex-col justify-between overflow-hidden bg-gradient-to-br p-12 text-white lg:flex">
        {/* Animated Background Elements */}
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <div className="absolute -top-20 -left-20 size-96 animate-pulse rounded-full bg-white/5 blur-3xl"></div>
          <div className="absolute -right-20 -bottom-20 size-96 animate-pulse rounded-full bg-white/5 blur-3xl delay-1000"></div>
        </div>

        {/* Content */}
        <div className="relative z-10">
          <Badge className="mb-6 border-white/20 bg-white/10 text-white backdrop-blur-sm">
            <Rocket className="mr-1 size-3" />
            Start Your Free Trial
          </Badge>
        </div>

        <div className="relative z-10 space-y-8">
          {/* Main Heading */}
          <div>
            <h2 className="mb-4 text-4xl leading-tight font-bold lg:text-5xl">
              Join 15,000+ Developers Building Better Software
            </h2>
            <p className="text-lg text-white/80">
              Get started with Gitly AI today and experience the power of
              AI-driven code intelligence. No credit card required.
            </p>
          </div>

          {/* Benefits List */}
          <Card className="border-white/10 bg-white/5 p-6 backdrop-blur-sm">
            <h3 className="mb-4 text-xl font-semibold">
              What you get with Gitly AI:
            </h3>
            <ul className="space-y-3">
              <li className="flex items-center gap-3">
                <div className="flex size-6 shrink-0 items-center justify-center rounded-full bg-green-500">
                  <CheckCircle className="size-4" />
                </div>
                <span className="text-white/90">
                  Unlimited repository connections
                </span>
              </li>
              <li className="flex items-center gap-3">
                <div className="flex size-6 shrink-0 items-center justify-center rounded-full bg-green-500">
                  <CheckCircle className="size-4" />
                </div>
                <span className="text-white/90">
                  AI-powered Q&A on your codebase
                </span>
              </li>
              <li className="flex items-center gap-3">
                <div className="flex size-6 shrink-0 items-center justify-center rounded-full bg-green-500">
                  <CheckCircle className="size-4" />
                </div>
                <span className="text-white/90">
                  Intelligent commit summaries
                </span>
              </li>
              <li className="flex items-center gap-3">
                <div className="flex size-6 shrink-0 items-center justify-center rounded-full bg-green-500">
                  <CheckCircle className="size-4" />
                </div>
                <span className="text-white/90">Team collaboration tools</span>
              </li>
              <li className="flex items-center gap-3">
                <div className="flex size-6 shrink-0 items-center justify-center rounded-full bg-green-500">
                  <CheckCircle className="size-4" />
                </div>
                <span className="text-white/90">
                  Priority support & updates
                </span>
              </li>
            </ul>
          </Card>

          {/* Stats Grid */}
          <div className="grid grid-cols-3 gap-4">
            <div className="rounded-lg bg-white/5 p-4 text-center backdrop-blur-sm">
              <Users className="mx-auto mb-2 size-6" />
              <p className="text-2xl font-bold">15K+</p>
              <p className="text-xs text-white/70">Developers</p>
            </div>
            <div className="rounded-lg bg-white/5 p-4 text-center backdrop-blur-sm">
              <Github className="mx-auto mb-2 size-6" />
              <p className="text-2xl font-bold">10K+</p>
              <p className="text-xs text-white/70">Repositories</p>
            </div>
            <div className="rounded-lg bg-white/5 p-4 text-center backdrop-blur-sm">
              <TrendingUp className="mx-auto mb-2 size-6" />
              <p className="text-2xl font-bold">99.9%</p>
              <p className="text-xs text-white/70">Uptime</p>
            </div>
          </div>

          {/* Trust Badges */}
          <div className="flex flex-wrap items-center gap-6 border-t border-white/10 pt-6">
            <div className="flex items-center gap-2">
              <Shield className="size-5 text-green-400" />
              <div>
                <p className="text-sm font-semibold">Enterprise Security</p>
                <p className="text-xs text-white/60">SOC 2 Compliant</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Zap className="size-5 text-yellow-400" />
              <div>
                <p className="text-sm font-semibold">Lightning Fast</p>
                <p className="text-xs text-white/60">Instant Indexing</p>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="relative z-10 flex items-center justify-between border-t border-white/10 pt-8 text-sm text-white/60">
          <p>© 2025 Gitly AI. All rights reserved.</p>
          <div className="flex items-center gap-2">
            <Sparkles className="size-4" />
            <span>Powered by AI</span>
          </div>
        </div>
      </div>
    </div>
  );
}
