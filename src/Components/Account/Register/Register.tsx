import React, { useState } from "react";
import { Navigate } from "react-router-dom";
import { checkEmailExisting, proceedRegister } from "../../../API";
import InvalidEmailDisclaimer from "./ExistingEmailDisclaimer";
import IncorrectDateOfBirthDisclaimer from "./IncorrectDateOfBirthDisclaimer";
import InvalidPasswordInputDisclaimer from "./InvalidPasswordInputDisclaimer";
import NoMatchingPasswordsDisclaimer from "./NoMatchingPasswordsDisclaimer";
import { handleLogin, isLogon } from "../../../Services/user";
import { ILoginUser } from "../../../Models";
import { useAppSelector } from "../../../hooks";

export const Register = () => {
  const userId = useAppSelector((state) => state.user.user.userId);
  const [state, setState] = useState({
    email: "",
    password: "",
    year: "",
  });

  let passwordConfirm = "";
  let showNoMatchingPasswordsDisclaimer = state.password !== passwordConfirm;
  let showIncorrectDateOfBirth =
    state.year === "0" ||
    Number(state.year.slice(0, 4)) < 1910 ||
    Number(state.year.slice(0, 4)) > 2023;
  let showInvalidEmailDisclaimer = state.email === "";
  let showInvalidPasswordInputDisclaimer = false;
  let showExistingEmailDisclaimer = false;
  let isReadyToRedirect = false;

  const handleSubmit: React.MouseEventHandler<HTMLInputElement> = (event) => {
    const HideDisclaimers = () => {
      showInvalidPasswordInputDisclaimer = false;
      showNoMatchingPasswordsDisclaimer = false;
      showExistingEmailDisclaimer = false;
      showInvalidEmailDisclaimer = false;
      showIncorrectDateOfBirth = false;
    };

    var properState = {
      email: state.email,
      password: state.password,
      year: state.year.slice(0, 4),
    };

    if (!showIncorrectDateOfBirth) {
      if (!showNoMatchingPasswordsDisclaimer) {
        if (!showInvalidEmailDisclaimer) {
          checkEmailExisting(properState.email).then((res) => {
            showExistingEmailDisclaimer = res.isExist;
            if (!showExistingEmailDisclaimer) {
              proceedRegister(properState)
                .catch(() => {
                  showInvalidPasswordInputDisclaimer = true;
                  showExistingEmailDisclaimer = false;
                })
                .then((res) => {
                  const user: ILoginUser = {
                    email: res.email,
                    password: res.password,
                    rememberMe: true,
                  };
                  handleLogin(user);
                  isReadyToRedirect = true;
                  HideDisclaimers();
                });
            }
          });
        }
      }
    }
  };

  return isLogon(userId) ? (
    <Navigate to="/" />
  ) : (
    <div>
      <h2>Register</h2>
      <form method="post" asp-controller="Account" asp-action="Register">
        <div asp-validation-summary="ModelOnly"></div>
        <div>
          <label htmlFor="Email">Email</label>
          <br />
          <input
            value={state.email}
            onChange={(event) =>
              setState({ ...state, email: event.target.value })
            }
            type="text"
            name="email"
            id="email"
          />
        </div>
        <div>
          <label htmlFor="Year">Date of birth</label>
          <br />
          <input
            type="date"
            id="year"
            name="year"
            min="1910-01-01"
            max="2023-01-01"
            asp-for="Year"
            value={state.year}
            onChange={(event) =>
              setState({
                ...state,
                year: event.target.value,
              })
            }
          />
        </div>
        <div>
          <label htmlFor="Password">Password</label>
          <br />
          <input
            onChange={(event) =>
              setState({ ...state, password: event.target.value })
            }
            type="password"
            name="password"
            id="password"
          />
        </div>
        <div>
          <label htmlFor="PasswordConfirm">Password Confirm</label>
          <br />
          <input
            onChange={(event) => (passwordConfirm = event.target.value)}
            type="password"
            name="passwordConfirm"
            id="passwordConfirm"
          />
        </div>
        <br></br>
        <div>
          {isReadyToRedirect ? (
            <Navigate to="/" />
          ) : (
            <input type="button" value="Register" onClick={handleSubmit} />
          )}
        </div>
        <div>
          {showNoMatchingPasswordsDisclaimer ? (
            <NoMatchingPasswordsDisclaimer />
          ) : null}
        </div>
        <div>
          {showExistingEmailDisclaimer ? <InvalidEmailDisclaimer /> : null}
          {showInvalidEmailDisclaimer ? <InvalidEmailDisclaimer /> : null}
        </div>
        <div>
          {showInvalidPasswordInputDisclaimer ? (
            <InvalidPasswordInputDisclaimer />
          ) : null}
        </div>
        <div>
          {showIncorrectDateOfBirth ? <IncorrectDateOfBirthDisclaimer /> : null}
        </div>
      </form>
    </div>
  );
};
