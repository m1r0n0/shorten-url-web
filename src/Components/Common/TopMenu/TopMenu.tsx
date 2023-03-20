import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../../../App";
import { fetchUserEmail } from "../../../API";
import "./TopMenu.css";

export function TopMenu() {
  const { userID, setUserID, userEmail, setUserEmail, isLogon } =
    useContext(UserContext);

  const splittedCookies: string[] = document.cookie.split("; ");

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
  );
}
