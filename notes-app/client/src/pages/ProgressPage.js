import ProgressOverview from "../components/progress/ProgressOverview";
import GoalProgress from "../components/progress/GoalProgress";
import HeatmapCalendar from "../components/progress/HeatmapCalendar";
import WeeklyInsights from "../components/progress/WeeklyInsights";
import Achievements from "../components/progress/Achievements";
import Leaderboard from "../components/progress/Leaderboard";

export default function ProgressPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-4xl font-black text-black">
          📈 Progress
        </h1>

        <p className="text-black/60 mt-2">
          Small progress every day adds up to big results.
        </p>
      </div>

      <ProgressOverview />

      <div className="grid lg:grid-cols-2 gap-8">
        <GoalProgress />
        <WeeklyInsights />
      </div>

      <HeatmapCalendar />

      <Achievements />

      <Leaderboard />
    </div>
  );
}