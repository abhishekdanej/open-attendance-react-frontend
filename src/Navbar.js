export default function Navbar({ mail }) {

  return (
    <>
      <nav className="navbar border-bottom border-secondary-subtle bg-dark" data-bs-theme="dark">
        <span className="navbar-brand mb-0 h1 fs-3 p-2" style={{"color" : "white"}}>openverse</span>
        <span className="mb-0 p-2" style={{"color" : "gray"}}>{mail}</span>
      </nav>
      <br></br>
    </>
  );
}