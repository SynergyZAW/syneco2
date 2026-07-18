import Sidebar from './Sidebar';
import Topbar from './Topbar';

export default function AppShell({ role, title, sub, children }) {
  return (
    <div className="app-shell">
      <Sidebar role={role} />
      <div className="main-col">
        <Topbar role={role} title={title} sub={sub} />
        <div className="page-body">{children}</div>
      </div>
    </div>
  );
}
