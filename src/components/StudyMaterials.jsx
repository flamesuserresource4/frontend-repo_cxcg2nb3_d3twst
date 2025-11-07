import { useEffect, useMemo, useState } from "react";
import { BookOpen, FileText, Video, Star, Search } from "lucide-react";

const DEFAULT_CATEGORIES = [
  { id: "fitness", label: "Fitness" },
  { id: "cma", label: "CMA Student" },
  { id: "accounting", label: "Accounting (GST • IT • Audit)" },
  { id: "hacking", label: "Ethical Hacking" },
  { id: "entertainment", label: "Entertainment" },
];

// Curated starter resources — you can edit/extend these inline.
const STARTER_RESOURCES = [
  // Fitness
  {
    id: "fit-1",
    category: "fitness",
    title: "Beginner Bodyweight Routine (PDF)",
    type: "pdf",
    url: "https://darebee.com/pdf/workouts/beginner-workout.pdf",
    notes: "No equipment full-body plan",
  },
  {
    id: "fit-2",
    category: "fitness",
    title: "15-min Mobility Flow (Video)",
    type: "video",
    url: "https://www.youtube.com/watch?v=cQ9jNv9w7yY",
    notes: "Daily joints + spine routine",
  },

  // CMA Student
  {
    id: "cma-1",
    category: "cma",
    title: "ICMAI Syllabus & Study Guidelines (PDF)",
    type: "pdf",
    url: "https://icmai.in/upload/Students/Syllabus2016/Study_Material_New.pdf",
    notes: "Official module reference",
  },
  {
    id: "cma-2",
    category: "cma",
    title: "Cost & Management Accounting Basics (Video)",
    type: "video",
    url: "https://www.youtube.com/watch?v=V2W5I1oN7i0",
    notes: "Fundamentals overview",
  },

  // Accounting (GST / IT / Audit)
  {
    id: "acc-1",
    category: "accounting",
    title: "GST Act Bare Text (PDF)",
    type: "pdf",
    url: "https://www.cbic.gov.in/resources//htdocs-cbec/gst/01_GST_ACT_2017.pdf",
    notes: "Official CBIC reference",
    tags: ["GST"],
  },
  {
    id: "acc-2",
    category: "accounting",
    title: "Income Tax Basics for Beginners (Video)",
    type: "video",
    url: "https://www.youtube.com/watch?v=1h3P0C8w5fs",
    notes: "Concepts and examples",
    tags: ["IT"],
  },
  {
    id: "acc-3",
    category: "accounting",
    title: "Auditing & Assurance Handbook (PDF)",
    type: "pdf",
    url: "https://www.icaew.com/-/media/corporate/files/technical/audit-and-assurance/assurance/assurance-fundamentals.ashx",
    notes: "Principles and procedures",
    tags: ["Audit"],
  },

  // Ethical Hacking
  {
    id: "hack-1",
    category: "hacking",
    title: "OWASP Top 10 (PDF)",
    type: "pdf",
    url: "https://owasp.org/www-project-top-ten/",
    notes: "Most critical web app risks",
  },
  {
    id: "hack-2",
    category: "hacking",
    title: "TryHackMe Complete Beginner (Video)",
    type: "video",
    url: "https://www.youtube.com/watch?v=3Kq1MIfTWCE",
    notes: "Hands-on getting started",
  },

  // Entertainment
  {
    id: "ent-1",
    category: "entertainment",
    title: "Top Documentary: The Social Dilemma (Trailer)",
    type: "video",
    url: "https://www.youtube.com/watch?v=uaaC57tcci0",
    notes: "Tech + society themes",
  },
  {
    id: "ent-2",
    category: "entertainment",
    title: "Curated Indie Games List (PDF)",
    type: "pdf",
    url: "https://cdn2.unrealengine.com/indie-game-dev-guide-2940e5.pdf",
    notes: "Discover unique titles",
  },
];

const STORAGE_KEYS = {
  bookmarks: "study:bookmarks",
  custom: "study:custom",
};

function useLocalStorage(key, initialValue) {
  const [value, setValue] = useState(() => {
    try {
      const raw = localStorage.getItem(key);
      return raw ? JSON.parse(raw) : initialValue;
    } catch {
      return initialValue;
    }
  });
  useEffect(() => {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch {}
  }, [key, value]);
  return [value, setValue];
}

