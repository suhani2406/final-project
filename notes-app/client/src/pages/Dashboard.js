import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import Editor from "../components/Editor";
import RightPanel from "../components/RightPanel";

export default function Dashboard() {
  return (
    <div className="app">
      <Sidebar />

      <div className="main">
        <Header />

        <div className="content">
          <Editor />
          <RightPanel />
        </div>
      </div>
    </div>
  );
}