import React from "react";
import { Link, useNavigate } from "react-router-dom";
import Badge from "react-bootstrap/Badge";
function Navbar() {
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };
  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-dark bg-success">
        <div className="container-fluid">
          <Link className="navbar-brand fs-1 fst-italic fw-bolder" to="/">
            GoFood
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav me-auto ">
              <li className="nav-item">
                <Link
                  className="nav-link active  fs-3 fw-bolder"
                  aria-current="page"
                  to="/"
                >
                  Home
                </Link>
              </li>
              {localStorage.getItem("token") ? (
                <li className="nav-item">
                  <Link
                    className="nav-link active fs-3 fw-semibold"
                    aria-current="page"
                    to="/myorders"
                  >
                    My Orders
                  </Link>
                </li>
              ) : (
                " "
              )}
            </ul>
            {!localStorage.getItem("token") ? (
              <div className="d-flex">
                <Link
                  className="btn bg-white text-success mx-1 fw-bold"
                  to="/login"
                >
                  Login
                </Link>
                <Link
                  className="btn bg-white text-success mx-1 fw-bold"
                  to="/createuser"
                >
                  SignUp
                </Link>
              </div>
            ) : (
              <div>
                <div className="btn  bg-white text-success mx-2 fw-bold">
                  <Link to="/cart">My Cart</Link>
                  {"  "}
                  <Badge pill bg="danger">
                    3
                  </Badge>
                </div>

                <div
                  className="btn btn-danger  text-white  mx-2 fw-bold "
                  onClick={handleLogout}
                >
                  Logout
                </div>
              </div>
            )}
          </div>
        </div>
      </nav>
    </div>
  );
}

export default Navbar;
