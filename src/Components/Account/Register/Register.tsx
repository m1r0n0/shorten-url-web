import React, { useState } from "react";
import { Navigate } from "react-router-dom";
import { checkEmailExisting, proceedRegister } from "../../../API";
import InvalidEmailDisclaimer from "./InvalidEmailDisclaimer";
import IncorrectDateOfBirthDisclaimer from "./IncorrectDateOfBirthDisclaimer";
import InvalidPasswordInputDisclaimer from "./InvalidPasswordInputDisclaimer";
import NoMatchingPasswordsDisclaimer from "./NoMatchingPasswordsDisclaimer";
import { handleLogin, isLogon } from "../../../Services/user";
import { ILoginUser } from "../../../Models";
import { useAppDispatch, useAppSelector } from "../../../hooks";
import ExistingEmailDisclaimer from "./ExistingEmailDisclaimer";

export const Register = () => {
  const dispatch = useAppDispatch();
  const userId = useAppSelector((state) => state.user.user.userId);
  const [state, setState] = useState({
    email: "",
    password: "",
    year: "",
  });

  const [passwordConfirm, setPasswordConfirm] = useState("");
  let showNoMatchingPasswordsDisclaimer = state.password !== passwordConfirm;
  let showIncorrectDateOfBirth =
    state.year !== "" &&
    (state.year === "0" ||
      Number(state.year.slice(0, 4)) < 1910 ||
      Number(state.year.slice(0, 4)) > 2023);

  const [
    showInvalidPasswordInputDisclaimer,
    setShowInvalidPasswordInputDisclaimer,
  ] = useState(false);
  const [isReadyToRedirect, setIsReadyToRedirect] = useState(false);
  const [showExistingEmailDisclaimer, setShowExistingEmailDisclaimer] =
    useState(false);
  const [showInvalidEmailDisclaimer, setShowInvalidEmailDisclaimer] =
    useState(false);

  const handleSubmit: React.MouseEventHandler<HTMLInputElement> = (event) => {
    const HideDisclaimers = () => {
      setShowInvalidPasswordInputDisclaimer(false);
      setShowExistingEmailDisclaimer(false);
      setShowInvalidEmailDisclaimer(false);
      showIncorrectDateOfBirth = false;
      showNoMatchingPasswordsDisclaimer = false;
    };

    HideDisclaimers();

    var properState = {
      email: state.email,
      password: state.password,
      year: state.year.slice(0, 4),
    };

    let isEmailSuitable = state.email !== "";
    setShowInvalidEmailDisclaimer(!isEmailSuitable);

    if (
      !showIncorrectDateOfBirth &&
      !showNoMatchingPasswordsDisclaimer &&
      isEmailSuitable
    ) {
      proceedRegister(properState)
        .catch((error) => {
          isEmailSuitable = error.message !== "409";
          if (isEmailSuitable) setShowInvalidPasswordInputDisclaimer(true);
          setShowExistingEmailDisclaimer(!isEmailSuitable);
        })
        .then((res) => {
          if (isEmailSuitable) {
            const user: ILoginUser = {
              email: res.email,
              password: res.password,
              rememberMe: true,
            };
            dispatch(handleLogin(user));
            setIsReadyToRedirect(true);
            HideDisclaimers();
          }
        });
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
            onChange={(event) => setPasswordConfirm(event.target.value)}
            type="password"
            name="passwordConfirm"
            id="passwordConfirm"
          />
        </div>
        <br />
        <div className="mb-4">
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
          {showExistingEmailDisclaimer ? <ExistingEmailDisclaimer /> : null}
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
