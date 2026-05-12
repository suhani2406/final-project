import ProgressChart from "../components/ProgressChart";

export default function ProgressPage() {

  return (

    <div className="space-y-6">

      <div
        className="
        bg-white/15
        bg-[#1e293b]
        border border-white/10
        rounded-[35px]
        p-8
      "
      >

        <h1
          className="
          text-5xl
          font-black
          text-white
          mb-6
        "
        >
          Progress Analytics 📊
        </h1>

        <ProgressChart />

      </div>

      <div
        className="
        bg-white/15
        bg-[#1e293b]
        border border-white/10
        rounded-[35px]
        p-8
      "
      >

        <h2
          className="
          text-3xl
          font-bold
          text-white
          mb-6
        "
        >
          Strengths & Weaknesses
        </h2>

        <div className="space-y-4 text-white">

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