import React, { useContext, useState } from "react";
import { Navigate } from "react-router-dom";
import { checkEmailExisting, proceedRegister } from "../../../../API";
import { UserIDContext } from "../../../../App";
import ExistingEmailDisclaimer from "../ExistingEmailDisclaimer";
import IncorrectRegisterInputDisclaimer from "../IncorrectRegisterInputDisclaimer";
import NoMatchingPasswordsDisclaimer from "../NoMatchingPasswordsDisclaimer";

interface LoginProps {
  handleToLogin: (userEmail: string, isLogon: boolean) => void;
}

export const RegisterForm: React.FC<LoginProps> = ({
  handleToLogin,
  ...rest
}) => {
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
  const [showIncorrectInputDisclaimer, setShowIncorrectInputDisclaimer] =
    useState(false);
  const [isReadyToRedirect, setIsReadyToRedirect] = useState(false);
  const [showExistingEmailDisclaimer, setShowExistingEmailDisclaimer] =
    useState(false);
  const { isLogon } = useContext(UserIDContext);

  const handleSubmit: React.MouseEventHandler<HTMLInputElement> = (event) => {
    var properState = {
      email: state.email,
      password: state.password,
      year: state.year.slice(0, 4),
    };
    if (state.password === passwordConfirm) {
      setShowNoMatchingPasswordsDisclaimer(false);
      checkEmailExisting(properState.email).then((res) => {
        if (!res.isExist) {
          proceedRegister(properState)
            .catch(() => {
              setShowIncorrectInputDisclaimer(true);
            })
            .then((res) => {
              handleToLogin(res.email, true);
              setIsReadyToRedirect(true);
              setShowIncorrectInputDisclaimer(false);
              setShowNoMatchingPasswordsDisclaimer(false);
              setShowExistingEmailDisclaimer(false);
            });
        } else {
          setShowExistingEmailDisclaimer(true);
        }
      });
    } else {
      setShowNoMatchingPasswordsDisclaimer(true);
    }
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
          {showExistingEmailDisclaimer ? <ExistingEmailDisclaimer /> : null}
        </div>
        <div>
          {showIncorrectInputDisclaimer ? (
            <IncorrectRegisterInputDisclaimer />
          ) : null}
        </div>
      </form>
    </div>
  );
};
