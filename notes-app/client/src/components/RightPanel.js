export default function RightPanel() {
  return (
    <div className="right">
      <h3>Tags</h3>
      <div className="tags">
        <span className="tag work">Work</span>
        <span className="tag idea">Ideas</span>
        <span className="tag study">Study</span>
      </div>

      <h3 style={{ marginTop: "20px" }}>Filters</h3>
      <p>All Notes</p>
      <p>Recent</p>

      <h3 style={{ marginTop: "20px" }}>Activity</h3>
      <div className="activity-item">Note updated</div>
      <div className="activity-item">Folder created</div>
      <div className="activity-item">New note added</div>
    </div>
  );
}