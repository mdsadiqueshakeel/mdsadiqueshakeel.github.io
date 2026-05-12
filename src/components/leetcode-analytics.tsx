"use client";

import { motion } from "framer-motion";
import { Activity, BarChart3, Flame, Gauge, Trophy } from "lucide-react";
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
  submittedAt: any;
  title: string;
  status: string;
  lang: string;
};

type LeetCodeStats = {
  totalSolved: number;
  difficulty: Difficulty;
  streak: number;
  totalActiveDays: number | null;
  contestRating: number | null;
  heatmap: HeatDay[];
  recent: RecentSubmission[];
  source: "live" | "partial" | "fallback";
};

const username = "sadiqueshakeel";
const apiBase = "https://alfa-leetcode-api.onrender.com";

const fallbackStats: LeetCodeStats = {
  totalSolved: 300,
  difficulty: { easy: 92, medium: 171, hard: 37 },
  streak: 12,
  totalActiveDays: null,
  contestRating: null,
  heatmap: buildFallbackHeatmap(),
  recent: [
    { title: "Dynamic Programming Practice", status: "Accepted", lang: "Java" },
    { title: "Graph Traversal Review", status: "Accepted", lang: "Python" },
    { title: "Binary Search Pattern", status: "Accepted", lang: "Java" },
  ],
  source: "fallback",
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
    hard: readNumber(root.hardSolved),
  };

  if (direct.easy || direct.medium || direct.hard) return direct;

  const stats =
    (root.matchedUserStats as Record<string, unknown> | undefined) ?? root;
  const lists = [
    root.totalSubmissions,
    stats.acSubmissionNum,
    stats.totalSubmissionNum,
  ];
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

  const days = lastNDays(112);
  return days.map((date) => {
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
    count: [0, 1, 2, 3, 4][(index * 7 + 3) % 5],
  }));
}

async function fetchJson(path: string, timeoutMs = 9000) {
  const controller = new AbortController();
  const timeout = window.setTimeout(() => controller.abort(), timeoutMs);

  try {
    const response = await fetch(`${apiBase}${path}`, {
      cache: "no-store",
      signal: controller.signal,
    });
    if (!response.ok)
      throw new Error(`LeetCode API failed: ${response.status}`);
    return (await response.json()) as unknown;
  } finally {
    window.clearTimeout(timeout);
  }
}

async function fetchLeetCodeStats(): Promise<LeetCodeStats> {
  const [
    profileResult,
    fullProfileResult,
    calendarResult,
    contestResult,
    recentResult,
  ] = await Promise.allSettled([
    fetchJson(`/${username}`),
    fetchJson(`/${username}/profile`),
    fetchJson(`/${username}/calendar`),
    fetchJson(`/${username}/contest`),
    fetchJson(`/${username}/submission`),
  ]);

  const fulfilled = [
    profileResult,
    fullProfileResult,
    calendarResult,
    contestResult,
    recentResult,
  ].filter((result) => result.status === "fulfilled").length;

  if (fulfilled === 0) return fallbackStats;

  const fullProfile =
    fullProfileResult.status === "fulfilled"
      ? (fullProfileResult.value as Record<string, unknown>)
      : {};
  const calendar =
    calendarResult.status === "fulfilled"
      ? (calendarResult.value as Record<string, unknown>)
      : fullProfile;
  const contest =
    contestResult.status === "fulfilled"
      ? (contestResult.value as Record<string, unknown>)
      : {};
  const recentPayload =
    recentResult.status === "fulfilled"
      ? (recentResult.value as Record<string, unknown>)
      : fullProfile;
  const profileRecentKey = "recent" + "Submissions";
  const difficulty = readDifficulty(fullProfile);
  const heatmap = parseCalendar(calendar);
  const recentList = Array.isArray(recentPayload.submission)
    ? recentPayload.submission
    : Array.isArray(recentPayload[profileRecentKey])
      ? recentPayload[profileRecentKey]
      : [];

  return {
    totalSolved:
      readNumber(fullProfile.totalSolved) ||
      difficulty.easy + difficulty.medium + difficulty.hard ||
      fallbackStats.totalSolved,
    difficulty: {
      easy: difficulty.easy || fallbackStats.difficulty.easy,
      medium: difficulty.medium || fallbackStats.difficulty.medium,
      hard: difficulty.hard || fallbackStats.difficulty.hard,
    },
    streak:
      readNumber(calendar.streak) ||
      computeStreak(heatmap) ||
      fallbackStats.streak,
    totalActiveDays: readNumber(calendar.totalActiveDays) || null,
    contestRating: contest.contestRating
      ? Math.round(readNumber(contest.contestRating))
      : null,
    heatmap: heatmap.some((day) => day.count > 0)
      ? heatmap
      : fallbackStats.heatmap,
    recent: recentList.length
      ? recentList.slice(0, 4).map((item) => {
          const row = item as Record<string, unknown>;
          const rawTimestamp = row.timestamp ?? row.submitTime;

          const parsedTimestamp =
            rawTimestamp && !Number.isNaN(Number(rawTimestamp))
              ? new Date(Number(rawTimestamp) * 1000).toLocaleString()
              : "Unknown time";
          return {
            title: String(row.title ?? row.titleSlug ?? "Recent problem"),
            status: String(row.statusDisplay ?? row.status ?? "Submitted"),
            lang: String(row.lang ?? row.language ?? "Code"),
            timestamp: String(rawTimestamp ?? ""),
            submittedAt: parsedTimestamp,
          };
        })
      : fallbackStats.recent,
    source: fulfilled === 5 ? "live" : "partial",
  };
}

