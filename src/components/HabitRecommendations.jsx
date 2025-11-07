import { BookOpen, Dumbbell, Brain, Briefcase, Sun } from "lucide-react";

const habits = [
  {
    icon: BookOpen,
    title: "Focused Learning (15–20m)",
    description:
      "Read or watch a lesson on a core skill. Summarize 3 bullet takeaways to ensure retention.",
    metric: "Minutes or pages completed",
  },
  {
    icon: Dumbbell,
    title: "Movement Snack (10–15m)",
    description:
      "Bodyweight circuit or brisk walk. Aim for light sweat and elevated heart rate.",
    metric: "Session done (Y/N) + steps or sets",
  },
  {
    icon: Brain,
    title: "Mindfulness Reset (5–10m)",
    description: "Breathing or meditation. Note perceived stress level pre/post.",
    metric: "Minutes + mood delta",
  },
  {
    icon: Briefcase,
    title: "Deep Work Sprint (25m)",
    description:
      "One pomodoro on your highest-leverage project. No notifications.",
    metric: "Pomodoro completed (Y/N)",
  },
  {
    icon: Sun,
    title: "Planning & Reflection (5–10m)",
    description:
      "Plan tomorrow’s top 3. At night, rate the day 1–5 and write one insight.",
    metric: "Checklist + daily rating",
  },
];

export default function HabitRecommendations() {
  return (
    <section className="bg-white">
      <div className="mx-auto max-w-6xl space-y-6 px-6 py-10">
        <h2 className="text-2xl font-bold">Recommended 21‑Day Habits</h2>
        <p className="text-gray-600">
          Pick 3–5 that align with your goals. Each is measurable and achievable in
          5–30 minutes.
        </p>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {habits.map((h) => (
            <div
              key={h.title}
              className="group rounded-xl border border-gray-200 bg-white p-5 shadow-sm transition hover:shadow-md"
            >
              <div className="flex items-center gap-3">
                <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-emerald-100 text-emerald-700">
                  <h.icon size={20} />
                </span>
                <h3 className="font-semibold">{h.title}</h3>
              </div>
              <p className="mt-3 text-sm text-gray-600">{h.description}</p>
              <p className="mt-3 text-xs text-gray-500">
                Tracking metric: <span className="font-medium text-gray-700">{h.metric}</span>
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
