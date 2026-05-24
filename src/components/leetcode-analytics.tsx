"use client";

import { motion } from "framer-motion";
import { Activity, Flame, GitCommitVertical, Radar, Trophy } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { links } from "@/lib/portfolio-data";
import { cn } from "@/lib/utils";

type Difficulty = {
  easy: number;
  medium: number;
  hard: number;
};

type HeatDay = {
  date: string;
  count: number;
};

type RecentSubmission = {
  submittedAt: string;
  title: string;
  status: string;
  lang: string;
};

type LeetCodeStats = {
  totalSolved: number;
  ranking: number | null;
  difficulty: Difficulty;
  streak: number;
  totalActiveDays: number | null;
  contestRating: number | null;
  contestAttend: number | null;
  heatmap: HeatDay[];
  recent: RecentSubmission[];
  source: "live" | "partial" | "fallback";
};

const username = "sadiqueshakeel";
const apiBase = "https://alfa-leetcode-api.onrender.com";

const fallbackStats: LeetCodeStats = {
  totalSolved: 300,
  ranking: null,
  difficulty: { easy: 92, medium: 171, hard: 37 },
  streak: 12,
  totalActiveDays: null,
  contestRating: null,
  contestAttend: null,
  heatmap: buildFallbackHeatmap(),
  recent: [
    { title: "Dynamic Programming Practice", status: "Accepted", lang: "Java", submittedAt: "Unknown time" },
    { title: "Graph Traversal Review", status: "Accepted", lang: "Python", submittedAt: "Unknown time" },
    { title: "Binary Search Pattern", status: "Accepted", lang: "Java", submittedAt: "Unknown time" }
  ],
  source: "fallback"
};

function readNumber(value: unknown) {
  const number = Number(value);
  return Number.isFinite(number) ? number : 0;
}

function readDifficulty(raw: unknown): Difficulty {
  const root = (raw ?? {}) as Record<string, unknown>;
  const direct = {
    easy: readNumber(root.easySolved),
    medium: readNumber(root.mediumSolved),
    hard: readNumber(root.hardSolved)
  };

  if (direct.easy || direct.medium || direct.hard) return direct;

  const stats = (root.matchedUserStats as Record<string, unknown> | undefined) ?? root;
  const lists = [root.totalSubmissions, stats.acSubmissionNum, stats.totalSubmissionNum];
  const difficulty = { easy: 0, medium: 0, hard: 0 };

  for (const list of lists) {
    if (!Array.isArray(list)) continue;
    for (const item of list as Array<Record<string, unknown>>) {
      const label = String(item.difficulty ?? "").toLowerCase();
      const count = readNumber(item.count);
      if (label === "easy") difficulty.easy = count;
      if (label === "medium") difficulty.medium = count;
      if (label === "hard") difficulty.hard = count;
    }
    if (difficulty.easy || difficulty.medium || difficulty.hard) break;
  }

  return difficulty;
}

function parseCalendar(raw: unknown): HeatDay[] {
  const record = (raw ?? {}) as Record<string, unknown>;
  const calendar = record.submissionCalendar ?? record.calendar;
  let parsed: Record<string, number> = {};

  try {
    parsed =
      typeof calendar === "string"
        ? (JSON.parse(calendar || "{}") as Record<string, number>)
        : ((calendar ?? {}) as Record<string, number>);
  } catch {
    parsed = {};
  }

  return lastNDays(112).map((date) => {
    const seconds = Math.floor(new Date(`${date}T00:00:00Z`).getTime() / 1000);
    return { date, count: readNumber(parsed[String(seconds)] ?? parsed[date]) };
  });
}

function computeStreak(heatmap: HeatDay[]) {
  let streak = 0;
  for (let index = heatmap.length - 1; index >= 0; index -= 1) {
    if (heatmap[index].count > 0) streak += 1;
    else if (streak > 0) break;
  }
  return streak;
}

function lastNDays(total: number) {
  return Array.from({ length: total }, (_, index) => {
    const date = new Date();
    date.setDate(date.getDate() - (total - index - 1));
    return date.toISOString().slice(0, 10);
  });
}

function buildFallbackHeatmap(): HeatDay[] {
  return Array.from({ length: 112 }, (_, index) => ({
    date: `fallback-day-${index + 1}`,
    count: [0, 1, 2, 3, 4][(index * 7 + 3) % 5]
  }));
}

