import StudyStats from "./StudyStats";
import StudyGoal from "./StudyGoal";
import StudyHeatmap from "./StudyHeatmap";
import WeeklyStats from "./WeeklyStats";

export default function StudyDashboard(){
    return(
        <div className="space-y-8">
            <div>
                 <h1 className="text-4xl font-black text-black">
    📈 Progress Dashboard
  </h1>

  <p className="text-black/60 mt-2">
    Track your study consistency and achieve your goals.
  </p>
            </div>
            <StudyStats/>
            <div className="grid lg:grid-cols-2 gap-8">
                <StudyGoal/>
                <WeeklyStats/>
            </div>
            <StudyHeatmap/>
        </div>
    );
}