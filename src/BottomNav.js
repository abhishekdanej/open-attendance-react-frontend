import { Link } from "react-router-dom";

export default function BottomNav() {

  return (


    <nav className="navbar fixed-bottom bg-white border-top border-secondary-subtle">
      <div className="container-fluid">
        <div className="row d-flex flex-grow-1 justify-content-between">

          {/* <div className="col d-flex justify-content-center">
            <span className="navbar-text">
              <Link to="/team">
                👨‍👨‍👧‍👦
                <br />
                Team
              </Link>
            </span>
          </div> */}

          <div className="col d-flex justify-content-center">
            <span className="navbar-text">
              <div className="row">
              <Link to="/team">
              🎯
              </Link>
              </div>
              <div className="row">
                Today
              </div>
            </span>
          </div>


          <div className="col d-flex justify-content-center">
            <span className="navbar-text">
              <div className="row">
                <Link to="/me">
                  📆
                  {/* <br /> */}
                </Link>
              </div>
              <div className="row">
                History
              </div>
            </span>
          </div>

          <div className="col d-flex justify-content-center">
            <span className="navbar-text">
              <div className="row">
              <Link to="/teamnew">
              👯
              </Link>
              </div>
              <div className="row">
                Week
              </div>
            </span>
          </div>

          {/* <div className="col d-flex justify-content-center">
            <span className="navbar-text">
              <Link to="/teamnew">
                👯‍♂️
                <br />
                Team
              </Link>
            </span>
          </div> */}

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