async function fetchJson(path: string, timeoutMs = 9000) {
  const controller = new AbortController();
  const timeout = window.setTimeout(() => controller.abort(), timeoutMs);

  try {
    const response = await fetch(`${apiBase}${path}`, {
      cache: "no-store",
      signal: controller.signal
    });
    if (!response.ok) throw new Error(`LeetCode API failed: ${response.status}`);
    return (await response.json()) as unknown;
  } finally {
    window.clearTimeout(timeout);
  }
}

async function fetchLeetCodeStats(): Promise<LeetCodeStats> {
  const [profileResult, fullProfileResult, calendarResult, contestResult, recentResult] = await Promise.allSettled([
    fetchJson(`/${username}`),
    fetchJson(`/${username}/profile`),
    fetchJson(`/${username}/calendar`),
    fetchJson(`/${username}/contest`),
    fetchJson(`/${username}/submission`)
  ]);

  const fulfilled = [profileResult, fullProfileResult, calendarResult, contestResult, recentResult].filter(
    (result) => result.status === "fulfilled"
  ).length;

  if (fulfilled === 0) return fallbackStats;

  const fullProfile = fullProfileResult.status === "fulfilled" ? (fullProfileResult.value as Record<string, unknown>) : {};
  const calendar = calendarResult.status === "fulfilled" ? (calendarResult.value as Record<string, unknown>) : fullProfile;
  const contest = contestResult.status === "fulfilled" ? (contestResult.value as Record<string, unknown>) : {};
  const recentPayload = recentResult.status === "fulfilled" ? (recentResult.value as Record<string, unknown>) : fullProfile;
  const profileRecentKey = "recent" + "Submissions";
  const difficulty = readDifficulty(fullProfile);
  const heatmap = parseCalendar(calendar);
  const recentList = Array.isArray(recentPayload.submission)
    ? recentPayload.submission
    : Array.isArray(recentPayload[profileRecentKey])
      ? recentPayload[profileRecentKey]
      : [];

  return {
    totalSolved: readNumber(fullProfile.totalSolved) || difficulty.easy + difficulty.medium + difficulty.hard || fallbackStats.totalSolved,
    ranking: readNumber(fullProfile.ranking) || null,
    difficulty: {
      easy: difficulty.easy || fallbackStats.difficulty.easy,
      medium: difficulty.medium || fallbackStats.difficulty.medium,
      hard: difficulty.hard || fallbackStats.difficulty.hard
    },
    streak: readNumber(calendar.streak) || computeStreak(heatmap) || fallbackStats.streak,
    totalActiveDays: readNumber(calendar.totalActiveDays) || null,
    contestRating: contest.contestRating ? Math.round(readNumber(contest.contestRating)) : null,
    contestAttend: readNumber(contest.contestAttend) || null,
    heatmap: heatmap.some((day) => day.count > 0) ? heatmap : fallbackStats.heatmap,
    recent: recentList.length
      ? recentList.slice(0, 3).map((item) => {
          const row = item as Record<string, unknown>;
          const rawTimestamp = row.timestamp ?? row.submitTime;
          const parsedTimestamp =
            rawTimestamp && !Number.isNaN(Number(rawTimestamp))
              ? new Date(Number(rawTimestamp) * 1000).toLocaleDateString()
              : "Recent";

          return {
            title: String(row.title ?? row.titleSlug ?? "Recent problem"),
            status: String(row.statusDisplay ?? row.status ?? "Submitted"),
            lang: String(row.lang ?? row.language ?? "Code"),
            submittedAt: parsedTimestamp
          };
        })
      : fallbackStats.recent,
    source: fulfilled === 5 ? "live" : "partial"
  };
}

