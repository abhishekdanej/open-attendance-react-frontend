import { Link } from "react-router-dom";

export default function BottomNav() {

  return (


    <nav className="navbar fixed-bottom bg-body-tertiary border-top border-secondary-subtle">
      <div className="container-fluid justify-content-around">
        <div className="row">
          <div className="col">
            <span className="navbar-text active">
              <Link to="/team">👨‍👨‍👧‍👦</Link><br/>
              Team
            </span>
          </div>

          <div className="col">
            <span className="navbar-text">
            </span>
          </div>

          <div className="col">
            <span className="navbar-text">
              <Link to="/me">🐵</Link><br/>
              Me
            </span>
          </div>
        </div>
      </div>
    </nav>



    // <nav className="navbar fixed-bottom bg-body-tertiary">
    //   <div className="container-fluid">

    //     <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
    //       <div class="navbar-nav">
    //         <ul className="navbar-nav">
    //           <li className="nav-item">
    //             <Link to="/team">Team</Link>
    //           </li>
    //           <li className="nav-item">
    //             <Link to="/me">Me</Link>
    //           </li>
    //         </ul>
    //       </div>
    //       {/* <a class="nav-link active" aria-current="page" href="#">Home</a>
    //     <a class="nav-link" href="#">Features</a>
    //     <a class="nav-link" href="#">Pricing</a>
    //     <a class="nav-link disabled">Disabled</a> */}
    //     </div>
    //   </div>
    // </nav>
  );
}