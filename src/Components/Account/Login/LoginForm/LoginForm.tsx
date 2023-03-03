import React, { useState } from "react";
import { BrowserRouter as Router, Navigate } from "react-router-dom";
import { proceedLogin } from "../../../../API";
import IncorrectLoginInputDisclaimer from "../IncorrectLoginInputDisclaimer/";

interface LoginProps {
  handleToLogin: (userEmail: string, isLogon: boolean) => void;
}

export const LoginForm: React.FC<LoginProps> = ({
  handleToLogin: handleToLogin,
  ...rest
}) => {
  const [state, setState] = useState({
    email: "",
    password: "",
    rememberMe: false,
  });
  const [isReadyToRedirect, setIsReadyToRedirect] = useState(false);
  const [showIncorrectInputDisclaimer, setShowIncorrectInputDisclaimer] =
    useState(false);

  const handleSubmit: React.MouseEventHandler<HTMLInputElement> = (event) => {
    proceedLogin(state)
      .catch(() => {
        setShowIncorrectInputDisclaimer(true);
      })
      .then((res) => {
        handleToLogin(res.email, res.rememberMe);
        setIsReadyToRedirect(true);
        setShowIncorrectInputDisclaimer(false);
      });
  };

  return (
    <div>
      <h2> Enter the app</h2>
      <div>
        <label htmlFor="email">Email</label> <br />
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
        <label htmlFor="password"></label>Password <br />
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
        <label htmlFor="rememberMe">Remember me?</label> <br />
        <input
          onChange={(event) =>
            setState({ ...state, rememberMe: event.target.checked })
          }
          type="checkbox"
          name="rememberMe"
          id="rememberMe"
        />
      </div>
      <div>
        {isReadyToRedirect ? (
          <Navigate to="/" />
        ) : (
          <input type="button" value="Log in" onClick={handleSubmit} />
        )}
      </div>
      <div>
        {showIncorrectInputDisclaimer ? (
          <IncorrectLoginInputDisclaimer />
        ) : null}
      </div>
    </div>
  );
};
