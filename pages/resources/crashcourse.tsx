import { useEffect, useMemo, useState } from "react";
import { DM_Serif_Display, Sora } from "next/font/google";
import { Header } from "@/components/layout/Header";
import { ConfettiCannons } from "@/components/ui/Celebration";
import { useAuth } from "@/contexts/AuthContext";
import { useCelebration } from "@/hooks/useCelebration";
import { createClient } from "@/lib/supabase/client";
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

const days = [
  {
    day: "Day 1",
    title: "File Renaming Bot",
    skill: "Prompt AI to mass-rename files (e.g., photos, reports).",
    template: `Role: Python automation expert.
Task: Write script to rename all [file type] in folder "[path]".
Rules: [e.g., add date prefix, number them 001-100].
Format: Full code + 1-line run instructions + error handling.`,
    drill: `Rename 20 photos: "Add 'KL_2026-' prefix to all JPGs in Downloads." Run it.`,
  },
  {
    day: "Day 2",
    title: "Excel Auto-Formatter",
    skill: "Clean/update spreadsheets (remove dupes, format columns).",
    template: `Role: Excel automation pro using Python/openpyxl.
Task: Read "[file.xlsx]", [do this: sum column B, delete empty rows, sort by date].
Save as "cleaned_[file].xlsx". Include code + how to install libs.`,
    drill: `Fix messy expense sheet: "Sum 'Amount' column, highlight over RM100, save new file."`,
  },
  {
    day: "Day 3",
    title: "Email/SMS Sender",
    skill: "Bulk-send reminders or reports from CSV list.",
    template: `Role: Python email automation dev.
Task: Read contacts from "[contacts.csv]", send "[message]" to each.
Details: Use Gmail SMTP, subject "[title]", attach "[file]". Full code ready to run.`,
    drill: `Send "Weekly report ready" to 5 colleagues with a dummy PDF attachment.`,
  },
  {
    day: "Day 4",
    title: "PDF/Text Extractor",
    skill: "Pull data from PDFs/docs (invoices, resumes) into CSV.",
    template: `Role: Document automation specialist.
Task: Extract [data: names, dates, amounts] from all PDFs in folder.
Output: CSV with columns [list them]. Use PyPDF2/tabula. Code + pip installs.`,
    drill: `Extract invoice totals from 10 PDFs: "Get date, vendor, amount columns."`,
  },
  {
    day: "Day 5",
    title: "Web Scraper + Scheduler",
    skill: "Auto-fetch data (prices, news) + run daily.",
    template: `Role: Web scraping automation engineer.
Task: Scrape [site/data: e.g., Shopee prices], save to CSV.
Run daily via cron/Windows Task Scheduler. Use BeautifulSoup/selenium. Full setup.`,
    drill: (
      <>
        Track "Laptop prices on Lelong.my" &rarr; daily CSV. Schedule it.
      </>
    ),
  },
];

