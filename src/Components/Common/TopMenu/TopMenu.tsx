import React, { useContext, useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import Home from "../HomePage/";
import CreateLink from "../../Shorten/CreateLink";
import { MyLinksPage } from "../../Shorten/MyLinks/MyLinksPage/MyLinksPage";
import LoginForm from "../../Account/Login/LoginForm";
import RegisterForm from "../../Account/Register/RegisterForm";
import { lifeTimeOfCookie } from "../../../JS/constants";
import { UserIDContext } from "../../../App";
import { fetchUserEmail, fetchUserID } from "../../../API";
import Unauthorized from "../HtmlErrors/Unauthorized";
import NotFound from "../HtmlErrors/NotFound";
import PageToRedirect from "./PageToRedirect";
import Profile from "../../Account/Profile";
import "./TopMenu.css";
import "../public/lib/bootstrap/dist/css/bootstrap.min.css";

export function TopMenu() {
  const { userID, setUserID, isLogon } = useContext(UserIDContext);

  const [userEmail, setUserEmail] = useState("");
  const splittedCookies: string[] = document.cookie.split("; ");

  const handleToLogin = (userEmail: string, rememberMe: boolean) => {
    setUserEmail(userEmail);
    setCookiesAndUserIDFromUserEmail(userEmail, rememberMe);
  };

  const setCookiesAndUserIDFromUserEmail = (
    userEmail: string,
    rememberMe: boolean
  ) => {
    if (userEmail !== "") {
      fetchUserID(userEmail).then((result) => {
        setUserID(result.userID);
        if (rememberMe) {
          setLongTermUserCookies(String(result.userID));
        } else {
          setOnCloseUserCookies(String(result.userID));
        }
      });
    }

    const setLongTermUserCookies = (userID: string) => {
      document.cookie = "userID=" + userID + "; max-age=" + lifeTimeOfCookie;
    };

    const setOnCloseUserCookies = (userID: string) => {
      document.cookie = "userID=" + userID;
    };
  };

  useEffect(() => {
    settingStateBasedOnCookies();
  }, [userID]);

  const settingStateBasedOnCookies = () => {
    splittedCookies.forEach((cookie) => {
      if (cookie.startsWith("userID=")) {
        let tempUserID = cookie.split("=").pop()!;
        setUserID(tempUserID);
        if (!(tempUserID === undefined || tempUserID === ""))
          setUserEmailFromUserID(tempUserID);
      }
    });
  };

  const setUserEmailFromUserID = (tempUserID: string) => {
    fetchUserEmail(tempUserID).then((result) => {
      setUserEmail(result.newEmail);
    });
  };

  const proceedLogOut:
    | React.MouseEventHandler<HTMLInputElement>
    | undefined = () => {
    const deleteCookies = () => {
      document.cookie = "userID= ; max-age=0";
    };

    deleteCookies();
    setUserEmail("");
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
                    {isLogon() ? (
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
                  {isLogon() ? (
                    <Link to="/Profile/ChangeEmail">
                      <p className="username"> {userEmail} </p>
                    </Link>
                  ) : (
                    <Link to="/Login" className={"navi-link"}>
                      Login
                    </Link>
                  )}
                </li>
                <li className="nav-item">
                  {isLogon() ? (
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
      </div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/CreateLink" element={<CreateLink />} />
        <Route path="/MyLinks" element={<MyLinksPage />} />
        <Route
          path="/Login"
          element={<LoginForm handleToLogin={handleToLogin} />}
        />
        <Route
          path="/Register"
          element={<RegisterForm handleToLogin={handleToLogin} />}
        />
        <Route path="/Unauthorized" element={<Unauthorized />} />
        <Route path="/NotFound" element={<NotFound />} />
        <Route path="/:shortenedUrl?" element={<PageToRedirect />} />
        <Route
          path="/Profile/*"
          element={<Profile setUserEmail={setUserEmail} />}
        />
      </Routes>
    </Router>
  );
}
