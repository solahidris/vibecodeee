import { useEffect, useMemo, useState } from "react";
import Head from "next/head";
import { DM_Serif_Display, Sora } from "next/font/google";
import { useAuth } from "@/contexts/AuthContext";
import { createClient } from "@/lib/supabase/client";
import { Header } from "@/components/layout/Header";
import {
  CourseProgressData,
  buildCourseChecklistProgress,
  getLocalProgress,
  parseCourseProgress,
  setLocalProgress,
} from "@/lib/courses/progress";
import { formatDate } from "@/lib/utils/formatters";

const display = DM_Serif_Display({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-display",
});

const body = Sora({
  subsets: ["latin"],
  weight: ["300", "400", "600"],
  variable: "--font-body",
});

const lessons = [
  {
    title: "1. Name the outcome and the audience",
    summary:
      "Open with a clear goal and who the result is for. This anchors tone, depth, and usefulness.",
    template:
      "You are a helpful writing assistant. Create a one-page guide for new managers. Tone: calm and practical. Success: concise, skimmable, and actionable.",
    tip:
      "If the audience is unclear, the model will guess. Remove guessing by stating it explicitly.",
  },
  {
    title: "2. Add context and constraints",
    summary:
      "Provide the minimum background the model needs and list must-follow constraints.",
    template:
      "Context: team of 6, remote, weekly standups. Constraints: no jargon, avoid sales language, 500 words max.",
    tip:
      "Constraints are most effective when they are concrete: length, tone, format, and do-not-include lists.",
  },
  {
    title: "3. Specify structure and format",
    summary:
      "Tell it how to organize the output so you can scan or reuse it immediately.",
    template:
      "Format: title, 5 bullets, and a closing sentence. Use short sentences. No tables.",
    tip:
      "Structure is a shortcut to quality. Ask for headings, bullets, or steps when you need clarity.",
  },
  {
    title: "4. Provide a reference or example",
    summary:
      "Show a small example or reference style to reduce ambiguity and speed up alignment.",
    template:
      "Write in the style of a friendly internal memo. Example tone: direct, supportive, and concise.",
    tip:
      "Examples do not need to be long. Two or three sentences can set the entire style.",
  },
  {
    title: "5. Ask for a quick self-check",
    summary:
      "End by requesting a brief self-review so the model verifies alignment before final output.",
    template:
      "Before finalizing, check: Does this match the audience and constraints? If not, fix it.",
    tip:
      "Self-checks reduce errors and keep the output aligned with your requirements.",
  },
];

