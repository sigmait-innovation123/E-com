// import { useState } from "react";

import { Link } from "react-router-dom";

const Navbar = ({ uid, cartProduct, handlebtn, setHandlebtn, cartHandler, handler, uname, setUname }) => {
  



  return (
    <div>
      <nav className="navbar navbar-expand-lg bg-body-tertiary">
        <div className="container-fluid">
          <a className="navbar-brand" href="#">
            Ecom
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <a className="nav-link active" aria-current="page" href="#">
                  Home
                </a>
              </li>
             
              <li
                className="nav-item "
                style={{
                  marginLeft: "10px",
                  marginTop: "6px",
                  color: "#40719e",
                  fontWeight: "400",
                  fontSize: "12px",
                }}
              >
                <span
                  className=""
                  style={{
                    color: "#5ca1e1",
                    fontWeight: "700",
                    fontSize: "18px",
                  }}
                >
                 {uname  ? uname[0].toUpperCase() + uname.slice(1) : "" }

                </span>{" "}
                {uname ? "Enjoy your shoping..." : ""}
              </li>
            </ul>
            <form className="d-flex" role="search">
              <>
                 { handlebtn === true ? "" :<><div
                  className="btn btn-outline-success"
                  onClick={cartHandler}
                  style={{ marginRight: "10px" }}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    className="bi bi-cart"
                    viewBox="0 0 16 16"
                  >
                    <path d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .491.592l-1.5 8A.5.5 0 0 1 13 12H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5M3.102 4l1.313 7h8.17l1.313-7H3.102zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4m7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4m-7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2m7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2" />
                  </svg>
                  <span className="cart-count">{cartProduct.length }</span>
                </div>
                
                </>}
              </>
              <input
                  type="text"
                  onChange={handler}
                  style={{
                    borderRadius: "10px",
                    border: "1px solid #198754",
                    marginRight: "10px",
                    textAlign: "center",
                    fontSize: "12px",
                    padding: "10px",
                  }}
                  placeholder="Enter your Product Name "
                />

              <>
                 { handlebtn === true ? <Link to="./login" 
                  className="btn btn-outline-success"
                  style={{
                    borderRadius: "10px",
                    fontWeight: "500",
                    fontSize: "13px",
                  }}
                >
                  Log In
                </Link> :
                 <button
                className="btn btn-outline-success"
                onClick={()=>{ setHandlebtn(true); setUname("") }}
                style={{
                  borderRadius: "10px",
                  fontWeight: "500",
                  fontSize: "13px",
                }}
              >
                Log Out
              </button> }
              </>
            </form>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
