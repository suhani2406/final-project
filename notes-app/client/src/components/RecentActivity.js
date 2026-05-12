export default function RecentActivity() {
  return (
    <div className="glass-card p-7">
      <h2 className="section-title">Recent Activity</h2>

      <div className="space-y-5 mt-6 text-sm">
        <div>
          <p className="font-bold">Chemical Bonding.pdf</p>
          <p className="opacity-70">Summary generated · 2h ago</p>
        </div>

        <div>
          <p className="font-bold">Biology Notes.pdf</p>
          <p className="opacity-70">Flashcards created · 1d ago</p>
        </div>

        <div>
          <p className="font-bold">Maths Quiz</p>
          <p className="opacity-70">Score: 85% · 2d ago</p>
        </div>
      </div>
    </div>
  );
}