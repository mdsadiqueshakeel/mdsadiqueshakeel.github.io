"use client";

import dynamic from "next/dynamic";
import Link from "next/link";
import type React from "react";
import { useState } from "react";
import {
  ArrowDown,
  ArrowUpRight,
  Check,
  CheckCircle2,
  Code2,
  Download,
  Github,
  Home,
  Layers3,
  Linkedin,
  Mail,
  MapPin,
  MessageCircle,
  Rocket,
  Send,
  Server,
  ShieldCheck,
  Sparkles,
  TerminalSquare
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { LeetCodeAnalytics } from "@/components/leetcode-analytics";
import { MotionDiv, ParallaxPanel, Reveal } from "@/components/motion";
import { ThemeToggle } from "@/components/theme-toggle";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { achievements, education, experiences, links, profile, projects, skills } from "@/lib/portfolio-data";
import { cn } from "@/lib/utils";

const HeroOrbit = dynamic(() => import("@/components/hero-orbit").then((mod) => mod.HeroOrbit), {
  ssr: false,
  loading: () => <div className="absolute inset-0 animate-pulse bg-cyan-400/5" />
});

const navItems = ["About", "Experience", "Code", "Projects", "Systems", "Contact"];

export function PortfolioPage() {
  return (
    <main className="min-h-screen overflow-hidden pb-20 md:pb-0">
      <Header />
      <MobileDock />
      <HeroSection />
      <AboutSection />
      <CodingSection />
      <ExperienceSection />
      <ProjectsSection />
      <SystemsSection />
      <SkillsSection />
      <AchievementsSection />
      <ContactSection />
    </main>
  );
}

const mobileDockItems = [
  { label: "Home", href: "#top", icon: Home },
  { label: "Code", href: "#code", icon: Code2 },
  { label: "Work", href: "#projects", icon: Layers3 },
  { label: "Talk", href: "#contact", icon: MessageCircle }
];

function Header() {
  return (
    <header className="fixed left-0 right-0 top-3 z-40 mx-auto w-[min(1120px,calc(100%-16px))] sm:top-4 sm:w-[min(1120px,calc(100%-24px))]">
      <nav className="glass flex h-12 items-center justify-between rounded-lg px-2 shadow-soft-black sm:h-14 sm:px-3">
        <Link href="#top" className="flex items-center gap-2 rounded-md px-2 py-1.5 text-sm font-semibold">
          <span className="flex h-7 w-7 items-center justify-center rounded-md bg-foreground text-xs text-background sm:h-8 sm:w-8 sm:text-sm">MS</span>
          <span className="hidden sm:block">Md Sadique Shakeel</span>
        </Link>
        <div className="hidden items-center gap-1 lg:flex">
          {navItems.map((item) => (
            <Link
              key={item}
              href={`#${item.toLowerCase()}`}
              className="rounded-md px-3 py-2 text-sm text-muted-foreground transition hover:bg-muted hover:text-foreground"
            >
              {item}
            </Link>
          ))}
        </div>
        <div className="flex items-center gap-2">
          <Button asChild variant="secondary" size="sm">
            <a href={profile.resumePath} download>
              <Download className="h-4 w-4" />
              <span className="hidden sm:inline">Resume</span>
            </a>
          </Button>
          <ThemeToggle />
        </div>
      </nav>
    </header>
  );
}

function MobileDock() {
  return (
    <nav className="fixed bottom-3 left-1/2 z-50 w-[min(360px,calc(100%-24px))] -translate-x-1/2 md:hidden">
      <div className="glass grid grid-cols-4 rounded-lg p-1.5 shadow-soft-black">
        {mobileDockItems.map((item) => {
          const Icon = item.icon;
          return (
            <Link
              key={item.label}
              href={item.href}
              className="group flex flex-col items-center gap-1 rounded-md px-2 py-2 text-[0.68rem] font-medium text-muted-foreground transition hover:bg-muted hover:text-foreground"
            >
              <Icon className="h-4 w-4 transition group-hover:-translate-y-0.5" />
              {item.label}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}

function HeroSection() {
  return (
    <section id="top" className="relative min-h-[92vh] overflow-hidden px-3 pb-10 pt-24 sm:px-6 sm:pb-16 sm:pt-28 lg:min-h-[96vh] lg:px-8">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_72%_42%,rgba(34,211,238,0.18),transparent_34%),radial-gradient(circle_at_86%_74%,rgba(251,191,36,0.1),transparent_28%)]" />
      <HeroOrbit />
      {/* <div className="pointer-events-none absolute right-4 top-28 hidden w-[min(520px,42vw)] rounded-lg border border-border/70 bg-card/35 p-4 shadow-soft-black backdrop-blur-xl lg:block">
        <div className="flex items-center justify-between text-xs text-muted-foreground">
          <span>distributed-runtime.map</span>
          <span className="text-emerald-500">healthy</span>
        </div>
        <div className="mt-4 grid gap-3">
          {["API Gateway", "Spring Services", "AI Inference", "Redis + Data Stores"].map((item, index) => (
            <div key={item} className="flex items-center gap-3 rounded-md border border-border/70 bg-background/35 px-3 py-2">
              <span className="flex h-7 w-7 items-center justify-center rounded-md bg-cyan-400/15 font-mono text-xs text-cyan-600 dark:text-cyan-200">
                {index + 1}
              </span>
              <span className="text-sm">{item}</span>
              <span className="ml-auto h-1.5 w-1.5 rounded-full bg-emerald-400 shadow-[0_0_16px_rgba(52,211,153,0.8)]" />
            </div>
          ))}
        </div>
      </div> */}
      <div className="relative mx-auto grid w-full max-w-7xl items-center gap-6 sm:gap-10 lg:min-h-[calc(96vh-9rem)] lg:grid-cols-[1.02fr_0.98fr]">
        <Reveal className="relative z-10">
          <div className="max-w-3xl space-y-5 sm:space-y-8">
            <Badge className="border-cyan-300/35 bg-cyan-300/10 text-cyan-700 dark:text-cyan-200">
              <Sparkles className="mr-2 h-3.5 w-3.5" />
              Backend systems, AI microservices, cloud delivery
            </Badge>
            <div className="space-y-3 sm:space-y-5">
              <h1 className="text-balance text-4xl font-semibold leading-[1.03] tracking-normal min-[380px]:text-[2.65rem] sm:text-6xl lg:text-7xl">
                {profile.name}
              </h1>
              <p className="max-w-2xl text-balance text-base leading-7 text-muted-foreground sm:text-2xl sm:leading-8">
                Production-minded developer building scalable Java/Python systems, live SaaS products, and AI-enabled engineering workflows.
              </p>
            </div>
            <div className="grid max-w-2xl grid-cols-2 gap-2 sm:grid-cols-4 sm:gap-3">
              {profile.metrics.map((metric) => (
                <div key={metric.label} className="glass rounded-lg p-3 sm:p-4">
                  <div className="text-xl font-semibold sm:text-2xl">{metric.value}</div>
                  <div className="mt-1 text-xs text-muted-foreground">{metric.label}</div>
                </div>
              ))}
            </div>
            <div className="glass grid grid-cols-[auto_1fr] gap-3 rounded-lg p-3 sm:hidden">
              <div className="flex h-10 w-10 items-center justify-center rounded-md bg-cyan-400/15 text-cyan-600 dark:text-cyan-200">
                <Server className="h-5 w-5" />
              </div>
              <div>
                <div className="flex items-center justify-between gap-3">
                  <span className="text-sm font-semibold">Production backend cockpit</span>
                  <span className="h-2 w-2 rounded-full bg-emerald-400 shadow-[0_0_16px_rgba(52,211,153,0.8)]" />
                </div>
                <div className="mt-2 grid grid-cols-3 gap-1.5 text-[0.68rem] text-muted-foreground">
                  <span className="rounded-sm bg-background/50 px-2 py-1">JWT</span>
                  <span className="rounded-sm bg-background/50 px-2 py-1">Redis</span>
                  <span className="rounded-sm bg-background/50 px-2 py-1">AWS</span>
                </div>
              </div>
            </div>
            <div className="flex flex-wrap gap-2 sm:gap-3">
              <Button asChild variant="glow">
                <Link href="#projects">
                  <Rocket className="h-4 w-4" />
                  View projects
                </Link>
              </Button>
              <Button asChild variant="secondary">
                <a href={links.github} target="_blank" rel="noreferrer">
                  <Github className="h-4 w-4" />
                  GitHub
                </a>
              </Button>
              <Button asChild variant="secondary">
                <a href={`mailto:${profile.email}`}>
                  <Mail className="h-4 w-4" />
                  Contact
                </a>
              </Button>
            </div>
          </div>
        </Reveal>
        <ParallaxPanel className="relative z-10 min-h-[235px] sm:min-h-[340px] lg:min-h-[520px]">
          <div className="absolute bottom-2 left-0 right-0 grid grid-cols-3 gap-2 sm:bottom-4 sm:gap-3 lg:bottom-12 lg:left-10 lg:right-10">
            {[
              ["Auth", "JWT/RBAC"],
              ["Latency", "Redis cache"],
              ["Delivery", "AWS EC2"]
            ].map(([label, value]) => (
              <div key={value} className="glass rounded-lg p-2.5 shadow-soft-black sm:p-4">
                <div className="text-[0.62rem] uppercase tracking-[0.14em] text-muted-foreground sm:text-xs sm:tracking-[0.2em]">{label}</div>
                <div className="mt-1 text-xs font-semibold sm:mt-2 sm:text-sm">{value}</div>
                <div className="flow-line mt-3 h-px rounded-full" />
              </div>
            ))}
          </div>
        </ParallaxPanel>
      </div>
      <Link
        href="#about"
        aria-label="Scroll to about"
        className="absolute bottom-5 left-1/2 hidden -translate-x-1/2 rounded-full border border-border bg-card/60 p-3 text-muted-foreground backdrop-blur transition hover:text-foreground md:block"
      >
        <ArrowDown className="h-4 w-4" />
      </Link>
    </section>
  );
}

function AboutSection() {
  return (
    <Section id="about" eyebrow="Current signal" title="A backend-first engineer with product shipping instincts.">
      <div className="grid gap-5 lg:grid-cols-[1fr_0.8fr]">
        <Reveal className="glass rounded-lg p-4 sm:p-8">
          <p className="text-sm leading-7 text-muted-foreground sm:text-lg sm:leading-8">{profile.summary}</p>
          <div className="mt-5 grid gap-3 sm:mt-7 sm:grid-cols-3">
            {[
              ["Focus", "Backend engineering, distributed systems, cloud/DevOps"],
              ["Strength", "Microservices, auth, caching, APIs, deployment"],
              ["Edge", "AI/ML integration with production Java backends"]
            ].map(([label, value]) => (
              <div key={label} className="rounded-lg border border-border bg-background/40 p-3 sm:p-4">
                <div className="text-xs uppercase tracking-[0.2em] text-muted-foreground">{label}</div>
                <div className="mt-2 text-sm leading-6">{value}</div>
              </div>
            ))}
          </div>
        </Reveal>
        <Reveal delay={0.08} className="space-y-4">
          {education.map((item) => {
            const Icon = item.icon;
            return (
              <div key={item.title} className="glass rounded-lg p-4 sm:p-5">
                <Icon className="h-5 w-5 text-cyan-500" />
                <h3 className="mt-3 font-semibold">{item.title}</h3>
                <p className="mt-1 text-sm text-muted-foreground">{item.org}</p>
                <p className="mt-2 text-sm">{item.meta}</p>
              </div>
            );
          })}
        </Reveal>
      </div>
    </Section>
  );
}

function ExperienceSection() {
  return (
    <Section id="experience" eyebrow="Experience" title="Production delivery across freelance systems and DevOps work.">
      <div className="relative space-y-5">
        <div className="absolute left-5 top-5 hidden h-[calc(100%-40px)] w-px bg-border md:block" />
        {experiences.map((experience, index) => {
          const Icon = experience.icon;
          return (
            <Reveal key={experience.role} delay={index * 0.08}>
              <article className="glass relative rounded-lg p-4 sm:p-6 md:ml-14">
                <div className="absolute -left-[4.25rem] top-6 hidden h-10 w-10 items-center justify-center rounded-md border border-border bg-card md:flex">
                  <Icon className="h-5 w-5 text-cyan-500" />
                </div>
                <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
                  <div>
                    <h3 className="text-lg font-semibold sm:text-xl">{experience.role}</h3>
                    <p className="text-muted-foreground">{experience.company}</p>
                  </div>
                  <Badge>{experience.period}</Badge>
                </div>
                <ul className="mt-5 grid gap-3">
                  {experience.highlights.map((highlight) => (
                    <li key={highlight} className="flex gap-3 text-sm leading-6 text-muted-foreground">
                      <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-emerald-500" />
                      <span>{highlight}</span>
                    </li>
                  ))}
                </ul>
                {"certificate" in experience && experience.certificate ? (
                  <Button asChild variant="secondary" size="sm" className="mt-5">
                    <a href={experience.certificate} target="_blank" rel="noreferrer">
                      Certificate <ArrowUpRight className="h-4 w-4" />
                    </a>
                  </Button>
                ) : null}
              </article>
            </Reveal>
          );
        })}
      </div>
    </Section>
  );
}

function CodingSection() {
  return (
    <Section id="code" eyebrow="Coding consistency" title="LeetCode analytics built for recruiter confidence.">
      <LeetCodeAnalytics />
    </Section>
  );
}

function ProjectsSection() {
  return (
    <Section id="projects" eyebrow="Featured projects" title="Cinematic case studies for systems that actually shipped.">
      <div className="-mx-3 flex snap-x gap-4 overflow-x-auto px-3 pb-3 [scrollbar-width:none] md:mx-0 md:block md:space-y-10 md:overflow-visible md:px-0 md:pb-0">
        {projects.map((project, index) => (
          <Reveal key={project.name} delay={index * 0.08} className="min-w-[86vw] snap-center md:min-w-0">
            <article className="glass depth-card overflow-hidden rounded-lg">
              <div className="grid gap-0 lg:grid-cols-[0.9fr_1.1fr]">
                <div className={cn("relative min-h-[280px] bg-gradient-to-br p-4 text-white sm:min-h-[320px] sm:p-6", project.accent)}>
                  <div className="absolute inset-0 bg-slate-950/30" />
                  <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.13)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.13)_1px,transparent_1px)] bg-[size:38px_38px] opacity-30" />
                  <div className="relative flex h-full flex-col justify-between">
                    <div>
                      <Badge className="border-white/20 bg-white/15 text-white">{project.label}</Badge>
                      <h3 className="mt-4 text-2xl font-semibold sm:mt-5 sm:text-3xl">{project.name}</h3>
                    </div>
                    <div className="grid gap-3">
                      {project.architecture.map((node, nodeIndex) => (
                        <MotionDiv
                          key={node}
                          className="relative flex items-center gap-3 rounded-md border border-white/20 bg-white/[0.14] px-4 py-3 backdrop-blur"
                          whileHover={{ x: 8, scale: 1.015 }}
                        >
                          <span className="flex h-8 w-8 items-center justify-center rounded-md bg-white/20 font-mono text-xs">
                            {String(nodeIndex + 1).padStart(2, "0")}
                          </span>
                          <span className="text-sm font-medium">{node}</span>
                          {nodeIndex < project.architecture.length - 1 ? (
                            <span className="flow-line absolute -bottom-2 left-12 right-8 h-px" />
                          ) : null}
                        </MotionDiv>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="p-4 sm:p-8">
                  <div className="mb-6 grid gap-3 sm:grid-cols-3">
                    {["Design", "Deploy", "Monitor"].map((phase) => (
                      <div key={phase} className="rounded-lg border border-border bg-background/45 p-3">
                        <div className="text-xs uppercase tracking-[0.2em] text-muted-foreground">{phase}</div>
                        <div className="flow-line mt-3 h-px" />
                      </div>
                    ))}
                  </div>
                  <p className="text-sm leading-7 text-muted-foreground sm:text-lg sm:leading-8">{project.description}</p>
                  <div className="mt-6 flex flex-wrap gap-2">
                    {project.stack.map((tech) => (
                      <Badge key={tech}>{tech}</Badge>
                    ))}
                  </div>
                  <div className="mt-7 grid gap-3 sm:grid-cols-2">
                    {project.stats.map((stat) => (
                      <div key={stat} className="rounded-lg border border-border bg-background/45 p-3 text-sm sm:p-4">
                        {stat}
                      </div>
                    ))}
                  </div>
                  <ul className="mt-7 grid gap-3">
                    {project.bullets.map((bullet) => (
                      <li key={bullet} className="flex gap-3 text-sm leading-6 text-muted-foreground">
                        <TerminalSquare className="mt-0.5 h-4 w-4 shrink-0 text-cyan-500" />
                        <span>{bullet}</span>
                      </li>
                    ))}
                  </ul>
                  <div className="mt-7 flex flex-wrap gap-3">
                    {project.live ? (
                      <Button asChild variant="glow" size="sm">
                        <a href={project.live} target="_blank" rel="noreferrer">
                          Live demo <ArrowUpRight className="h-4 w-4" />
                        </a>
                      </Button>
                    ) : null}
                    <Button asChild variant="secondary" size="sm">
                      <a href={project.github} target="_blank" rel="noreferrer">
                        <Github className="h-4 w-4" />
                        GitHub
                      </a>
                    </Button>
                  </div>
                </div>
              </div>
            </article>
          </Reveal>
        ))}
      </div>
      <p className="mt-3 text-center text-xs text-muted-foreground md:hidden">Swipe through case studies</p>
    </Section>
  );
}

function SystemsSection() {
  const nodes = ["Client", "API Gateway", "Auth", "Services", "Cache", "Database", "AI/ML"];
  return (
    <Section id="systems" eyebrow="Engineering view" title="Architecture patterns that show how the work holds together.">
      <div className="grid gap-5 lg:grid-cols-[0.9fr_1.1fr]">
        <Reveal className="glass rounded-lg p-4 sm:p-6">
          <h3 className="text-lg font-semibold sm:text-xl">System design strengths</h3>
          <div className="mt-5 grid gap-3">
            {[
              "Service decomposition with API Gateway routing for unified access.",
              "JWT role-based security, rate limiting, structured error handling, and production logging.",
              "Redis caching, PostgreSQL/MongoDB schema design, and REST-based inter-service communication.",
              "Dockerized deployments on AWS EC2 with GitHub Actions CI/CD and zero-downtime release practices."
            ].map((item) => (
              <div key={item} className="flex gap-3 rounded-lg border border-border bg-background/40 p-4 text-sm leading-6 text-muted-foreground">
                <Server className="mt-0.5 h-4 w-4 shrink-0 text-cyan-500" />
                {item}
              </div>
            ))}
          </div>
        </Reveal>
        <Reveal delay={0.08} className="glass rounded-lg p-4 sm:p-6">
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
            {nodes.map((node, index) => (
              <MotionDiv
                key={node}
                className="relative rounded-lg border border-border bg-background/40 p-3 sm:p-4"
                whileHover={{ y: -5, scale: 1.02 }}
                transition={{ type: "spring", stiffness: 240, damping: 18 }}
              >
                <div className="font-mono text-xs text-muted-foreground">0{index + 1}</div>
                <div className="mt-3 font-semibold">{node}</div>
                <div className="mt-3 h-1 rounded-full bg-gradient-to-r from-cyan-400 via-emerald-300 to-amber-300" />
              </MotionDiv>
            ))}
          </div>
        </Reveal>
      </div>
    </Section>
  );
}


function SkillsSection() {
  return (
    <Section id="skills" eyebrow="Tech stack" title="A practical stack for backend depth and full-stack delivery.">
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {skills.map((skill, index) => {
          const Icon = skill.icon;
          return (
            <Reveal key={skill.title} delay={index * 0.04}>
              <div className="glass h-full rounded-lg p-4 transition hover:-translate-y-1 hover:shadow-glow sm:p-5">
                <Icon className="h-6 w-6 text-cyan-500" />
                <h3 className="mt-4 text-lg font-semibold">{skill.title}</h3>
                <div className="mt-4 flex flex-wrap gap-2">
                  {skill.items.map((item) => (
                    <Badge key={item}>{item}</Badge>
                  ))}
                </div>
              </div>
            </Reveal>
          );
        })}
      </div>
    </Section>
  );
}

function AchievementsSection() {
  return (
    <Section id="achievements" eyebrow="Achievements & certifications" title="Signals of consistency, fundamentals, and applied learning.">
      <div className="grid gap-4 md:grid-cols-2">
        {achievements.map((achievement, index) => {
          const Icon = achievement.icon;
          return (
            <Reveal key={achievement.title} delay={index * 0.05}>
              <a
                href={achievement.href}
                target="_blank"
                rel="noreferrer"
                className="glass group block h-full rounded-lg p-4 transition hover:-translate-y-1 hover:shadow-glow sm:p-5"
              >
                <div className="flex items-start justify-between gap-4">
                  <Icon className="h-6 w-6 text-cyan-500" />
                  <ArrowUpRight className="h-4 w-4 text-muted-foreground transition group-hover:text-foreground" />
                </div>
                <h3 className="mt-4 font-semibold">{achievement.title}</h3>
                <p className="mt-2 text-sm leading-6 text-muted-foreground">{achievement.detail}</p>
              </a>
            </Reveal>
          );
        })}
      </div>
    </Section>
  );
}

function ContactSection() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");

  const submitContact = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!form.name.trim() || !form.email.trim() || !form.message.trim()) {
      setStatus("error");
      return;
    }

    const subject = encodeURIComponent(`Portfolio inquiry from ${form.name}`);
    const body = encodeURIComponent(`Name: ${form.name}\nEmail: ${form.email}\n\n${form.message}`);
    window.location.href = `mailto:${profile.email}?subject=${subject}&body=${body}`;
    setStatus("success");
  };

  return (
    <section id="contact" className="px-3 py-16 sm:px-6 sm:py-24 lg:px-8">
      <Reveal>
        <div className="glass depth-card mx-auto max-w-6xl overflow-hidden rounded-lg shadow-soft-black">
          <div className="grid gap-0 lg:grid-cols-[0.9fr_1.1fr]">
            <div className="p-4 sm:p-10">
              <Badge className="border-cyan-300/30 bg-cyan-300/10 text-cyan-700 dark:text-cyan-200">Open to strong engineering roles</Badge>
              <h2 className="mt-4 text-2xl font-semibold sm:mt-5 sm:text-5xl">Let&apos;s build systems that survive real traffic.</h2>
              <p className="mt-5 max-w-2xl text-muted-foreground">
                Available for backend, full-stack, DevOps, and AI integration opportunities where shipping production-quality software matters.
              </p>
              <div className="mt-8 grid gap-4 text-sm">
                <ContactRow icon={Mail} label="Email" value={profile.email} href={`mailto:${profile.email}`} />
                <ContactRow icon={MapPin} label="Location" value={profile.location} />
                <ContactRow icon={Github} label="GitHub" value="github.com/mdsadiqueshakeel" href={links.github} />
              </div>
              <div className="mt-8 flex flex-wrap gap-3">
                <Button asChild variant="glow">
                  <a href={`mailto:${profile.email}`}>
                    <Mail className="h-4 w-4" />
                    Email
                  </a>
                </Button>
                <Button asChild variant="secondary">
                  <a href={links.linkedin} target="_blank" rel="noreferrer">
                    <Linkedin className="h-4 w-4" />
                    LinkedIn
                  </a>
                </Button>
                <Button asChild variant="secondary">
                  <a href={links.leetcode} target="_blank" rel="noreferrer">
                    <Code2 className="h-4 w-4" />
                    LeetCode
                  </a>
                </Button>
              </div>
            </div>
            <div className="border-t border-border p-4 sm:p-10 lg:border-l lg:border-t-0">
              <form onSubmit={submitContact} className="space-y-4">
                <div className="grid gap-4 sm:grid-cols-2">
                  <label className="grid gap-2 text-sm">
                    <span className="text-muted-foreground">Name</span>
                    <input
                      value={form.name}
                      onChange={(event) => setForm((current) => ({ ...current, name: event.target.value }))}
                      className="h-12 rounded-md border border-border bg-background/55 px-4 outline-none transition focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20"
                      placeholder="Your name"
                    />
                  </label>
                  <label className="grid gap-2 text-sm">
                    <span className="text-muted-foreground">Email</span>
                    <input
                      type="email"
                      value={form.email}
                      onChange={(event) => setForm((current) => ({ ...current, email: event.target.value }))}
                      className="h-12 rounded-md border border-border bg-background/55 px-4 outline-none transition focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20"
                      placeholder="you@company.com"
                    />
                  </label>
                </div>
                <label className="grid gap-2 text-sm">
                  <span className="text-muted-foreground">Message</span>
                  <textarea
                    value={form.message}
                    onChange={(event) => setForm((current) => ({ ...current, message: event.target.value }))}
                    className="min-h-36 resize-none rounded-md border border-border bg-background/55 px-4 py-3 outline-none transition focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20"
                    placeholder="Tell me about the role, project, or system you want to build."
                  />
                </label>
                <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                  <Button type="submit" variant="glow">
                    <Send className="h-4 w-4" />
                    Send message
                  </Button>
                  <MotionDiv
                    animate={{ opacity: status === "idle" ? 0.7 : 1, y: status === "idle" ? 0 : -2 }}
                    className={cn(
                      "flex items-center gap-2 text-sm",
                      status === "success" && "text-emerald-500",
                      status === "error" && "text-rose-500",
                      status === "idle" && "text-muted-foreground"
                    )}
                  >
                    {status === "success" ? <Check className="h-4 w-4" /> : <ShieldCheck className="h-4 w-4" />}
                    {status === "success"
                      ? "Email draft opened."
                      : status === "error"
                        ? "Please fill all fields."
                        : "Privacy-friendly contact."}
                  </MotionDiv>
                </div>
              </form>
            </div>
          </div>
        </div>
      </Reveal>
      <footer className="mx-auto mt-10 flex max-w-5xl flex-col gap-3 text-sm text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
        <span>Built with Next.js, TypeScript, Tailwind CSS, Framer Motion, and React Three Fiber.</span>
        <a href={links.portfolio} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 hover:text-foreground">
          Previous portfolio <ArrowUpRight className="h-4 w-4" />
        </a>
      </footer>
    </section>
  );
}

function ContactRow({
  icon: Icon,
  label,
  value,
  href
}: {
  icon: LucideIcon;
  label: string;
  value: string;
  href?: string;
}) {
  const content = (
    <div className="flex items-center gap-3 rounded-lg border border-border bg-background/45 p-4">
      <Icon className="h-4 w-4 shrink-0" />
      <div>
        <div className="text-xs uppercase tracking-[0.2em] text-muted-foreground">{label}</div>
        <div className="mt-1 break-all">{value}</div>
      </div>
    </div>
  );

  return href ? (
    <a href={href} target={href.startsWith("http") ? "_blank" : undefined} rel="noreferrer" className="transition hover:opacity-80">
      {content}
    </a>
  ) : (
    content
  );
}

function Section({
  id,
  eyebrow,
  title,
  children
}: {
  id: string;
  eyebrow: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section id={id} className="px-3 py-14 sm:px-6 sm:py-20 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <Reveal className="mb-7 max-w-3xl sm:mb-10">
          <Badge>{eyebrow}</Badge>
          <h2 className="mt-3 text-balance text-2xl font-semibold leading-tight sm:mt-4 sm:text-5xl">{title}</h2>
        </Reveal>
        {children}
      </div>
    </section>
  );
}
