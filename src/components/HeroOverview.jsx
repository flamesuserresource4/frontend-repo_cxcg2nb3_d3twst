import { Rocket, CheckCircle2 } from "lucide-react";

export default function HeroOverview() {
  return (
    <section className="relative overflow-hidden">
      <div className="mx-auto max-w-6xl px-6 py-14">
        <div className="grid gap-8 md:grid-cols-2 md:items-center">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full bg-green-100 px-3 py-1 text-sm font-medium text-green-700">
              <Rocket size={16} /> 3-week validation plan
            </div>
            <h1 className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
              Validate sustainable daily habits, then scale with the right tools
            </h1>
            <p className="mt-4 text-gray-600">
              Use this lightweight system for 21 days to confirm which habits stick. Track
              progress visually, export your data, and graduate to a professional setup
              with tools and a custom website once you know what truly works.
            </p>
            <ul className="mt-6 space-y-2 text-gray-700">
              <li className="flex items-start gap-2"><CheckCircle2 className="mt-0.5 text-green-600" size={18}/> Specific, measurable habits (5–30 minutes)</li>
              <li className="flex items-start gap-2"><CheckCircle2 className="mt-0.5 text-green-600" size={18}/> Simple manual tracking with streaks & completion</li>
              <li className="flex items-start gap-2"><CheckCircle2 className="mt-0.5 text-green-600" size={18}/> Export-ready for easy migration to apps/web</li>
            </ul>
          </div>
          <div className="rounded-2xl border border-gray-200 bg-white/60 p-6 shadow-sm backdrop-blur">
            <h3 className="text-lg font-semibold">How this page helps</h3>
            <ol className="mt-3 list-decimal pl-5 text-gray-700 space-y-2">
              <li>Pick 3–5 daily habits tailored to growth.</li>
              <li>Use the tracker below for 21 days.</li>
              <li>Export your data and choose the right app.</li>
              <li>Plan your long-term website approach.</li>
            </ol>
            <div className="mt-6 grid grid-cols-2 gap-4 text-sm">
              <div className="rounded-lg bg-green-50 p-3 text-green-800">Visual streaks</div>
              <div className="rounded-lg bg-green-50 p-3 text-green-800">CSV export</div>
              <div className="rounded-lg bg-green-50 p-3 text-green-800">Local-only data</div>
              <div className="rounded-lg bg-green-50 p-3 text-green-800">Migration-ready</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
