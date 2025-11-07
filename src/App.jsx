import HeroOverview from "./components/HeroOverview";
import HabitRecommendations from "./components/HabitRecommendations";
import ManualTracker from "./components/ManualTracker";
import ToolRecommendations from "./components/ToolRecommendations";
import StudyMaterials from "./components/StudyMaterials";

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-emerald-50 to-white text-gray-900">
      <header className="sticky top-0 z-10 border-b border-emerald-100 bg-white/80 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <div className="flex items-center gap-2">
            <div className="h-3 w-3 rounded-full bg-emerald-500" />
            <span className="text-sm font-semibold tracking-wide text-emerald-800">21‑Day Habit Validator</span>
          </div>
          <nav className="hidden gap-6 text-sm text-gray-600 sm:flex">
            <a href="#habits" className="hover:text-gray-900">Habits</a>
            <a href="#tracker" className="hover:text-gray-900">Tracker</a>
            <a href="#materials" className="hover:text-gray-900">Materials</a>
            <a href="#tools" className="hover:text-gray-900">Tools</a>
          </nav>
        </div>
      </header>

      <main>
        <HeroOverview />
        <section id="habits">
          <HabitRecommendations />
        </section>
        <section id="tracker">
          <ManualTracker />
        </section>
        <section id="materials">
          <StudyMaterials />
        </section>
        <section id="tools">
          <ToolRecommendations />
        </section>
      </main>

      <footer className="border-t border-gray-200 bg-white">
        <div className="mx-auto max-w-6xl px-6 py-6 text-sm text-gray-600">
          <p>
            Use this page for your 3‑week validation. Export your data, bookmark study references, then choose an app or build a custom site to scale long‑term.
          </p>
        </div>
      </footer>
    </div>
  );
}

export default App;
