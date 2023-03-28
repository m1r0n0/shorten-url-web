import React, { useContext, useState } from "react";
import { BrowserRouter as Router, Navigate } from "react-router-dom";
import { proceedLogin } from "../../../API";
import IncorrectLoginInputDisclaimer from "./IncorrectLoginInputDisclaimer";
import { isLogon } from "../../Utilities/TopMenuUtils/TopMenuUtils";
import { useAppDispatch, useAppSelector } from "../../../hooks";
import { setUserIdAction } from "../../../Store/UserReducer";
import { handleLogin } from "../../../Services/user";

export const Login = () => {
  const dispatch = useAppDispatch();
  const userId = useAppSelector((state) => state.user.user.userId);
  const isLoginFinished = useAppSelector((state) => state.user.isLoginFinished);
  const isLoginRequested = useAppSelector(
    (state) => state.user.isLoginRequested
  );
  const isLoginSuccessful = useAppSelector(
    (state) => state.user.isLoginSuccessful
  );

  const [state, setState] = useState({
    email: "",
    password: "",
    rememberMe: false,
  });
  const [isReadyToRedirect, setIsReadyToRedirect] = useState(false);
  const [showIncorrectInputDisclaimer, setShowIncorrectInputDisclaimer] =
    useState(false);
  //const { isLogon, setUserEmail, setUserID } = useContext(UserContext);

  const handleSubmit: React.MouseEventHandler<HTMLInputElement> = (event) => {
    dispatch(handleLogin(state)).then();
    // proceedLogin(state)
    //   .catch(() => {
    //     setShowIncorrectInputDisclaimer(true);
    //   })
    //   .then((res) => {
    //     handleToLogin(
    //       res.email,
    //       res.rememberMe,
    //       dispatch(setUserIdAction),
    //       dispatch(setUserEmailAction)
    //       //setUserEmail, setUserID
    //     );
    //     setIsReadyToRedirect(true);
    //     setShowIncorrectInputDisclaimer(false);
    //   });
  };

  const defineDisclaimerBasedOnLoginResult = () => {};

  return isLogon(userId) ? (
    <Navigate to="/" />
  ) : (
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
        {isLoginFinished ? (
          <Navigate to="/" />
        ) : isLoginRequested ? (
          <p>Loading...</p>
        ) : (
          <input type="button" value="Log in" onClick={handleSubmit} />
        )}
      </div>
      <div>{isLoginSuccessful ? null : <IncorrectLoginInputDisclaimer />}</div>
    </div>
  );
};