export function LeetCodeAnalytics() {
  const [stats, setStats] = useState<LeetCodeStats>(fallbackStats);
  const [loading, setLoading] = useState(true);
  const [failed, setFailed] = useState(false);
  const maxCount = useMemo(
    () => Math.max(1, ...stats.heatmap.map((day) => day.count)),
    [stats.heatmap],
  );
  const total =
    stats.totalSolved ||
    stats.difficulty.easy + stats.difficulty.medium + stats.difficulty.hard;

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
    <div className="grid gap-5 lg:grid-cols-[0.82fr_1.18fr]">
      <div className="glass depth-card rounded-lg p-6">
        <div className="flex items-center justify-between gap-4">
          <Badge className="border-emerald-300/30 bg-emerald-300/10 text-emerald-700 dark:text-emerald-200">
            {loading
              ? "Syncing latest LeetCode"
              : failed
                ? "Live API unavailable"
                : stats.source === "partial"
                  ? "Partial live LeetCode data"
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
          <>
            <div className="mt-7 grid grid-cols-2 gap-3">
              <Metric
                icon={BarChart3}
                label="Total solved"
                value={`${total}+`}
              />
              <Metric
                icon={Flame}
                label="Current streak"
                value={`${stats.streak}d`}
              />
              <Metric
                icon={Gauge}
                label="Medium"
                value={String(stats.difficulty.medium)}
              />
              <Metric
                icon={Trophy}
                label="Contest rating"
                value={
                  stats.contestRating ? String(stats.contestRating) : "N/A"
                }
              />
            </div>
            {stats.totalActiveDays ? (
              <div className="mt-4 rounded-lg border border-border bg-background/45 p-4 text-sm text-muted-foreground">
                Active on{" "}
                <span className="font-semibold text-foreground">
                  {stats.totalActiveDays}
                </span>{" "}
                LeetCode days.
              </div>
            ) : null}
            <DifficultyBars difficulty={stats.difficulty} total={total} />
          </>
        )}
      </div>

      <div className="glass depth-card rounded-lg p-6">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h3 className="text-xl font-semibold">Consistency heatmap</h3>
            <p className="mt-1 text-sm text-muted-foreground">
              {failed
                ? "Showing a stable fallback while the live API recovers."
                : "Recent submission activity rendered as an engineering signal."}
            </p>
          </div>
          <Activity className="h-5 w-5 text-cyan-500" />
        </div>
        <div className="mt-6 grid grid-cols-[repeat(16,minmax(0,1fr))] gap-1">
          {(loading ? fallbackStats.heatmap : stats.heatmap).map((day) => (
            <motion.div
              key={day.date}
              title={`${day.date}: ${day.count} submissions`}
              className={cn(
                "aspect-square rounded-[3px] border border-border/45",
                loading && "animate-pulse",
                day.count === 0 ? "bg-muted/70" : "bg-emerald-400",
              )}
              style={{
                opacity:
                  day.count === 0 ? 0.42 : 0.32 + (day.count / maxCount) * 0.68,
              }}
              initial={{ scale: 0.65, opacity: 0 }}
              whileInView={{
                scale: 1,
                opacity:
                  day.count === 0 ? 0.42 : 0.32 + (day.count / maxCount) * 0.68,
              }}
              viewport={{ once: true }}
              transition={{ duration: 0.3 }}
            />
          ))}
        </div>
        <div className="mt-6 grid gap-3 sm:grid-cols-2">
          {(loading ? fallbackStats.recent : stats.recent).map(
            (submission, index) => (
              <div
                key={`${submission.title}-${submission.lang}-${submission.status}-${index}`}
                className={cn(
                  "rounded-lg border border-border bg-background/45 p-4",
                  loading && "animate-pulse",
                )}
              >
                <div className="text-sm font-medium">{submission.title}</div>
                <div className="mt-2 flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
                  <span>{submission.status}</span>

                  <span className="h-1 w-1 rounded-full bg-muted-foreground" />

                  <span>{submission.lang}</span>

                  {submission.submittedAt ? (
                    <>
                      <span className="h-1 w-1 rounded-full bg-muted-foreground" />
                      <span>{submission.submittedAt}</span>
                    </>
                  ) : null}
                </div>
              </div>
            ),
          )}
        </div>
      </div>
    </div>
  );
}

