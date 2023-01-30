export default function Navbar({mail}) {

    return (
        <nav className="navbar">
        <span className="navbar-brand mb-0 h1 fs-3 p-2">Open Attendance</span>
        <span className="mb-0 p-2">{mail}</span>
      </nav>
    );
}