export default function CrashCoursePage() {
  const { user } = useAuth();
  const supabase = useMemo(() => createClient(), []);
  const [done, setDone] = useState<boolean[]>(() => days.map(() => false));
  const [showToast, setShowToast] = useState(false);
  const [wasComplete, setWasComplete] = useState(false);
  const [progressData, setProgressData] = useState<CourseProgressData>({});
  const [loading, setLoading] = useState(true);
  const [syncError, setSyncError] = useState<string | null>(null);
  const [lastSyncedAt, setLastSyncedAt] = useState<string | null>(null);
  const { confettiVisible, confettiKey, trigger } = useCelebration();

  const completed = useMemo(() => done.filter(Boolean).length, [done]);
  const percent = Math.round((completed / days.length) * 100);
  const isComplete = completed === days.length;

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
          setDone(buildCourseChecklistProgress(parsedProgress, "crashcourse", days.length));
          setLastSyncedAt(data?.updated_at ?? null);
          setSyncError(null);
        }
      } catch (error) {
        console.error("Error loading course progress:", error);
        if (isMounted) {
          const fallbackProgress = user?.id ? getLocalProgress(user.id) || {} : {};
          setProgressData(fallbackProgress);
          setDone(buildCourseChecklistProgress(fallbackProgress, "crashcourse", days.length));
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
      if (!current[index]) {
        trigger(`Day ${index + 1} complete`);
      }
      const nextProgress = {
        ...progressData,
        crashcourse: nextDone,
      };
      setProgressData(nextProgress);
      if (user?.id) {
        void saveProgress(nextProgress);
      }
      return nextDone;
    });
  };

  return (
    <div className={`${display.variable} ${body.variable} font-[var(--font-body)]`}>
      <Header />
      {confettiVisible && <ConfettiCannons burstKey={confettiKey} />}
      <div className="min-h-screen bg-[#f6f3ef]">
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
                    <p className="font-semibold text-neutral-900">Nice work</p>
                    <p className="text-neutral-600">{completed} of {days.length} days complete.</p>
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
                5-Day Crash Course
              </p>
              <h1 className="mb-4 font-[var(--font-display)] text-4xl text-neutral-900 sm:text-5xl">
                Automate boring stuff with Python + AI prompts
              </h1>
              <p className="max-w-2xl text-lg text-neutral-700">
                A 5-day crash course to <strong>automate boring stuff with Python + AI prompts</strong>. Each day: 1
                skill, 1 template, 1 real automation drill (15 mins). No prior coding needed&mdash;AI generates the
                code.{" "}
                <a
                  href="https://www.goodreads.com/book/show/22514127-automate-the-boring-stuff-with-python"
                  className="font-semibold text-neutral-900 underline underline-offset-4"
                >
                  goodreads
                </a>
              </p>
            </div>

            <div
              className="sticky top-4 z-40 mt-10 rounded-2xl border border-neutral-200/80 bg-white/80 p-6 shadow-[0_20px_60px_-40px_rgba(15,23,42,0.7)] backdrop-blur fade-in"
              style={{ animationDelay: "0.1s" }}
            >
              <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <p className="text-sm font-semibold text-neutral-900">Progress</p>
                  <p className="text-sm text-neutral-600">{completed} of {days.length} days completed</p>
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
              {days.map((day, index) => (
                <section
                  key={day.day}
                  className="fade-in rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm"
                  style={{ animationDelay: `${0.15 + index * 0.05}s` }}
                >
                  <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-neutral-500">
                        {day.day}
                      </p>
                      <h2 className="mt-2 font-[var(--font-display)] text-2xl text-neutral-900">
                        {day.title}
                      </h2>
                      <p className="mt-2 text-neutral-700">
                        <span className="font-semibold text-neutral-900">Core skill:</span> {day.skill}
                      </p>
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
                    <p className="text-sm font-semibold text-neutral-900">Template</p>
                    <pre className="mt-2 whitespace-pre-wrap text-sm text-neutral-700">
                      <code className="font-mono text-xs text-neutral-600">{day.template}</code>
                    </pre>
                  </div>

                  <p className="mt-4 text-sm text-neutral-600">
                    15-minute drill: {day.drill}
                  </p>
                </section>
              ))}
            </div>

            <div className="mt-12 grid gap-6">
              <section className="fade-in rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm">
                <h3 className="font-[var(--font-display)] text-2xl text-neutral-900">Pro tips:</h3>
                <ul className="mt-3 list-disc pl-5 text-neutral-700">
                  <li>Always add "Handle errors, no crashes" to prompts.</li>
                  <li>Test on dummy files first.</li>
                  <li>Save your 5 scripts in a "BoringBot" folder.</li>
                </ul>
              </section>
              <section className="fade-in rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm">
                <h3 className="font-[var(--font-display)] text-2xl text-neutral-900">Graduation</h3>
                <p className="mt-2 text-neutral-700">
                  Automate your #1 boring task (e.g., "Monthly report from 5 Excels"). Share it&mdash;I&apos;ll
                  debug/improve.{" "}
                  <a
                    href="https://automatetheboringstuff.com"
                    className="font-semibold text-neutral-900 underline underline-offset-4"
                  >
                    automatetheboringstuff
                  </a>
                </p>
              </section>
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
  );
}
