import ProgressChart from "../components/ProgressChart";

export default function ProgressPage() {

  return (

    <div className="space-y-6">

      <div className="glass p-8 rounded-[35px]">

        <h1 className="text-4xl font-black mb-6">
          Progress Analytics 📊
        </h1>

        <ProgressChart />

      </div>

      <div className="glass p-8 rounded-[35px]">

        <h2 className="text-3xl font-bold mb-6">

          Strengths & Weaknesses

        </h2>

        <div className="space-y-4">

          <div>
            Organic Chemistry — 92%
          </div>

          <div>
            Biology — 88%
          </div>

          <div>
            Thermodynamics — 45%
          </div>

        </div>

      </div>

    </div>
  );
}