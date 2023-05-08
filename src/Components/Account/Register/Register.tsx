import { useState } from "react";
import { Navigate } from "react-router-dom";
import {
  handleRegister,
  isLogon,
  updateRegisterStateDependentDisclaimerStates,
} from "../../../Services/user";
import {
  IComponentDependentDisclaimerStates,
  IRegisterUser,
} from "../../../Models";
import { useAppDispatch, useAppSelector } from "../../../hooks";
import { hideAllDisclaimersAction } from "../../../Store/DisclaimerReducer";
import RegisterDisclaimers from "./Disclaimers";
import ClipLoader from "react-spinners/ClipLoader";

export const Register = () => {
  const dispatch = useAppDispatch();
  const userId = useAppSelector((state) => state.user.user.userId);
  const isRegisterRequested = useAppSelector((s) => s.user.isRegisterRequested);
  const isRegisterSuccessful = useAppSelector(
    (state) => state.user.isRegisterSuccessful
  );
  const [state, setState] = useState({
    email: "",
    password: "",
    year: "",
  });
  const [passwordConfirm, setPasswordConfirm] = useState("");

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

    dispatch(handleRegister(properUserState, disclaimerStates));
  }

  return isLogon(userId) ? (
    <Navigate to="/" />
  ) : (
    <div>
      <h2>Register</h2>
      <form method="post" asp-controller="Account" asp-action="Register">
        <div>
          <label htmlFor="Email">Email</label>
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
          <input
            onChange={(event) => setPasswordConfirm(event.target.value)}
            type="password"
            name="passwordConfirm"
            id="passwordConfirm"
          />
        </div>
        <div className="m-4">
          {isRegisterSuccessful ? (
            <Navigate to="/" />
          ) : isRegisterRequested ? (
            <ClipLoader
              size={75}
              loading={true}
              color={"#000000"}
              cssOverride={{}}
              speedMultiplier={1}
              className="loader"
            />
          ) : (
            <input type="button" value="Register" onClick={handleSubmit} />
          )}
        </div>
        <RegisterDisclaimers />
      </form>
    </div>
  );
};
