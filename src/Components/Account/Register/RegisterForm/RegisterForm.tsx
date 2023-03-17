import React, { useContext, useState } from "react";
import { Navigate } from "react-router-dom";
import { checkEmailExisting, proceedRegister } from "../../../../API";
import { UserContext } from "../../../../App";
import InvalidEmailDisclaimer from "../ExistingEmailDisclaimer";
import IncorrectDateOfBirthDisclaimer from "../IncorrectDateOfBirthDisclaimer";
import InvalidPasswordInputDisclaimer from "../InvalidPasswordInputDisclaimer";
import NoMatchingPasswordsDisclaimer from "../NoMatchingPasswordsDisclaimer";
import { handleToLogin } from "../../../Utilities/TopMenuUtils/TopMenuUtils";

export const RegisterForm = () => {
  const {setUserEmail, setUserID} = useContext(UserContext);
  const [state, setState] = useState({
    email: "",
    password: "",
    year: "",
  });
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [
    showNoMatchingPasswordsDisclaimer,
    setShowNoMatchingPasswordsDisclaimer,
  ] = useState(false);
  const [
    showInvalidPasswordInputDisclaimer,
    setShowInvalidPasswordInputDisclaimer,
  ] = useState(false);
  const [isReadyToRedirect, setIsReadyToRedirect] = useState(false);
  const [showExistingEmailDisclaimer, setShowExistingEmailDisclaimer] =
    useState(false);
  const [showIncorrectDateOfBirth, setShowIncorrectDateOfBirth] =
    useState(false);
  const [showInvalidEmailDisclaimer, setShowInvalidEmailDisclaimer] =
    useState(false);
  const { isLogon } = useContext(UserContext);

  const handleSubmit: React.MouseEventHandler<HTMLInputElement> = (event) => {
    var properState = {
      email: state.email,
      password: state.password,
      year: state.year.slice(0, 4),
    };
    if (
      state.year === "0" ||
      Number(properState.year) < 1910 ||
      Number(properState.year) > 2023
    ) {
      setShowIncorrectDateOfBirth(true);
    } else {
      setShowIncorrectDateOfBirth(false);
      if (state.password === passwordConfirm) {
        setShowNoMatchingPasswordsDisclaimer(false);
        if (state.email === "") {
          setShowInvalidEmailDisclaimer(true);
        } else {
          setShowInvalidEmailDisclaimer(false);
          checkEmailExisting(properState.email).then((res) => {
            if (!res.isExist) {
              proceedRegister(properState)
                .catch(() => {
                  setShowInvalidPasswordInputDisclaimer(true);
                  setShowExistingEmailDisclaimer(false);
                })
                .then((res) => {
                  handleToLogin(res.email, true, setUserEmail, setUserID);
                  setIsReadyToRedirect(true);
                  ConcealDisclaimers();
                });
            } else {
              setShowExistingEmailDisclaimer(true);
            }
          });
        }
      } else {
        setShowNoMatchingPasswordsDisclaimer(true);
      }
    }

    const ConcealDisclaimers = () => {
      setShowInvalidPasswordInputDisclaimer(false);
      setShowNoMatchingPasswordsDisclaimer(false);
      setShowExistingEmailDisclaimer(false);
      setShowIncorrectDateOfBirth(false);
      setShowInvalidEmailDisclaimer(false);
    };
  };

  return isLogon() ? (
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
