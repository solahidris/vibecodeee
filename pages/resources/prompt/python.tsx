import { useEffect, useMemo, useState } from "react";
import { Geist } from "next/font/google";
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

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
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
    <div className={`${geistSans.variable} relative min-h-screen overflow-hidden bg-[#f7f7f8] font-sans`}>
      <Header />
      {confettiVisible && <ConfettiCannons burstKey={confettiKey} />}

      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -top-40 right-0 h-72 w-72 rounded-full bg-zinc-200/70 blur-3xl" />
        <div className="absolute bottom-0 left-0 h-72 w-72 rounded-full bg-amber-100/70 blur-3xl" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#e5e7eb_1px,transparent_1px),linear-gradient(to_bottom,#e5e7eb_1px,transparent_1px)] bg-[size:6rem_6rem] opacity-40" />
      </div>

      <main className="mx-auto max-w-5xl px-4 pb-20 pt-16 sm:px-6 lg:px-8">
            {showToast && (
              <div
                className="animate-fade-in-up fixed right-6 top-6 z-50 max-w-sm rounded-2xl border border-zinc-200 bg-white px-5 py-4 text-sm text-zinc-800 shadow-lg"
                role="status"
                aria-live="polite"
              >
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="font-semibold text-zinc-900">Nice work</p>
                    <p className="text-zinc-600">{completed} of {days.length} days complete.</p>
                  </div>
                  <button
                    type="button"
                    className="text-xs font-semibold uppercase tracking-wide text-zinc-500 transition hover:text-zinc-800"
                    onClick={() => setShowToast(false)}
                  >
                    Close
                  </button>
                </div>
              </div>
            )}

            <div className="animate-fade-in-up">
              <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-zinc-200 bg-white px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-zinc-600">
                5-Day Crash Course
              </div>
              <h1 className="mb-4 text-4xl font-black tracking-tight text-zinc-900 sm:text-5xl">
                Automate boring stuff with Python + AI prompts
              </h1>
              <p className="max-w-2xl text-lg text-zinc-600">
                A 5-day crash course to <strong>automate boring stuff with Python + AI prompts</strong>. Each day: 1
                skill, 1 template, 1 real automation drill (15 mins). No prior coding needed&mdash;AI generates the
                code.{" "}
                <a
                  href="https://www.goodreads.com/book/show/22514127-automate-the-boring-stuff-with-python"
                  className="font-semibold text-zinc-900 underline underline-offset-4"
                >
                  goodreads
                </a>
              </p>
            </div>

            <div
              className="sticky top-4 z-40 mt-10 rounded-3xl border border-zinc-200 bg-white/80 p-6 shadow-[0_30px_80px_-60px_rgba(15,23,42,0.6)] backdrop-blur animate-fade-in-up"
              style={{ animationDelay: "0.1s" }}
            >
              <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <p className="text-sm font-semibold text-zinc-900">Progress</p>
                  <p className="text-sm text-zinc-600">{completed} of {days.length} days completed</p>
                </div>
                <div className="text-2xl font-semibold text-zinc-900">{percent}%</div>
              </div>
              <div className="mt-4 h-3 w-full rounded-full bg-zinc-200" aria-label="Course progress">
                <div
                  className="h-full rounded-full bg-zinc-900 transition-all duration-500"
                  style={{ width: `${percent}%` }}
                />
              </div>
              {user?.id && (
                <p className="mt-3 text-xs text-zinc-500">
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
                  className="animate-fade-in-up rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm transition-shadow hover:shadow-lg"
                  style={{ animationDelay: `${0.15 + index * 0.05}s` }}
                >
                  <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-zinc-500">
                        {day.day}
                      </p>
                      <h2 className="mt-2 text-2xl font-bold text-zinc-900">
                        {day.title}
                      </h2>
                      <p className="mt-2 text-zinc-600">
                        <span className="font-semibold text-zinc-900">Core skill:</span> {day.skill}
                      </p>
                    </div>
                    <label className="flex items-center gap-2 text-sm font-semibold text-zinc-800">
                      <input
                        type="checkbox"
                        className="h-5 w-5 accent-zinc-900"
                        checked={done[index]}
                        onChange={() => handleToggle(index)}
                      />
                      Mark done
                    </label>
                  </div>

                  <div className="mt-5 rounded-xl border border-zinc-200 bg-zinc-50 p-4">
                    <p className="text-sm font-semibold text-zinc-900">Template</p>
                    <pre className="mt-2 whitespace-pre-wrap text-sm text-zinc-700">
                      <code className="font-mono text-xs text-zinc-600">{day.template}</code>
                    </pre>
                  </div>

                  <p className="mt-4 text-sm text-zinc-600">
                    15-minute drill: {day.drill}
                  </p>
                </section>
              ))}
            </div>

            <div className="mt-12 grid gap-6">
              <section className="animate-fade-in-up rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm transition-shadow hover:shadow-lg">
                <h3 className="text-2xl font-bold text-zinc-900">Pro tips:</h3>
                <ul className="mt-3 list-disc pl-5 text-zinc-600">
                  <li>Always add "Handle errors, no crashes" to prompts.</li>
                  <li>Test on dummy files first.</li>
                  <li>Save your 5 scripts in a "BoringBot" folder.</li>
                </ul>
              </section>
              <section className="animate-fade-in-up rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm transition-shadow hover:shadow-lg">
                <h3 className="text-2xl font-bold text-zinc-900">Graduation</h3>
                <p className="mt-2 text-zinc-600">
                  Automate your #1 boring task (e.g., "Monthly report from 5 Excels"). Share it&mdash;I&apos;ll
                  debug/improve.{" "}
                  <a
                    href="https://automatetheboringstuff.com"
                    className="font-semibold text-zinc-900 underline underline-offset-4"
                  >
                    automatetheboringstuff
                  </a>
                </p>
              </section>
            </div>
          </main>
        </div>
    </div>
  );
}