function DifficultyBars({
  difficulty,
  total,
}: {
  difficulty: Difficulty;
  total: number;
}) {
  return (
    <div className="mt-6 space-y-3">
      {[
        ["Easy", difficulty.easy, "bg-emerald-400"],
        ["Medium", difficulty.medium, "bg-amber-400"],
        ["Hard", difficulty.hard, "bg-rose-400"],
      ].map(([label, count, color]) => (
        <div key={label as string}>
          <div className="mb-1 flex justify-between text-xs text-muted-foreground">
            <span>{label}</span>
            <span>{count}</span>
          </div>
          <div className="h-2 overflow-hidden rounded-full bg-muted">
            <motion.div
              className={cn("h-full rounded-full", color as string)}
              initial={{ width: 0 }}
              whileInView={{
                width: `${(Number(count) / Math.max(1, total)) * 100}%`,
              }}
              viewport={{ once: true }}
              transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
            />
          </div>
        </div>
      ))}
    </div>
  );
}

function StatsSkeleton() {
  return (
    <div className="mt-7 grid grid-cols-2 gap-3">
      {Array.from({ length: 4 }).map((_, index) => (
        <div
          key={index}
          className="rounded-lg border border-border bg-background/45 p-4"
        >
          <div className="h-4 w-4 animate-pulse rounded bg-muted" />
          <div className="mt-3 h-7 w-16 animate-pulse rounded bg-muted" />
          <div className="mt-2 h-3 w-24 animate-pulse rounded bg-muted" />
        </div>
      ))}
    </div>
  );
}

function Metric({
  icon: Icon,
  label,
  value,
}: {
  icon: LucideIcon;
  label: string;
  value: string;
}) {
  return (
    <motion.div
      className="rounded-lg border border-border bg-background/45 p-4"
      whileHover={{ y: -4 }}
      transition={{ type: "spring", stiffness: 260, damping: 20 }}
    >
      <Icon className="h-4 w-4 text-cyan-500" />
      <div className="mt-3 text-2xl font-semibold">{value}</div>
      <div className="mt-1 text-xs text-muted-foreground">{label}</div>
    </motion.div>
  );
}
