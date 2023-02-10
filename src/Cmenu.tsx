import React, { Component } from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import Home from "./Home";
import CreateLink from "./Shorten/CreateLink";
import MyLinks from "./Shorten/MyLinks";
import Login from "./Account/Login";
import Register from "./Account/Register";
import { API, ACCOUNT, LOGON_USER_INFO } from "./JS/routeConstants";

export default class Cmenu extends Component {
  public state: { userEmail: string; isLogon: boolean };

  private UserLoginInfoURI: string = `${API}/${ACCOUNT}/${LOGON_USER_INFO}`;

  constructor(props: any) {
    super(props);
    this.state = {
      userEmail: "",
      isLogon: true,
    };
  }

  componentDidMount(): void {
    fetch(this.UserLoginInfoURI)
      .then((res) => res.json())
      .then((result) => {
        this.setState({
          userEmail: result.userEmail,
          isLogon: result.isLogon,
        });
      })
      .then(() => console.log(document.cookie));
  }

  render() {
    return (
      <Router>
        <div>
          <nav className="navbar navbar-expand-sm navbar-toggleable-sm navbar-light bg-white border-bottom box-shadow mb-3">
            <div className="container-fluid d-sm-inline-flex flex-nowrap justify-content-between navitems">
              <div className="d-sm-inline-flex justify-content-between">
                <button
                  className="navbar-toggler"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target=".navbar-collapse"
                  aria-controls="navbarSupportedContent"
                  aria-expanded="false"
                  aria-label="Toggle navigation"
                >
                  <span className="navbar-toggler-icon"></span>
                </button>
                <Link to="/" className="navbar-brand">
                  ShortenURL
                </Link>
                <div className="navbar-collapse collapse d-sm-inline-flex justify-content-between">
                  <ul className="navbar-nav flex-grow-1">
                    <li className="navi-item">
                      <Link to="/CreateLink" className="navi-link">
                        Create link
                      </Link>
                    </li>
                    <li className="navi-item">
                      {this.state.isLogon ? (
                        <Link to="/MyLinks" className="navi-link">
                          My links
                        </Link>
                      ) : (
                        <></>
                      )}
                    </li>
                  </ul>
                </div>
              </div>
              <div className="d-sm-inline-flex justify-content-between">
                <ul className="navbar-nav flex-grow-1 align-items-end">
                  <li className="nav-item">
                    {this.state.isLogon ? (
                      <p className="username"> this.state.userEmail </p>
                    ) : (
                      <Link to="/Login" className="navi-link">
                        Login
                      </Link>
                    )}
                  </li>
                  <li className="nav-item">
                    {this.state.isLogon ? (
                      <input
                        className="btn-primary"
                        type="submit"
                        value="Logout"
                      />
                    ) : (
                      <Link to="/Register" className="navi-link">
                        Register
                      </Link>
                    )}

                    {/* @if (User.Identity.IsAuthenticated)
                    {
                      <form
                        method="post"
                        asp-controller="Account"
                        asp-action="Logout"
                      >
                        <input
                          className="btn-primary"
                          type="submit"
                          value="Logout"
                        />
                      </form>
                    }
                    else
                    {
                      <Link to="/Register" className="navi-link">
                        Register
                      </Link>
                    } */}
                  </li>
                </ul>
              </div>
            </div>
          </nav>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/CreateLink" element={<CreateLink />} />
            <Route path="/MyLinks" element={<MyLinks />} />
            <Route path="/Login" element={<Login />} />
            <Route path="/Register" element={<Register />} />
          </Routes>
        </div>
      </Router>
    );
  }
}
