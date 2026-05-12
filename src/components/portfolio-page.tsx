"use client";

import dynamic from "next/dynamic";
import Link from "next/link";
import type React from "react";
import {
  ArrowDown,
  ArrowUpRight,
  CheckCircle2,
  Download,
  Github,
  Linkedin,
  Mail,
  MapPin,
  Phone,
  Rocket,
  Server,
  Sparkles,
  TerminalSquare
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
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

const navItems = ["About", "Experience", "Projects", "Systems", "Skills", "Contact"];

export function PortfolioPage() {
  return (
    <main className="min-h-screen overflow-hidden">
      <Header />
      <HeroSection />
      <AboutSection />
      <ExperienceSection />
      <ProjectsSection />
      <SystemsSection />
      <SkillsSection />
      <AchievementsSection />
      <ContactSection />
    </main>
  );
}

function Header() {
  return (
    <header className="fixed left-0 right-0 top-4 z-40 mx-auto w-[min(1120px,calc(100%-24px))]">
      <nav className="glass flex h-14 items-center justify-between rounded-lg px-3 shadow-soft-black">
        <Link href="#top" className="flex items-center gap-2 rounded-md px-2 py-1.5 text-sm font-semibold">
          <span className="flex h-8 w-8 items-center justify-center rounded-md bg-foreground text-background">MS</span>
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

function HeroSection() {
  return (
    <section id="top" className="relative min-h-[96vh] px-4 pb-16 pt-28 sm:px-6 lg:px-8">
      <div className="mx-auto grid w-full max-w-7xl items-center gap-10 lg:grid-cols-[1.05fr_0.95fr]">
        <Reveal>
          <div className="space-y-8">
            <Badge className="border-cyan-300/35 bg-cyan-300/10 text-cyan-700 dark:text-cyan-200">
              <Sparkles className="mr-2 h-3.5 w-3.5" />
              Backend systems, AI microservices, cloud delivery
            </Badge>
            <div className="space-y-5">
              <h1 className="text-balance text-5xl font-semibold leading-[1.02] tracking-normal sm:text-6xl lg:text-7xl">
                {profile.name}
              </h1>
              <p className="max-w-2xl text-balance text-xl leading-8 text-muted-foreground sm:text-2xl">
                Production-minded developer building scalable Java/Python systems, live SaaS products, and AI-enabled engineering workflows.
              </p>
            </div>
            <div className="grid max-w-2xl grid-cols-2 gap-3 sm:grid-cols-4">
              {profile.metrics.map((metric) => (
                <div key={metric.label} className="glass rounded-lg p-4">
                  <div className="text-2xl font-semibold">{metric.value}</div>
                  <div className="mt-1 text-xs text-muted-foreground">{metric.label}</div>
                </div>
              ))}
            </div>
            <div className="flex flex-wrap gap-3">
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
        <ParallaxPanel className="relative min-h-[430px] overflow-hidden rounded-lg border border-border bg-slate-950 shadow-soft-black">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(34,211,238,0.28),transparent_38%),linear-gradient(145deg,rgba(15,23,42,0.2),rgba(2,6,23,0.98))]" />
          <HeroOrbit />
          <div className="absolute bottom-4 left-4 right-4 grid gap-3 sm:grid-cols-3">
            {["JWT/RBAC", "Redis cache", "AWS EC2"].map((item) => (
              <div key={item} className="rounded-md border border-white/10 bg-white/[0.08] px-3 py-2 text-xs text-white/80 backdrop-blur">
                {item}
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
        <Reveal className="glass rounded-lg p-6 sm:p-8">
          <p className="text-lg leading-8 text-muted-foreground">{profile.summary}</p>
          <div className="mt-7 grid gap-3 sm:grid-cols-3">
            {[
              ["Focus", "Backend engineering, distributed systems, cloud/DevOps"],
              ["Strength", "Microservices, auth, caching, APIs, deployment"],
              ["Edge", "AI/ML integration with production Java backends"]
            ].map(([label, value]) => (
              <div key={label} className="rounded-lg border border-border bg-background/40 p-4">
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
              <div key={item.title} className="glass rounded-lg p-5">
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
              <article className="glass relative rounded-lg p-6 md:ml-14">
                <div className="absolute -left-[4.25rem] top-6 hidden h-10 w-10 items-center justify-center rounded-md border border-border bg-card md:flex">
                  <Icon className="h-5 w-5 text-cyan-500" />
                </div>
                <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
                  <div>
                    <h3 className="text-xl font-semibold">{experience.role}</h3>
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

function ProjectsSection() {
  return (
    <Section id="projects" eyebrow="Featured projects" title="Product-style showcases for systems that actually shipped.">
      <div className="space-y-8">
        {projects.map((project, index) => (
          <Reveal key={project.name} delay={index * 0.08}>
            <article className="glass overflow-hidden rounded-lg">
              <div className="grid gap-0 lg:grid-cols-[0.9fr_1.1fr]">
                <div className={cn("relative min-h-[320px] bg-gradient-to-br p-6 text-white", project.accent)}>
                  <div className="absolute inset-0 bg-slate-950/20" />
                  <div className="relative flex h-full flex-col justify-between">
                    <div>
                      <Badge className="border-white/20 bg-white/15 text-white">{project.label}</Badge>
                      <h3 className="mt-5 text-3xl font-semibold">{project.name}</h3>
                    </div>
                    <div className="grid gap-3">
                      {project.architecture.map((node, nodeIndex) => (
                        <MotionDiv
                          key={node}
                          className="flex items-center gap-3 rounded-md border border-white/20 bg-white/[0.14] px-4 py-3 backdrop-blur"
                          whileHover={{ x: 8 }}
                        >
                          <span className="flex h-8 w-8 items-center justify-center rounded-md bg-white/20 font-mono text-xs">
                            {String(nodeIndex + 1).padStart(2, "0")}
                          </span>
                          <span className="text-sm font-medium">{node}</span>
                        </MotionDiv>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="p-6 sm:p-8">
                  <p className="text-lg leading-8 text-muted-foreground">{project.description}</p>
                  <div className="mt-6 flex flex-wrap gap-2">
                    {project.stack.map((tech) => (
                      <Badge key={tech}>{tech}</Badge>
                    ))}
                  </div>
                  <div className="mt-7 grid gap-3 sm:grid-cols-2">
                    {project.stats.map((stat) => (
                      <div key={stat} className="rounded-lg border border-border bg-background/45 p-4 text-sm">
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
    </Section>
  );
}

function SystemsSection() {
  const nodes = ["Client", "API Gateway", "Auth", "Services", "Cache", "Database", "AI/ML"];
  return (
    <Section id="systems" eyebrow="Engineering view" title="Architecture patterns that show how the work holds together.">
      <div className="grid gap-5 lg:grid-cols-[0.9fr_1.1fr]">
        <Reveal className="glass rounded-lg p-6">
          <h3 className="text-xl font-semibold">System design strengths</h3>
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
        <Reveal delay={0.08} className="glass rounded-lg p-6">
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
            {nodes.map((node, index) => (
              <MotionDiv
                key={node}
                className="relative rounded-lg border border-border bg-background/40 p-4"
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
              <div className="glass h-full rounded-lg p-5 transition hover:-translate-y-1 hover:shadow-glow">
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
                className="glass group block h-full rounded-lg p-5 transition hover:-translate-y-1 hover:shadow-glow"
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
  return (
    <section id="contact" className="px-4 py-24 sm:px-6 lg:px-8">
      <Reveal>
        <div className="mx-auto max-w-5xl overflow-hidden rounded-lg border border-border bg-foreground text-background shadow-soft-black">
          <div className="grid gap-0 lg:grid-cols-[1.1fr_0.9fr]">
            <div className="p-7 sm:p-10">
              <Badge className="border-background/20 bg-background/10 text-background">Open to strong engineering roles</Badge>
              <h2 className="mt-5 text-3xl font-semibold sm:text-5xl">Let’s build systems that survive real traffic.</h2>
              <p className="mt-5 max-w-2xl text-background/72">
                Available for backend, full-stack, DevOps, and AI integration opportunities where shipping production-quality software matters.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Button asChild variant="glow">
                  <a href={`mailto:${profile.email}`}>
                    <Mail className="h-4 w-4" />
                    Email
                  </a>
                </Button>
                <Button asChild variant="secondary" className="border-background/20 bg-background/10 text-background hover:bg-background/20">
                  <a href={links.linkedin} target="_blank" rel="noreferrer">
                    <Linkedin className="h-4 w-4" />
                    LinkedIn
                  </a>
                </Button>
                <Button asChild variant="secondary" className="border-background/20 bg-background/10 text-background hover:bg-background/20">
                  <a href={links.leetcode} target="_blank" rel="noreferrer">
                    LeetCode
                  </a>
                </Button>
              </div>
            </div>
            <div className="border-t border-background/15 p-7 sm:p-10 lg:border-l lg:border-t-0">
              <div className="grid gap-4 text-sm">
                <ContactRow icon={Mail} label="Email" value={profile.email} href={`mailto:${profile.email}`} />
                <ContactRow icon={Phone} label="Phone" value={profile.phone} href={`tel:${profile.phone.replaceAll(" ", "")}`} />
                <ContactRow icon={MapPin} label="Location" value={profile.location} />
                <ContactRow icon={Github} label="GitHub" value="github.com/mdsadiqueshakeel" href={links.github} />
              </div>
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
    <div className="flex items-center gap-3 rounded-lg border border-background/15 bg-background/[0.08] p-4">
      <Icon className="h-4 w-4 shrink-0" />
      <div>
        <div className="text-xs uppercase tracking-[0.2em] text-background/50">{label}</div>
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
    <section id={id} className="px-4 py-20 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <Reveal className="mb-10 max-w-3xl">
          <Badge>{eyebrow}</Badge>
          <h2 className="mt-4 text-balance text-3xl font-semibold leading-tight sm:text-5xl">{title}</h2>
        </Reveal>
        {children}
      </div>
    </section>
  );
}
