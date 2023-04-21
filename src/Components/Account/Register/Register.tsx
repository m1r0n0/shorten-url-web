import React, { useState } from "react";
import { Navigate } from "react-router-dom";
import { proceedRegister } from "../../../API";
import {
  handleLogin,
  handleRegister,
  isLogon,
  updateRegisterStateDependentDisclaimerStates,
} from "../../../Services/user";
import {
  IComponentDependentDisclaimerStates,
  ILoginUser,
  IRegisterUser,
} from "../../../Models";
import { useAppDispatch, useAppSelector } from "../../../hooks";
import {
  hideAllDisclaimersAction,
  setIsEmailSuitableAction,
  setIsIncorrectDateOfBirthAction,
  setIsInvalidEmailAction,
  setIsNoMatchingPasswordsAction,
  setIsStateUpdatedAction,
} from "../../../Store/DisclaimerReducer";
import Disclaimers from "./Disclaimers";
import { AppDispatch } from "../../../Store";

export const Register = () => {
  const dispatch = useAppDispatch();
  const userId = useAppSelector((state) => state.user.user.userId);
  const isRegisterSuccessful = useAppSelector(
    (state) => state.user.isRegisterSuccessful
  );
  const isDisclaimersUpdated = useAppSelector(
    (state) => state.disclaimer.isStateUpdated
  );
  const [state, setState] = useState({
    email: "",
    password: "",
    year: "",
  });

  const [passwordConfirm, setPasswordConfirm] = useState("");
  // const isNoMatchingPasswords = useAppSelector(
  //   (state) => state.disclaimer.isNoMatchingPasswords
  // );
  // const isIncorrectDateOfBirth = useAppSelector(
  //   (state) => state.disclaimer.isIncorrectDateOfBirth
  // );
  // const isEmailSuitable = useAppSelector(
  //   (state) => state.disclaimer.isEmailSuitable
  // );
  // const isInvalidEmail = useAppSelector(
  //   (state) => state.disclaimer.isInvalidEmail
  // );

  function handleSubmit() {
    dispatch(hideAllDisclaimersAction());

    var properUserState: IRegisterUser = {
      email: state.email,
      password: state.password,
      year: state.year.slice(0, 4),
    };
    var disclaimerStates: IComponentDependentDisclaimerStates = {
      isIncorrectDateOfBirth:
        (state.year !== "" &&
          (state.year === "0" ||
            Number(state.year.slice(0, 4)) < 1910 ||
            Number(state.year.slice(0, 4)) > 2023)) ||
        state.year === "",
      isNoMatchingPasswords:
        state.password !== passwordConfirm ||
        (state.password === "" && passwordConfirm === ""),
      isInvalidEmail: state.email === "",
    };

    dispatch(updateRegisterStateDependentDisclaimerStates(disclaimerStates));
    if (
      !isIncorrectDateOfBirth &&
      !isNoMatchingPasswords &&
      isInvalidEmail &&
      isDisclaimersUpdated
    )
      dispatch(handleRegister(properUserState, isEmailisInvalidEmailSuitable));
  }

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
          {isRegisterSuccessful ? (
            <Navigate to="/" />
          ) : (
            <input type="button" value="Register" onClick={handleSubmit} />
          )}
        </div>
        <Disclaimers />
      </form>
    </div>
  );
};
