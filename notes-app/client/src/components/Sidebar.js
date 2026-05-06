export default function Sidebar() {
  return (
    <div className="sidebar">
      <h2>YumeNote</h2>

      <div className="sidebar-item active">Dashboard</div>
      <div className="sidebar-item">Notes</div>
      <div className="sidebar-item">Folders</div>
      <div className="sidebar-item">Favorites</div>

      <h4 style={{ marginTop: "20px" }}>Folders</h4>
      <div className="sidebar-item">Personal</div>
      <div className="sidebar-item">Work</div>
      <div className="sidebar-item">Study</div>
    </div>
  );
}