export default function BasicPromptPage() {
  const { user } = useAuth();
  const supabase = useMemo(() => createClient(), []);
  const [done, setDone] = useState<boolean[]>(() => lessons.map(() => false));
  const [showToast, setShowToast] = useState(false);
  const [wasComplete, setWasComplete] = useState(false);
  const [progressData, setProgressData] = useState<CourseProgressData>({});
  const [loading, setLoading] = useState(true);
  const [syncError, setSyncError] = useState<string | null>(null);
  const [lastSyncedAt, setLastSyncedAt] = useState<string | null>(null);

  const completed = useMemo(() => done.filter(Boolean).length, [done]);
  const percent = Math.round((completed / lessons.length) * 100);
  const isComplete = completed === lessons.length;

  useEffect(() => {
    if (isComplete && !wasComplete) {
      setShowToast(true);
      setWasComplete(true);
    }
    if (!isComplete && wasComplete) {
      setWasComplete(false);
      setShowToast(false);
    }
  }, [isComplete, wasComplete]);

  useEffect(() => {
    let isMounted = true;

    const loadProgress = async () => {
      if (!user?.id) {
        if (isMounted) setLoading(false);
        return;
      }

      setLoading(true);
      try {
        const localProgress = getLocalProgress(user.id);
        const { data, error } = await supabase
          .from("profiles")
          .select("course_progress, updated_at")
          .eq("id", user.id)
          .maybeSingle();

        if (error) {
          throw error;
        }

        const parsedProgress =
          data?.course_progress !== null && data?.course_progress !== undefined
            ? parseCourseProgress(data?.course_progress)
            : localProgress || {};

        if (data?.course_progress !== null && data?.course_progress !== undefined) {
          setLocalProgress(user.id, parsedProgress);
        }

        if (isMounted) {
          setProgressData(parsedProgress);
          setDone(buildCourseChecklistProgress(parsedProgress, "basicprompt", lessons.length));
          setLastSyncedAt(data?.updated_at ?? null);
          setSyncError(null);
        }
      } catch (error) {
        console.error("Error loading course progress:", error);
        if (isMounted) {
          const fallbackProgress = user?.id ? getLocalProgress(user.id) || {} : {};
          setProgressData(fallbackProgress);
          setDone(buildCourseChecklistProgress(fallbackProgress, "basicprompt", lessons.length));
          setSyncError(
            "We could not sync your progress yet. Updates are stored locally for now."
          );
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    loadProgress();

    return () => {
      isMounted = false;
    };
  }, [supabase, user?.id]);

  const saveProgress = async (nextProgress: CourseProgressData) => {
    if (!user?.id) return;

    try {
      setLocalProgress(user.id, nextProgress);
      const { error } = await supabase.from("profiles").upsert(
        {
          id: user.id,
          course_progress: nextProgress,
        },
        { onConflict: "id" }
      );

      if (error) {
        throw error;
      }

      const now = new Date().toISOString();
      setLastSyncedAt(now);
      setSyncError(null);
    } catch (error) {
      console.error("Error saving course progress:", error);
      setLocalProgress(user.id, nextProgress);
      setSyncError(
        "We could not sync your progress yet. Updates are stored locally for now."
      );
    }
  };

  const handleToggle = (index: number) => {
    setDone((current) => {
      const nextDone = current.map((value, i) => (i === index ? !value : value));
      const nextProgress = {
        ...progressData,
        basicprompt: nextDone,
      };
      setProgressData(nextProgress);
      if (user?.id) {
        void saveProgress(nextProgress);
      }
      return nextDone;
    });
  };

  return (
    <>
      <Head>
        <title>Basic Prompting Course - VibeCodeee | Master AI Prompting in 5 Lessons</title>
        <meta name="description" content="Learn effective AI prompting techniques with our free interactive course. 5 practical lessons covering outcomes, context, structure, examples, and self-checks." />
        <meta property="og:title" content="Basic Prompting Course - VibeCodeee | Master AI Prompting" />
        <meta property="og:description" content="Free interactive course teaching clear, reliable prompt engineering in 5 short lessons. Perfect for beginners." />
        <meta name="twitter:title" content="Basic Prompting Course - Master AI Prompting" />
      </Head>
      <div className={`${display.variable} ${body.variable} font-[var(--font-body)]`}>
        <div className="min-h-screen bg-[#f6f3ef]">
          <Header />
          <div className="relative">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,#c9e4ff,transparent_55%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_80%,#ffe6bf,transparent_60%)]" />
          <div className="relative mx-auto max-w-5xl px-6 py-16 sm:px-10">
            {showToast && (
              <div
                className="fade-in fixed right-6 top-6 z-50 max-w-sm rounded-2xl border border-neutral-200 bg-white px-5 py-4 text-sm text-neutral-800 shadow-lg"
                role="status"
                aria-live="polite"
              >
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="font-semibold text-neutral-900">Course complete</p>
                    <p className="text-neutral-600">{completed} of {lessons.length} lessons done.</p>
                  </div>
                  <button
                    type="button"
                    className="text-xs font-semibold uppercase tracking-wide text-neutral-500 transition hover:text-neutral-800"
                    onClick={() => setShowToast(false)}
                  >
                    Close
                  </button>
                </div>
              </div>
            )}
            <div className="fade-in">
              <p className="mb-3 text-sm uppercase tracking-[0.3em] text-neutral-600">
                Basic Prompting Course
              </p>
              <h1 className="mb-4 font-[var(--font-display)] text-4xl text-neutral-900 sm:text-5xl">
                Five short lessons for clear, reliable prompts
              </h1>
              <p className="max-w-2xl text-lg text-neutral-700">
                This is a quick, text-only course you can finish in one sitting. Mark each lesson as done to track
                progress.
              </p>
            </div>

            <div
              className="sticky top-4 z-40 mt-10 rounded-2xl border border-neutral-200/80 bg-white/80 p-6 shadow-[0_20px_60px_-40px_rgba(15,23,42,0.7)] backdrop-blur fade-in"
              style={{ animationDelay: "0.1s" }}
            >
              <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <p className="text-sm font-semibold text-neutral-900">Progress</p>
                  <p className="text-sm text-neutral-600">{completed} of {lessons.length} lessons completed</p>
                </div>
                <div className="text-2xl font-semibold text-neutral-900">{percent}%</div>
              </div>
              <div className="mt-4 h-3 w-full rounded-full bg-neutral-200" aria-label="Course progress">
                <div
                  className="h-full rounded-full bg-neutral-900 transition-all duration-500"
                  style={{ width: `${percent}%` }}
                />
              </div>
              {user?.id && (
                <p className="mt-3 text-xs text-neutral-500">
                  {syncError
                    ? syncError
                    : lastSyncedAt
                      ? `Synced ${formatDate(lastSyncedAt)}`
                      : loading
                        ? "Checking your sync status..."
                        : "Progress will sync to your profile after your first update."}
                </p>
              )}
            </div>

            <div className="mt-12 grid gap-6">
              {lessons.map((lesson, index) => (
                <section
                  key={lesson.title}
                  className="fade-in rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm"
                  style={{ animationDelay: `${0.15 + index * 0.05}s` }}
                >
                  <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                    <div>
                      <h2 className="font-[var(--font-display)] text-2xl text-neutral-900">
                        {lesson.title}
                      </h2>
                      <p className="mt-2 text-neutral-700">{lesson.summary}</p>
                    </div>
                    <label className="flex items-center gap-2 text-sm font-semibold text-neutral-800">
                      <input
                        type="checkbox"
                        className="h-5 w-5 accent-neutral-900"
                        checked={done[index]}
                        onChange={() => handleToggle(index)}
                      />
                      Mark done
                    </label>
                  </div>

                  <div className="mt-5 rounded-xl border border-neutral-200 bg-neutral-50 p-4">
                    <p className="text-sm font-semibold text-neutral-900">Try this prompt</p>
                    <p className="mt-2 text-sm text-neutral-700">
                      <span className="font-mono text-xs text-neutral-600">{lesson.template}</span>
                    </p>
                  </div>

                  <p className="mt-4 text-sm text-neutral-600">{lesson.tip}</p>
                </section>
              ))}
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .fade-in {
          opacity: 0;
          transform: translateY(12px);
          animation: fadeUp 0.6s ease-out forwards;
        }

        @keyframes fadeUp {
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
    </>
  );
}