export function LeetCodeAnalytics() {
  const [stats, setStats] = useState<LeetCodeStats>(fallbackStats);
  const [loading, setLoading] = useState(true);
  const [failed, setFailed] = useState(false);
  const visibleHeatmap = useMemo(() => stats.heatmap.slice(-70), [stats.heatmap]);
  const maxCount = useMemo(() => Math.max(1, ...visibleHeatmap.map((day) => day.count)), [visibleHeatmap]);
  const total = stats.totalSolved || stats.difficulty.easy + stats.difficulty.medium + stats.difficulty.hard;
  const acceptedTotal = stats.difficulty.easy + stats.difficulty.medium + stats.difficulty.hard;
  const difficultyMix = [
    { label: "Easy", value: stats.difficulty.easy, color: "bg-emerald-400", text: "text-emerald-400" },
    { label: "Medium", value: stats.difficulty.medium, color: "bg-amber-400", text: "text-amber-400" },
    { label: "Hard", value: stats.difficulty.hard, color: "bg-rose-400", text: "text-rose-400" }
  ];

  useEffect(() => {
    let active = true;
    setLoading(true);
    setFailed(false);

    fetchLeetCodeStats()
      .then((data) => {
        if (!active) return;
        setStats(data);
        setFailed(data.source === "fallback");
      })
      .catch(() => {
        if (!active) return;
        setStats(fallbackStats);
        setFailed(true);
      })
      .finally(() => {
        if (active) setLoading(false);
      });

    return () => {
      active = false;
    };
  }, []);

  return (
    <div className="glass depth-card mx-auto max-w-6xl overflow-hidden rounded-lg">
      <div className="grid lg:grid-cols-[0.48fr_0.52fr]">
        <div className="border-b border-border p-4 sm:p-5 lg:border-b-0 lg:border-r">
          <div className="flex items-center justify-between gap-3">
            <Badge className="border-emerald-300/30 bg-emerald-300/10 text-emerald-700 dark:text-emerald-200">
              {loading
                ? "Syncing LeetCode"
                : failed
                  ? "Live API unavailable"
                  : stats.source === "partial"
                    ? "Partial live data"
                    : "Live LeetCode data"}
            </Badge>
            <Button asChild variant="secondary" size="sm">
              <a href={links.leetcode} target="_blank" rel="noreferrer">
                Profile
              </a>
            </Button>
          </div>

          {loading ? (
            <StatsSkeleton />
          ) : (
            <div className="mt-4 grid gap-3">
              <div className="relative overflow-hidden rounded-lg border border-border bg-background/45 p-4">
                <div className="absolute -right-10 -top-10 h-28 w-28 rounded-full bg-cyan-400/10 blur-2xl" />
                <div className="relative flex items-center gap-4">
                  <SolvedRing total={total} accepted={acceptedTotal} />
                  <div className="min-w-0">
                    <div className="text-xs uppercase tracking-[0.18em] text-muted-foreground">Solved</div>
                    <div className="mt-1 text-3xl font-semibold sm:text-4xl">{total}+</div>
                    <div className="mt-1 text-xs text-muted-foreground">
                      {stats.ranking ? `Rank #${stats.ranking.toLocaleString()}` : "Active DSA profile"}
                    </div>
                  </div>
                </div>
                <div className="mt-4 grid grid-cols-3 gap-2">
                  {difficultyMix.map((item) => (
                    <div key={item.label} className="rounded-md border border-border bg-card/45 p-2 text-center">
                      <div className={cn("text-sm font-semibold", item.text)}>{item.value}</div>
                      <div className="mt-0.5 text-[0.65rem] text-muted-foreground">{item.label}</div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <Metric icon={Flame} label="Streak" value={`${stats.streak}d`} />
                <Metric icon={Activity} label="Active days" value={stats.totalActiveDays ? String(stats.totalActiveDays) : "N/A"} />
                <Metric icon={Trophy} label="Rating" value={stats.contestRating ? String(stats.contestRating) : "N/A"} />
                <Metric icon={Radar} label="Contests" value={stats.contestAttend ? String(stats.contestAttend) : "N/A"} />
              </div>

              <DifficultyBars difficulty={stats.difficulty} total={total} />
            </div>
          )}
        </div>

        <div className="p-4 sm:p-5">
          <div className="flex items-center justify-between gap-3">
            <div>
              <h3 className="text-lg font-semibold sm:text-xl">Consistency map</h3>
              <p className="mt-1 text-xs text-muted-foreground sm:text-sm">
                {failed ? "Fallback view while the live API recovers." : "Last 70 days of submission activity."}
              </p>
            </div>
            <Activity className="h-5 w-5 text-cyan-500" />
          </div>

          <div className="mt-4 grid grid-cols-[repeat(14,minmax(0,1fr))] gap-1 sm:grid-cols-[repeat(14,minmax(0,1fr))]">
            {(loading ? fallbackStats.heatmap.slice(-70) : visibleHeatmap).map((day) => (
              <motion.div
                key={day.date}
                title={`${day.date}: ${day.count} submissions`}
                className={cn(
                  "aspect-square rounded-[3px] border border-border/35",
                  loading && "animate-pulse",
                  day.count === 0 ? "bg-muted/60" : "bg-emerald-400"
                )}
                style={{ opacity: day.count === 0 ? 0.28 : 0.34 + (day.count / maxCount) * 0.66 }}
                initial={{ scale: 0.8, opacity: 0 }}
                whileInView={{ scale: 1, opacity: day.count === 0 ? 0.28 : 0.34 + (day.count / maxCount) * 0.66 }}
                viewport={{ once: true }}
                transition={{ duration: 0.22 }}
              />
            ))}
          </div>

          <div className="mt-4 grid gap-2">
            {(loading ? fallbackStats.recent.slice(0, 2) : stats.recent.slice(0, 3)).map((submission, index) => (
              <div
                key={`${submission.title}-${submission.lang}-${submission.status}-${index}`}
                className={cn("rounded-lg border border-border bg-background/45 p-3", loading && "animate-pulse")}
              >
                <div className="flex items-start gap-2">
                  <GitCommitVertical className="mt-0.5 h-4 w-4 shrink-0 text-cyan-500" />
                  <div className="min-w-0">
                    <div className="line-clamp-1 text-sm font-medium">{submission.title}</div>
                    <div className="mt-2 flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
                      <span
                        className={cn(
                          "rounded-sm px-1.5 py-0.5",
                          submission.status === "Accepted" ? "bg-emerald-400/12 text-emerald-500" : "bg-amber-400/12 text-amber-500"
                        )}
                      >
                        {submission.status}
                      </span>
                      <span>{submission.lang}</span>
                      <span className="h-1 w-1 rounded-full bg-muted-foreground" />
                      <span>{submission.submittedAt}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function SolvedRing({ total, accepted }: { total: number; accepted: number }) {
  const percent = Math.min(100, Math.round((accepted / Math.max(total, 1)) * 100));

  return (
    <div
      className="grid h-16 w-16 shrink-0 place-items-center rounded-full sm:h-20 sm:w-20"
      style={{
        background: `conic-gradient(rgb(34 211 238) ${percent * 3.6}deg, hsl(var(--muted)) 0deg)`
      }}
    >
      <div className="grid h-14 w-14 place-items-center rounded-full bg-card text-xs font-semibold sm:h-[4.35rem] sm:w-[4.35rem] sm:text-sm">
        {percent}%
      </div>
    </div>
  );
}

function DifficultyBars({ difficulty, total }: { difficulty: Difficulty; total: number }) {
  return (
    <div className="space-y-2">
      {[
        ["Easy", difficulty.easy, "bg-emerald-400"],
        ["Medium", difficulty.medium, "bg-amber-400"],
        ["Hard", difficulty.hard, "bg-rose-400"]
      ].map(([label, count, color]) => (
        <div key={label as string}>
          <div className="mb-1 flex justify-between text-xs text-muted-foreground">
            <span>{label}</span>
            <span>{count}</span>
          </div>
          <div className="h-1.5 overflow-hidden rounded-full bg-muted">
            <motion.div
              className={cn("h-full rounded-full", color as string)}
              initial={{ width: 0 }}
              whileInView={{ width: `${(Number(count) / Math.max(1, total)) * 100}%` }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            />
          </div>
        </div>
      ))}
    </div>
  );
}

function StatsSkeleton() {
  return (
    <div className="mt-4 grid grid-cols-2 gap-2">
      {Array.from({ length: 4 }).map((_, index) => (
        <div key={index} className="rounded-lg border border-border bg-background/45 p-3">
          <div className="h-4 w-4 animate-pulse rounded bg-muted" />
          <div className="mt-3 h-6 w-14 animate-pulse rounded bg-muted" />
          <div className="mt-2 h-3 w-20 animate-pulse rounded bg-muted" />
        </div>
      ))}
    </div>
  );
}

function Metric({ icon: Icon, label, value }: { icon: LucideIcon; label: string; value: string }) {
  return (
    <motion.div
      className="rounded-lg border border-border bg-background/45 p-3"
      whileHover={{ y: -3 }}
      transition={{ type: "spring", stiffness: 260, damping: 20 }}
    >
      <Icon className="h-4 w-4 text-cyan-500" />
      <div className="mt-2 text-xl font-semibold">{value}</div>
      <div className="mt-1 text-xs text-muted-foreground">{label}</div>
    </motion.div>
  );
}
