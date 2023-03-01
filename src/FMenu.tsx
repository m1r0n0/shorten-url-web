import React, { useContext, useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Link,
  redirect,
} from "react-router-dom";
import Home from "./Home";
import { CreateLink } from "./Shorten/CreateLink";
import { MyLinks } from "./Shorten/MyLinks/MyLinks";
import { Login } from "./Account/Login/Login";
import { Register } from "./Account/Register/Register";
import { lifeTimeOfCookie } from "./JS/constants";
import { UserIDContext } from "./App";
import { fetchUserEmail, fetchUserID } from "./API";

export function FMenu() {
  const { userID, setUserID } = useContext(UserIDContext);

  const [state, setState] = useState({ userEmail: "", isLogon: false });
  const splittedCookies: string[] = document.cookie.split("; ");

  const handleToLogin = (userEmail: string, rememberMe: boolean) => {
    setState({ userEmail: userEmail, isLogon: true });
    setCookiesAndUserIDFromUserEmail(userEmail, rememberMe);
    redirect("/");
  };

  const setCookiesAndUserIDFromUserEmail = (
    userEmail: string,
    rememberMe: boolean
  ) => {
    if (userEmail !== "") {
      fetchUserID(userEmail).then((result) => {
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
    let tempIsLogon: boolean = false;

    splittedCookies.forEach((cookie) => {
      if (cookie === "isLogon=true") {
        tempIsLogon = true;
      }
    });
    splittedCookies.forEach((cookie) => {
      if (cookie.startsWith("userID=") && tempIsLogon) {
        let tempUserID = cookie.split("=").pop()!;
        setUserID(tempUserID);
        if (!(tempUserID === undefined)) setUserEmailFromUserID(tempUserID);
      }
    });
  };

  const setUserEmailFromUserID = (tempUserID: string) => {
    fetchUserEmail(tempUserID).then((result) => {
      setState({ userEmail: result.userEmail, isLogon: true });
    });
  };

  const proceedLogOut:
    | React.MouseEventHandler<HTMLInputElement>
    | undefined = () => {
    deleteUserCookies();
    setState({ userEmail: "", isLogon: false });
    setUserID(undefined);
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
                    <Link to="/">
                      <input
                        className="btn-primary"
                        type="submit"
                        value="Logout"
                        onClick={proceedLogOut}
                      />
                    </Link>
                  ) : (
                    <Link to="/Register" className="navi-link">
                      Register
                    </Link>
                  )}
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
          <Route
            path="/Register"
            element={<Register handleToLogin={handleToLogin} />}
          />
        </Routes>
      </div>
    </Router>
  );
}
