import React, { SetStateAction, useContext, useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import Home from "./Home";
import { CreateLink } from "./Shorten/CreateLink";
import { MyLinks } from "./Shorten/MyLinks";
import { Login } from "./Account/Login";
import { Register } from "./Account/Register";
import { API, ACCOUNT, GET_USER_ID, GET_USER_EMAIL } from "./JS/routeConstants";
import { lifeTimeOfCookie } from "./JS/constants";
import { UserIDContext } from "./App";

export function FMenu() {
  const { userID, setUserID } = useContext(UserIDContext);
  const GetUserIdURI: string = `${API}/${ACCOUNT}/${GET_USER_ID}?userEmail=`;
  const GetUserEmailURI: string = `${API}/${ACCOUNT}/${GET_USER_EMAIL}?userID=`;
  const [state, setState] = useState({ userEmail: "", isLogon: false });
  const splittedCookies: string[] = document.cookie.split("; ");

  const handleToLogin = (userEmail: string, rememberMe: boolean) => {
    setState({ userEmail: userEmail, isLogon: true });
    setCookiesAndUserIDFromUserEmail(userEmail, rememberMe);
  };

  const setCookiesAndUserIDFromUserEmail = (
    userEmail: string,
    rememberMe: boolean
  ) => {
    if (userEmail !== "") {
      fetch(GetUserIdURI + userEmail)
        .then((res) => res.json())
        .then((result) => {
          setUserID(result.userID);
          if (rememberMe) {
            setUserCookies(String(result.userID));
          } else {
            deleteUserCookies();
          }
        });
    }
  };

  const setUserCookies = (userID: string) => {
    document.cookie = "userID=" + userID + "; max-age=" + lifeTimeOfCookie;
    document.cookie = "isLogon=true; max-age=" + lifeTimeOfCookie;
  };

  const deleteUserCookies = () => {
    document.cookie = "userID= ; max-age=0";
    document.cookie = "isLogon=false; max-age=0";
  };

  useEffect(() => {
    settingStateBasedOnCookies();
  }, [userID, state.userEmail]);

  const settingStateBasedOnCookies = () => {
    let tempUserID: string | SetStateAction<string> = "";
    let tempIsLogon: boolean = false;

    splittedCookies.forEach((cookie) => {
      if (cookie === "isLogon=true") {
        tempIsLogon = true;
      }
    });
    splittedCookies.forEach((cookie) => {
      if (cookie.startsWith("userID=") && tempIsLogon) {
        tempUserID = cookie.split("=").pop()!;
        //setUserID(tempUserID);
        if (!(tempUserID === undefined)) setUserEmailFromUserID(tempUserID);
      }
    });
  };

  const setUserEmailFromUserID = (tempUserID: string) => {
    fetch(GetUserEmailURI + tempUserID)
      .then((res) => res.json())
      .then((result) => {
        setState({ userEmail: result.userEmail, isLogon: true });
      });
  };

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
                    {state.isLogon ? (
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
                  {state.isLogon ? (
                    <p className="username"> {state.userEmail} </p>
                  ) : (
                    <Link to="/Login" className={"navi-link"}>
                      Login
                    </Link>
                  )}
                </li>
                <li className="nav-item">
                  {state.isLogon ? (
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
          <Route
            path="/Login"
            element={<Login handleToLogin={handleToLogin} />}
          />
          <Route path="/Register" element={<Register />} />
        </Routes>
      </div>
    </Router>
  );
}
