import { useEffect, useMemo, useState } from "react";
import { CheckCircle2, Circle, Download } from "lucide-react";

// 21-day window starting today by default
function getDateKey(date) {
  return date.toISOString().slice(0, 10);
}

function generateWindow(startDate) {
  const days = [];
  for (let i = 0; i < 21; i++) {
    const d = new Date(startDate);
    d.setDate(d.getDate() + i);
    days.push({ key: getDateKey(d), label: d.toLocaleDateString(undefined, { month: "short", day: "numeric" }) });
  }
  return days;
}

const defaultHabits = [
  { id: "learn", name: "Focused Learning" },
  { id: "move", name: "Movement Snack" },
  { id: "mind", name: "Mindfulness Reset" },
  { id: "deep", name: "Deep Work Sprint" },
  { id: "plan", name: "Planning & Reflection" },
];

export default function ManualTracker() {
  const [start, setStart] = useState(() => getDateKey(new Date()));
  const days = useMemo(() => generateWindow(new Date(start)), [start]);
  const [habits, setHabits] = useState(() => {
    const saved = localStorage.getItem("habits:list");
    return saved ? JSON.parse(saved) : defaultHabits;
  });
  const [checks, setChecks] = useState(() => {
    const saved = localStorage.getItem("habits:checks");
    return saved ? JSON.parse(saved) : {};
  });

  useEffect(() => {
    localStorage.setItem("habits:list", JSON.stringify(habits));
  }, [habits]);
  useEffect(() => {
    localStorage.setItem("habits:checks", JSON.stringify(checks));
  }, [checks]);

  const toggle = (hid, dayKey) => {
    setChecks((prev) => {
      const next = { ...prev };
      const row = new Set(next[hid] || []);
      if (row.has(dayKey)) row.delete(dayKey);
      else row.add(dayKey);
      next[hid] = Array.from(row);
      return next;
    });
  };

  const completion = useMemo(() => {
    const totalCells = habits.length * days.length;
    let completed = 0;
    for (const h of habits) {
      const row = new Set(checks[h.id] || []);
      completed += days.filter((d) => row.has(d.key)).length;
    }
    const percent = totalCells ? Math.round((completed / totalCells) * 100) : 0;
    return { completed, totalCells, percent };
  }, [checks, habits, days]);

  const exportCSV = () => {
    const headers = ["date", ...habits.map((h) => h.name)];
    const rows = days.map((d) => {
      const cols = habits.map((h) => (checks[h.id]?.includes(d.key) ? 1 : 0));
      return [d.key, ...cols];
    });
    const csv = [headers.join(","), ...rows.map((r) => r.join(","))].join("\n");
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "habit-tracking-21-days.csv";
    a.click();
    URL.revokeObjectURL(url);
  };

  const addHabit = () => {
    const name = prompt("New habit name (5–30m, measurable):");
    if (!name) return;
    const id = name.toLowerCase().replace(/[^a-z0-9]+/g, "-").slice(0, 24) + "-" + Math.floor(Math.random()*1000);
    setHabits((h) => [...h, { id, name }]);
  };

  const removeHabit = (id) => {
    if (!confirm("Remove this habit?")) return;
    setHabits((h) => h.filter((x) => x.id !== id));
    setChecks((c) => {
      const next = { ...c };
      delete next[id];
      return next;
    });
  };

  return (
    <section className="bg-gray-50">
      <div className="mx-auto max-w-6xl px-6 py-10">
        <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-end">
          <div>
            <h2 className="text-2xl font-bold">21‑Day Manual Tracker</h2>
            <p className="text-gray-600">Lightweight checklist with streaks and export.</p>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <label className="text-sm text-gray-700">Start date</label>
            <input
              type="date"
              value={start}
              onChange={(e) => setStart(e.target.value)}
              className="rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-emerald-500 focus:outline-none"
            />
            <button
              onClick={addHabit}
              className="rounded-md bg-emerald-600 px-3 py-2 text-sm font-medium text-white hover:bg-emerald-700"
            >
              Add habit
            </button>
            <button
              onClick={exportCSV}
              className="inline-flex items-center gap-2 rounded-md border border-gray-300 bg-white px-3 py-2 text-sm font-medium hover:bg-gray-50"
            >
              <Download size={16}/> Export CSV
            </button>
          </div>
        </div>

        <div className="mt-6 overflow-x-auto">
          <table className="w-full min-w-[720px] table-fixed border-collapse">
            <thead>
              <tr>
                <th className="w-56 bg-white p-3 text-left text-sm font-semibold text-gray-700">Habit</th>
                {days.map((d) => (
                  <th key={d.key} className="bg-white p-2 text-center text-xs font-medium text-gray-500">{d.label}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {habits.map((h) => {
                const row = new Set(checks[h.id] || []);
                return (
                  <tr key={h.id} className="border-t border-gray-200">
                    <td className="bg-white p-3 text-sm font-medium text-gray-800">
                      <div className="flex items-center justify-between gap-2">
                        <span>{h.name}</span>
                        <button onClick={() => removeHabit(h.id)} className="text-xs text-gray-500 hover:text-red-600">Remove</button>
                      </div>
                    </td>
                    {days.map((d) => {
                      const checked = row.has(d.key);
                      return (
                        <td key={d.key} className="bg-white p-1 text-center">
                          <button
                            onClick={() => toggle(h.id, d.key)}
                            aria-label={`Toggle ${h.name} on ${d.label}`}
                            className={`mx-auto flex h-7 w-7 items-center justify-center rounded-full transition ${
                              checked ? "bg-emerald-100 text-emerald-700" : "bg-gray-100 text-gray-400 hover:text-gray-600"
                            }`}
                          >
                            {checked ? <CheckCircle2 size={18}/> : <Circle size={18}/>}                
                          </button>
                        </td>
                      );
                    })}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        <div className="mt-6 flex items-center justify-between rounded-lg border border-gray-200 bg-white p-4 text-sm">
          <div>
            <p className="font-medium text-gray-800">Completion</p>
            <p className="text-gray-600">{completion.completed} of {completion.totalCells} checks</p>
          </div>
          <div className="w-1/2">
            <div className="h-2 w-full rounded-full bg-gray-100">
              <div className="h-2 rounded-full bg-emerald-500" style={{ width: `${completion.percent}%` }} />
            </div>
            <p className="mt-1 text-right font-medium text-gray-700">{completion.percent}%</p>
          </div>
        </div>
      </div>
    </section>
  );
}