function ResourceItem({ res, isBookmarked, onToggleBookmark }) {
  const typeIcon = res.type === "pdf" ? (
    <FileText className="h-4 w-4 text-emerald-600" />
  ) : (
    <Video className="h-4 w-4 text-indigo-600" />
  );
  return (
    <div className="group flex items-start justify-between rounded-lg border border-gray-200 bg-white p-4 transition hover:shadow-sm">
      <div className="pr-4">
        <div className="mb-1 flex items-center gap-2">
          {typeIcon}
          <a
            href={res.url}
            target="_blank"
            rel="noreferrer"
            className="font-medium text-gray-900 underline-offset-2 hover:underline"
          >
            {res.title}
          </a>
        </div>
        <p className="text-sm text-gray-600">{res.notes}</p>
        {res.tags && (
          <div className="mt-2 flex flex-wrap gap-2">
            {res.tags.map((t) => (
              <span
                key={t}
                className="rounded-full bg-gray-100 px-2 py-0.5 text-xs text-gray-700"
              >
                {t}
              </span>
            ))}
          </div>
        )}
      </div>

      <button
        onClick={() => onToggleBookmark(res.id)}
        className={`flex items-center gap-1 rounded-md border px-2 py-1 text-xs transition ${
          isBookmarked
            ? "border-yellow-300 bg-yellow-50 text-yellow-700"
            : "border-gray-200 bg-white text-gray-600 hover:bg-gray-50"
        }`}
        aria-label={isBookmarked ? "Remove bookmark" : "Add bookmark"}
      >
        <Star className={`h-4 w-4 ${isBookmarked ? "fill-yellow-400 text-yellow-500" : "text-gray-500"}`} />
        <span>{isBookmarked ? "Bookmarked" : "Mark"}</span>
      </button>
    </div>
  );
}

