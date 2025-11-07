import { ExternalLink, Link } from "lucide-react";

const tools = [
  {
    name: "Notion",
    note: "Templates, reminders via integrations, charts via databases",
    link: "https://www.notion.so/",
  },
  {
    name: "Tana",
    note: "Daily nodes, supertags, API (beta) and CSV export",
    link: "https://tana.inc/",
  },
  { name: "TickTick", note: "Habits + tasks, powerful reminders", link: "https://ticktick.com/" },
  { name: "Habitica", note: "Gamified habits with API", link: "https://habitica.com/" },
  { name: "Google Sheets", note: "Free charts and easy export", link: "https://sheets.google.com/" },
];

const builders = [
  { name: "Webflow", note: "No-code CMS, charts via embeds, member login via add-ons" },
  { name: "Next.js + Vercel", note: "Custom dashboards with APIs and auth; scalable" },
  { name: "Framer", note: "Design-first site, can embed external dashboards" },
];

export default function ToolRecommendations() {
  return (
    <section className="bg-white">
      <div className="mx-auto max-w-6xl px-6 py-10">
        <div className="grid gap-10 md:grid-cols-2">
          <div>
            <h2 className="text-2xl font-bold">Apps to use after validation</h2>
            <p className="mt-1 text-gray-600">All support export or API access.</p>
            <ul className="mt-4 space-y-3">
              {tools.map((t) => (
                <li key={t.name} className="flex items-start justify-between gap-3 rounded-lg border border-gray-200 bg-white p-4">
                  <div>
                    <p className="font-medium">{t.name}</p>
                    <p className="text-sm text-gray-600">{t.note}</p>
                  </div>
                  <a className="inline-flex items-center gap-1 text-emerald-700 hover:underline" href={t.link} target="_blank" rel="noreferrer">
                    Open <ExternalLink size={16} />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="text-2xl font-bold">Website options after 21 days</h2>
            <p className="mt-1 text-gray-600">Choose based on how custom you want your tracker to be.</p>
            <ul className="mt-4 space-y-3">
              {builders.map((b) => (
                <li key={b.name} className="flex items-center justify-between gap-3 rounded-lg border border-gray-200 bg-white p-4">
                  <div>
                    <p className="font-medium">{b.name}</p>
                    <p className="text-sm text-gray-600">{b.note}</p>
                  </div>
                  <span className="inline-flex items-center gap-1 rounded-full bg-gray-100 px-2 py-1 text-xs text-gray-700">
                    <Link size={14}/> Integrations
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
