import Link from "next/link";
import { Button } from "~/components/ui/button";
import { Card, CardContent } from "~/components/ui/card";
import { Badge } from "~/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar";
import {
  Github,
  Sparkles,
  Code2,
  MessageSquare,
  Zap,
  ArrowRight,
  CheckCircle,
  Brain,
  GitBranch,
  FileCode,
  Star,
  Users,
  TrendingUp,
  Lock,
  Rocket,
  Globe,
  Shield,
  Activity,
  BarChart3,
  Code,
  Terminal,
  LockIcon,
  HomeIcon,
} from "lucide-react";
import Image from "next/image";

export default async function Home() {
  return (
    <div className="from-background via-background to-muted/20 relative min-h-screen overflow-hidden bg-gradient-to-b">
      {/* Animated Background Elements */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="bg-primary/5 absolute -top-20 -left-20 size-96 animate-pulse rounded-full blur-3xl"></div>
        <div className="absolute top-1/4 -right-20 size-96 animate-pulse rounded-full bg-purple-500/5 blur-3xl delay-1000"></div>
        <div className="absolute bottom-0 left-1/3 size-96 animate-pulse rounded-full bg-blue-500/5 blur-3xl delay-500"></div>
      </div>

      {/* Navigation */}
      <nav className="bg-background/95 border-primary/10 sticky top-0 z-50 border-b backdrop-blur-xl">
        <div className="container mx-auto px-6">
          <div className="flex h-20 items-center justify-between">
            {/* Logo */}
            <Link href="/" className="group flex items-center gap-3">
              <div className="relative transition-all duration-300 group-hover:scale-105">
                <Image
                  src="/logo.webp"
                  height={40}
                  width={200}
                  alt="Gitly AI Logo"
                  className="h-auto w-auto"
                />
              </div>
            </Link>

            {/* Center Navigation Links - Hidden on mobile */}
            <div className="hidden items-center gap-1 md:flex">
              <a href="#hero">
                <Button
                  variant="ghost"
                  className="text-muted-foreground hover:text-foreground gap-2 transition-colors"
                >
                  Home
                </Button>
              </a>
              <a href="#features">
                <Button
                  variant="ghost"
                  className="text-muted-foreground hover:text-foreground gap-2 transition-colors"
                >
                  Features
                </Button>
              </a>
              <a href="#pricing">
                <Button
                  variant="ghost"
                  className="text-muted-foreground hover:text-foreground gap-2 transition-colors"
                >
                  Pricing
                </Button>
              </a>
              <a href="#about">
                <Button
                  variant="ghost"
                  className="text-muted-foreground hover:text-foreground gap-2 transition-colors"
                >
                  About
                </Button>
              </a>
              <a href="#contact">
                <Button
                  variant="ghost"
                  className="text-muted-foreground hover:text-foreground gap-2 transition-colors"
                >
                  Contact
                </Button>
              </a>
            </div>

            {/* Right Actions */}
            <div className="flex items-center gap-3">
              <Link href="/sign-in" className="hidden sm:block">
                <Button
                  variant="ghost"
                  className="text-muted-foreground hover:text-foreground gap-2 font-medium transition-colors"
                >
                  <LockIcon className="size-4" />
                  Sign In
                </Button>
              </Link>
              <Link href="/sign-up">
                <Button className="from-primary to-primary/80 group hover:shadow-primary/50 relative overflow-hidden bg-gradient-to-r shadow-lg transition-all hover:scale-105">
                  <span className="relative z-10 flex items-center gap-2">
                    Get Started
                    <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
                  </span>
                  <div className="bg-primary/20 absolute inset-0 -z-0 translate-y-full transition-transform group-hover:translate-y-0"></div>
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section id="hero" className="container mx-auto px-6 py-20 md:py-32">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
          {/* Left Content */}
          <div className="flex flex-col justify-center space-y-8">
            <div className="space-y-4">
              <div className="bg-primary/10 inline-flex items-center gap-2 rounded-full px-4 py-2">
                <Sparkles className="text-primary size-4" />
                <span className="text-primary text-sm font-semibold">
                  AI-Powered Code Intelligence
                </span>
              </div>
              <h1 className="text-5xl leading-tight font-bold md:text-6xl lg:text-7xl">
                Understand Your
                <span className="from-primary via-primary/80 to-primary/60 bg-gradient-to-r bg-clip-text text-transparent">
                  {" "}
                  Codebase{" "}
                </span>
                Instantly
              </h1>
              <p className="text-muted-foreground text-xl">
                Transform your GitHub repositories into intelligent, searchable
                knowledge bases. Ask questions, get insights, and boost your
                productivity with AI.
              </p>
            </div>

            <div className="flex flex-wrap gap-3">
              <Link href="/sign-up">
                <Button size="lg" className="gap-2 text-base">
                  <Zap className="size-5" />
                  Get Started Free
                </Button>
              </Link>
              <Link href="/sign-in">
                <Button size="lg" variant="outline" className="gap-2 text-base">
                  Learn More
                  <ArrowRight className="size-5" />
                </Button>
              </Link>
            </div>

            <div className="flex items-center gap-8 pt-4">
              <div>
                <p className="text-3xl font-bold">10K+</p>
                <p className="text-muted-foreground text-sm">
                  Repositories Indexed
                </p>
              </div>
              <div>
                <p className="text-3xl font-bold">50K+</p>
                <p className="text-muted-foreground text-sm">
                  Questions Answered
                </p>
              </div>
              <div>
                <p className="text-3xl font-bold">99.9%</p>
                <p className="text-muted-foreground text-sm">Uptime</p>
              </div>
            </div>
          </div>

          {/* Right Content - Visual */}
          <div className="relative">
            <div className="from-primary/20 to-primary/5 absolute inset-0 rounded-2xl bg-gradient-to-br blur-3xl"></div>
            <Card className="border-primary/20 relative shadow-2xl">
              <CardContent className="p-8">
                <div className="space-y-4">
                  {/* Code Preview */}
                  <div className="bg-muted/50 rounded-lg border p-4">
                    <div className="text-muted-foreground flex items-center gap-2 text-sm">
                      <FileCode className="size-4" />
                      <span>Ask AI about your code...</span>
                    </div>
                  </div>

                  {/* AI Response Preview */}
                  <div className="border-primary/20 from-primary/5 space-y-3 rounded-lg border bg-gradient-to-br to-transparent p-4">
                    <div className="flex items-center gap-2">
                      <Brain className="text-primary size-5" />
                      <span className="font-semibold">AI Response</span>
                    </div>
                    <div className="text-muted-foreground space-y-2 text-sm">
                      <div className="flex items-start gap-2">
                        <CheckCircle className="size-4 shrink-0 text-green-500" />
                        <span>Analyzing repository structure...</span>
                      </div>
                      <div className="flex items-start gap-2">
                        <CheckCircle className="size-4 shrink-0 text-green-500" />
                        <span>Searching through 1,247 files...</span>
                      </div>
                      <div className="flex items-start gap-2">
                        <CheckCircle className="size-4 shrink-0 text-green-500" />
                        <span>Found relevant code snippets!</span>
                      </div>
                    </div>
                  </div>

                  {/* Stats */}
                  <div className="grid grid-cols-2 gap-3">
                    <div className="bg-muted/50 rounded-lg p-3 text-center">
                      <p className="text-primary text-2xl font-bold">&lt;1s</p>
                      <p className="text-muted-foreground text-xs">
                        Response Time
                      </p>
                    </div>
                    <div className="bg-muted/50 rounded-lg p-3 text-center">
                      <p className="text-primary text-2xl font-bold">100%</p>
                      <p className="text-muted-foreground text-xs">Accurate</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="bg-muted/30 border-t py-20">
        <div className="container mx-auto px-6">
          <div className="mb-12 text-center">
            <h2 className="text-3xl font-bold md:text-4xl">
              Powerful Features for Modern Development
            </h2>
            <p className="text-muted-foreground mt-3 text-lg">
              Everything you need to understand and navigate your codebase
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {/* Feature 1 */}
            <Card className="border-primary/20 transition-all duration-300 hover:shadow-lg">
              <CardContent className="p-6">
                <div className="mb-4 flex size-12 items-center justify-center rounded-lg bg-gradient-to-br from-blue-500/20 to-blue-500/10">
                  <MessageSquare className="size-6 text-blue-500" />
                </div>
                <h3 className="mb-2 text-xl font-semibold">AI Q&A</h3>
                <p className="text-muted-foreground">
                  Ask questions about your codebase in natural language and get
                  instant, accurate answers with code references.
                </p>
              </CardContent>
            </Card>

            {/* Feature 2 */}
            <Card className="border-primary/20 transition-all duration-300 hover:shadow-lg">
              <CardContent className="p-6">
                <div className="mb-4 flex size-12 items-center justify-center rounded-lg bg-gradient-to-br from-purple-500/20 to-purple-500/10">
                  <GitBranch className="size-6 text-purple-500" />
                </div>
                <h3 className="mb-2 text-xl font-semibold">Commit Summaries</h3>
                <p className="text-muted-foreground">
                  Automatically generate intelligent summaries of commits to
                  understand changes at a glance.
                </p>
              </CardContent>
            </Card>

            {/* Feature 3 */}
            <Card className="border-primary/20 transition-all duration-300 hover:shadow-lg">
              <CardContent className="p-6">
                <div className="mb-4 flex size-12 items-center justify-center rounded-lg bg-gradient-to-br from-green-500/20 to-green-500/10">
                  <Code2 className="size-6 text-green-500" />
                </div>
                <h3 className="mb-2 text-xl font-semibold">Smart Indexing</h3>
                <p className="text-muted-foreground">
                  Advanced AI indexing that understands your code structure and
                  relationships between files.
                </p>
              </CardContent>
            </Card>

            {/* Feature 4 */}
            <Card className="border-primary/20 transition-all duration-300 hover:shadow-lg">
              <CardContent className="p-6">
                <div className="mb-4 flex size-12 items-center justify-center rounded-lg bg-gradient-to-br from-orange-500/20 to-orange-500/10">
                  <Sparkles className="size-6 text-orange-500" />
                </div>
                <h3 className="mb-2 text-xl font-semibold">Meeting Analysis</h3>
                <p className="text-muted-foreground">
                  Upload meeting recordings and get AI-generated insights,
                  action items, and summaries.
                </p>
              </CardContent>
            </Card>

            {/* Feature 5 */}
            <Card className="border-primary/20 transition-all duration-300 hover:shadow-lg">
              <CardContent className="p-6">
                <div className="mb-4 flex size-12 items-center justify-center rounded-lg bg-gradient-to-br from-pink-500/20 to-pink-500/10">
                  <Zap className="size-6 text-pink-500" />
                </div>
                <h3 className="mb-2 text-xl font-semibold">Lightning Fast</h3>
                <p className="text-muted-foreground">
                  Get answers in under a second with our optimized AI models and
                  vector search technology.
                </p>
              </CardContent>
            </Card>

            {/* Feature 6 */}
            <Card className="border-primary/20 transition-all duration-300 hover:shadow-lg">
              <CardContent className="p-6">
                <div className="mb-4 flex size-12 items-center justify-center rounded-lg bg-gradient-to-br from-cyan-500/20 to-cyan-500/10">
                  <Github className="size-6 text-cyan-500" />
                </div>
                <h3 className="mb-2 text-xl font-semibold">
                  GitHub Integration
                </h3>
                <p className="text-muted-foreground">
                  Seamlessly connect with GitHub repositories, both public and
                  private, with secure token support.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="pricing" className="relative py-20">
        <div className="container mx-auto px-6">
          <div className="mb-16 text-center">
            <Badge className="mb-4 gap-1.5">
              <Rocket className="size-3" />
              Simple Process
            </Badge>
            <h2 className="text-3xl font-bold md:text-4xl">
              Get Started in 3 Easy Steps
            </h2>
            <p className="text-muted-foreground mt-3 text-lg">
              From connection to insights in minutes
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-3">
            <div className="group relative">
              <div className="from-primary absolute -inset-1 rounded-2xl bg-gradient-to-r to-purple-600 opacity-0 blur transition-all duration-500 group-hover:opacity-20"></div>
              <Card className="border-primary/20 relative shadow-lg transition-all duration-300 hover:shadow-xl">
                <CardContent className="p-8 text-center">
                  <div className="from-primary/20 to-primary/10 mx-auto mb-6 flex size-20 items-center justify-center rounded-full bg-gradient-to-br shadow-inner">
                    <span className="text-primary text-3xl font-bold">1</span>
                  </div>
                  <h3 className="mb-3 text-xl font-semibold">Connect GitHub</h3>
                  <p className="text-muted-foreground">
                    Link your GitHub repository with a simple URL. Works with
                    both public and private repos.
                  </p>
                </CardContent>
              </Card>
            </div>

            <div className="group relative">
              <div className="absolute -inset-1 rounded-2xl bg-gradient-to-r from-purple-600 to-pink-600 opacity-0 blur transition-all duration-500 group-hover:opacity-20"></div>
              <Card className="border-primary/20 relative shadow-lg transition-all duration-300 hover:shadow-xl">
                <CardContent className="p-8 text-center">
                  <div className="mx-auto mb-6 flex size-20 items-center justify-center rounded-full bg-gradient-to-br from-purple-500/20 to-purple-500/10 shadow-inner">
                    <span className="text-3xl font-bold text-purple-500">
                      2
                    </span>
                  </div>
                  <h3 className="mb-3 text-xl font-semibold">AI Indexing</h3>
                  <p className="text-muted-foreground">
                    Our AI automatically indexes and understands your entire
                    codebase structure and relationships.
                  </p>
                </CardContent>
              </Card>
            </div>

            <div className="group relative">
              <div className="absolute -inset-1 rounded-2xl bg-gradient-to-r from-pink-600 to-orange-600 opacity-0 blur transition-all duration-500 group-hover:opacity-20"></div>
              <Card className="border-primary/20 relative shadow-lg transition-all duration-300 hover:shadow-xl">
                <CardContent className="p-8 text-center">
                  <div className="mx-auto mb-6 flex size-20 items-center justify-center rounded-full bg-gradient-to-br from-pink-500/20 to-pink-500/10 shadow-inner">
                    <span className="text-3xl font-bold text-pink-500">3</span>
                  </div>
                  <h3 className="mb-3 text-xl font-semibold">Ask & Learn</h3>
                  <p className="text-muted-foreground">
                    Start asking questions and get instant, accurate answers
                    with relevant code snippets.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="bg-muted/30 border-y py-16">
        <div className="container mx-auto px-6">
          <div className="grid gap-8 md:grid-cols-4">
            <div className="text-center">
              <div className="mx-auto mb-3 flex size-16 items-center justify-center rounded-full bg-gradient-to-br from-blue-500/20 to-blue-500/10">
                <Users className="size-8 text-blue-500" />
              </div>
              <p className="text-4xl font-bold">15K+</p>
              <p className="text-muted-foreground mt-1 text-sm">
                Active Developers
              </p>
            </div>
            <div className="text-center">
              <div className="mx-auto mb-3 flex size-16 items-center justify-center rounded-full bg-gradient-to-br from-green-500/20 to-green-500/10">
                <Code className="size-8 text-green-500" />
              </div>
              <p className="text-4xl font-bold">10K+</p>
              <p className="text-muted-foreground mt-1 text-sm">
                Repositories Analyzed
              </p>
            </div>
            <div className="text-center">
              <div className="mx-auto mb-3 flex size-16 items-center justify-center rounded-full bg-gradient-to-br from-purple-500/20 to-purple-500/10">
                <Activity className="size-8 text-purple-500" />
              </div>
              <p className="text-4xl font-bold">1M+</p>
              <p className="text-muted-foreground mt-1 text-sm">
                Questions Answered
              </p>
            </div>
            <div className="text-center">
              <div className="mx-auto mb-3 flex size-16 items-center justify-center rounded-full bg-gradient-to-br from-orange-500/20 to-orange-500/10">
                <TrendingUp className="size-8 text-orange-500" />
              </div>
              <p className="text-4xl font-bold">99.9%</p>
              <p className="text-muted-foreground mt-1 text-sm">
                Accuracy Rate
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="about" className="py-20">
        <div className="container mx-auto px-6">
          <div className="mb-16 text-center">
            <Badge className="mb-4 gap-1.5">
              <Star className="size-3 fill-current" />
              Testimonials
            </Badge>
            <h2 className="text-3xl font-bold md:text-4xl">
              Loved by Developers Worldwide
            </h2>
            <p className="text-muted-foreground mt-3 text-lg">
              See what developers are saying about Gitly AI
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            {/* Testimonial 1 */}
            <Card className="border-primary/20 shadow-lg transition-all duration-300 hover:shadow-xl">
              <CardContent className="p-6">
                <div className="mb-4 flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className="size-4 fill-yellow-400 text-yellow-400"
                    />
                  ))}
                </div>
                <p className="text-muted-foreground mb-4">
                  &ldquo;Gitly AI has completely transformed how I onboard to
                  new projects. I can understand complex codebases in minutes
                  instead of days!&rdquo;
                </p>
                <div className="flex items-center gap-3">
                  <Avatar>
                    <AvatarFallback className="bg-gradient-to-br from-blue-500 to-blue-600 text-white">
                      JD
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-semibold">John Doe</p>
                    <p className="text-muted-foreground text-sm">
                      Senior Developer
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Testimonial 2 */}
            <Card className="border-primary/20 shadow-lg transition-all duration-300 hover:shadow-xl">
              <CardContent className="p-6">
                <div className="mb-4 flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className="size-4 fill-yellow-400 text-yellow-400"
                    />
                  ))}
                </div>
                <p className="text-muted-foreground mb-4">
                  &ldquo;The AI-powered commit summaries save me hours every
                  week. It&apos;s like having a senior developer reviewing every
                  change!&rdquo;
                </p>
                <div className="flex items-center gap-3">
                  <Avatar>
                    <AvatarFallback className="bg-gradient-to-br from-purple-500 to-purple-600 text-white">
                      SA
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-semibold">Sarah Anderson</p>
                    <p className="text-muted-foreground text-sm">Tech Lead</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Testimonial 3 */}
            <Card className="border-primary/20 shadow-lg transition-all duration-300 hover:shadow-xl">
              <CardContent className="p-6">
                <div className="mb-4 flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className="size-4 fill-yellow-400 text-yellow-400"
                    />
                  ))}
                </div>
                <p className="text-muted-foreground mb-4">
                  &ldquo;Best tool for code documentation and knowledge sharing.
                  Our team productivity has increased by 40% since we started
                  using it!&rdquo;
                </p>
                <div className="flex items-center gap-3">
                  <Avatar>
                    <AvatarFallback className="bg-gradient-to-br from-green-500 to-green-600 text-white">
                      MK
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-semibold">Michael Kim</p>
                    <p className="text-muted-foreground text-sm">
                      Engineering Manager
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Trust Section */}
      <section className="bg-muted/30 border-y py-16">
        <div className="container mx-auto px-6">
          <div className="grid gap-8 md:grid-cols-3">
            <div className="flex items-start gap-4">
              <div className="flex size-12 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-green-500/20 to-green-500/10">
                <Shield className="size-6 text-green-500" />
              </div>
              <div>
                <h3 className="mb-2 font-semibold">Enterprise Security</h3>
                <p className="text-muted-foreground text-sm">
                  Bank-level encryption and SOC 2 compliance to keep your code
                  safe.
                </p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="flex size-12 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-blue-500/20 to-blue-500/10">
                <Lock className="size-6 text-blue-500" />
              </div>
              <div>
                <h3 className="mb-2 font-semibold">Private by Default</h3>
                <p className="text-muted-foreground text-sm">
                  Your code never leaves your infrastructure. Full data privacy
                  guaranteed.
                </p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="flex size-12 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-purple-500/20 to-purple-500/10">
                <Globe className="size-6 text-purple-500" />
              </div>
              <div>
                <h3 className="mb-2 font-semibold">99.9% Uptime</h3>
                <p className="text-muted-foreground text-sm">
                  Built on reliable infrastructure with automatic failover and
                  backups.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section id="contact" className="relative py-20">
        <div className="via-primary/5 absolute inset-0 bg-gradient-to-b from-transparent to-transparent"></div>
        <div className="relative container mx-auto px-6">
          <Card className="border-primary/20 relative overflow-hidden shadow-2xl">
            <div className="from-primary/10 to-primary/5 absolute inset-0 bg-gradient-to-br"></div>
            <div className="bg-primary/10 absolute top-0 right-0 size-64 rounded-full blur-3xl"></div>
            <div className="absolute bottom-0 left-0 size-64 rounded-full bg-purple-500/10 blur-3xl"></div>
            <CardContent className="relative p-12 text-center">
              <div className="from-primary/20 to-primary/10 mx-auto mb-6 flex size-16 items-center justify-center rounded-full bg-gradient-to-br">
                <Sparkles className="text-primary size-8 animate-pulse" />
              </div>
              <h2 className="mb-4 text-4xl font-bold">
                Ready to Transform Your Development Workflow?
              </h2>
              <p className="text-muted-foreground mx-auto mb-8 max-w-2xl text-xl">
                Join 15,000+ developers using Gitly AI to understand their
                codebases better and ship faster.
              </p>
              <div className="flex flex-wrap items-center justify-center gap-3">
                <Link href="/sign-up">
                  <Button
                    size="lg"
                    className="hover:shadow-primary/50 gap-2 text-lg shadow-lg"
                  >
                    <Zap className="size-5" />
                    Get Started Free
                  </Button>
                </Link>
              </div>
              <p className="text-muted-foreground mt-4 text-sm">
                No credit card required • Free tier available • Cancel anytime
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-muted/30 border-t py-12">
        <div className="container mx-auto px-6">
          <div className="grid gap-8 md:grid-cols-4">
            <div className="col-span-1">
              <div className="mb-4 flex items-center gap-2">
                <div className="from-primary/20 to-primary/10 flex size-10 items-center justify-center rounded-lg bg-gradient-to-br">
                  <Github className="text-primary size-6" />
                </div>
                <span className="text-xl font-bold">Gitly AI</span>
              </div>
              <p className="text-muted-foreground text-sm">
                Transform your GitHub repositories into intelligent, searchable
                knowledge bases with AI.
              </p>
            </div>
            <div>
              <h3 className="mb-4 font-semibold">Product</h3>
              <ul className="text-muted-foreground space-y-2 text-sm">
                <li>
                  <Link href="/sign-up" className="hover:text-primary">
                    Features
                  </Link>
                </li>
                <li>
                  <Link href="/sign-up" className="hover:text-primary">
                    Pricing
                  </Link>
                </li>
                <li>
                  <Link href="/sign-up" className="hover:text-primary">
                    Documentation
                  </Link>
                </li>
                <li>
                  <Link href="/sign-up" className="hover:text-primary">
                    API
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="mb-4 font-semibold">Company</h3>
              <ul className="text-muted-foreground space-y-2 text-sm">
                <li>
                  <Link href="/sign-up" className="hover:text-primary">
                    About
                  </Link>
                </li>
                <li>
                  <Link href="/sign-up" className="hover:text-primary">
                    Blog
                  </Link>
                </li>
                <li>
                  <Link href="/sign-up" className="hover:text-primary">
                    Careers
                  </Link>
                </li>
                <li>
                  <Link href="/sign-up" className="hover:text-primary">
                    Contact
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="mb-4 font-semibold">Legal</h3>
              <ul className="text-muted-foreground space-y-2 text-sm">
                <li>
                  <Link href="/sign-up" className="hover:text-primary">
                    Privacy
                  </Link>
                </li>
                <li>
                  <Link href="/sign-up" className="hover:text-primary">
                    Terms
                  </Link>
                </li>
                <li>
                  <Link href="/sign-up" className="hover:text-primary">
                    Security
                  </Link>
                </li>
                <li>
                  <Link href="/sign-up" className="hover:text-primary">
                    Compliance
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="text-muted-foreground mt-12 border-t pt-8 text-center text-sm">
            <p>© 2025 Gitly AI. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