export default function StudyMaterials() {
  const [active, setActive] = useState("fitness");
  const [query, setQuery] = useState("");
  const [bookmarks, setBookmarks] = useLocalStorage(STORAGE_KEYS.bookmarks, []);
  const [custom, setCustom] = useLocalStorage(STORAGE_KEYS.custom, []);

  const allResources = useMemo(() => [...STARTER_RESOURCES, ...custom], [custom]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return allResources.filter((r) => {
      const inCategory = r.category === active;
      const matches = !q
        ? true
        : [r.title, r.notes, ...(r.tags || [])]
            .filter(Boolean)
            .join(" ")
            .toLowerCase()
            .includes(q);
      return inCategory && matches;
    });
  }, [allResources, active, query]);

  const isBookmarked = (id) => bookmarks.includes(id);
  const toggleBookmark = (id) => {
    setBookmarks((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  const bookmarkedItems = useMemo(
    () => allResources.filter((r) => bookmarks.includes(r.id)),
    [allResources, bookmarks]
  );

  const addCustom = (e) => {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const title = String(form.get("title") || "").trim();
    const url = String(form.get("url") || "").trim();
    const type = String(form.get("type") || "pdf");
    const notes = String(form.get("notes") || "").trim();
    if (!title || !url) return;
    const item = {
      id: `c-${Date.now()}`,
      category: active,
      title,
      type,
      url,
      notes,
    };
    setCustom((prev) => [item, ...prev]);
    e.currentTarget.reset();
  };

  const exportBookmarks = () => {
    const data = JSON.stringify(bookmarkedItems, null, 2);
    const blob = new Blob([data], { type: "application/json" });
    const href = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = href;
    a.download = "bookmarked-resources.json";
    a.click();
    URL.revokeObjectURL(href);
  };

  return (
    <section className="mx-auto max-w-6xl px-6 py-12">
      <div className="mb-8 flex items-start justify-between gap-4">
        <div>
          <h2 className="text-2xl font-semibold tracking-tight text-gray-900">
            Study Materials
          </h2>
          <p className="mt-1 text-sm text-gray-600">
            Browse curated PDFs and videos by topic. Use “Mark” to bookmark references for quick revision.
          </p>
        </div>
        <button
          onClick={exportBookmarks}
          className="rounded-md border border-gray-200 bg-white px-3 py-2 text-sm font-medium text-gray-700 shadow-sm transition hover:bg-gray-50"
        >
          Export Bookmarks
        </button>
      </div>

      {/* Category tabs */}
      <div className="mb-6 flex flex-wrap gap-2">
        {DEFAULT_CATEGORIES.map((c) => (
          <button
            key={c.id}
            onClick={() => setActive(c.id)}
            className={`rounded-full border px-3 py-1.5 text-sm transition ${
              active === c.id
                ? "border-emerald-300 bg-emerald-50 text-emerald-700"
                : "border-gray-200 bg-white text-gray-700 hover:bg-gray-50"
            }`}
          >
            {c.label}
          </button>
        ))}
        <button
          onClick={() => setActive("bookmarks")}
          className={`rounded-full border px-3 py-1.5 text-sm transition ${
            active === "bookmarks"
              ? "border-yellow-300 bg-yellow-50 text-yellow-700"
              : "border-gray-200 bg-white text-gray-700 hover:bg-gray-50"
          }`}
        >
          Bookmarks
        </button>
      </div>

      {/* Search */}
      {active !== "bookmarks" && (
        <div className="mb-6 flex items-center gap-3 rounded-lg border border-gray-200 bg-white px-3 py-2">
          <Search className="h-4 w-4 text-gray-400" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search title, notes, tags"
            className="flex-1 bg-transparent text-sm outline-none placeholder:text-gray-400"
          />
        </div>
      )}

      {/* Resource list */}
      {active === "bookmarks" ? (
        <div>
          <h3 className="mb-4 flex items-center gap-2 text-sm font-medium text-gray-700">
            <Star className="h-4 w-4 text-yellow-500" /> Bookmarked ({bookmarkedItems.length})
          </h3>
          <div className="grid gap-3">
            {bookmarkedItems.length === 0 && (
              <p className="text-sm text-gray-600">No bookmarks yet. Mark items to save them here.</p>
            )}
            {bookmarkedItems.map((r) => (
              <ResourceItem
                key={r.id}
                res={r}
                isBookmarked={isBookmarked(r.id)}
                onToggleBookmark={toggleBookmark}
              />
            ))}
          </div>
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-3">
          <div className="md:col-span-2">
            <div className="grid gap-3">
              {filtered.map((r) => (
                <ResourceItem
                  key={r.id}
                  res={r}
                  isBookmarked={isBookmarked(r.id)}
                  onToggleBookmark={toggleBookmark}
                />
              ))}
              {filtered.length === 0 && (
                <p className="text-sm text-gray-600">No matches. Try a different search or add a custom resource.</p>
              )}
            </div>
          </div>

          {/* Add custom resource */}
          <aside className="h-fit rounded-lg border border-gray-200 bg-white p-4">
            <div className="mb-3 flex items-center gap-2">
              <BookOpen className="h-4 w-4 text-emerald-600" />
              <h4 className="font-medium text-gray-900">Add resource</h4>
            </div>
            <form onSubmit={addCustom} className="grid gap-3 text-sm">
              <div className="grid gap-1">
                <label className="text-xs text-gray-600">Title</label>
                <input name="title" required className="rounded-md border border-gray-200 px-3 py-2 outline-none focus:border-emerald-400" />
              </div>
              <div className="grid gap-1">
                <label className="text-xs text-gray-600">URL</label>
                <input name="url" type="url" required className="rounded-md border border-gray-200 px-3 py-2 outline-none focus:border-emerald-400" />
              </div>
              <div className="grid gap-1">
                <label className="text-xs text-gray-600">Type</label>
                <select name="type" className="rounded-md border border-gray-200 px-3 py-2 outline-none focus:border-emerald-400">
                  <option value="pdf">PDF</option>
                  <option value="video">Video</option>
                </select>
              </div>
              <div className="grid gap-1">
                <label className="text-xs text-gray-600">Notes (optional)</label>
                <textarea name="notes" rows={3} className="rounded-md border border-gray-200 px-3 py-2 outline-none focus:border-emerald-400" />
              </div>
              <button
                type="submit"
                className="rounded-md bg-emerald-600 px-3 py-2 font-medium text-white hover:bg-emerald-700"
              >
                Save to {DEFAULT_CATEGORIES.find((c) => c.id === active)?.label || "This Category"}
              </button>
            </form>
          </aside>
        </div>
      )}
    </section>
  );
}
