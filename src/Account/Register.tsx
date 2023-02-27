import React, { useState } from "react";
import { API, ACCOUNT, REGISTER } from "../JS/routeConstants";

interface LoginProps {
  handleToLogin: (userEmail: string, isLogon: boolean) => void;
}

export const Register: React.FC<LoginProps> = ({
  handleToLogin: handleToLogin,
  ...rest
}) => {
  const [state, setState] = useState({
    email: "",
    password: "",
    year: "",
  });
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [showIncorrectInputDisclaimer, setShowIncorrectInputDisclaimer] =
    useState(false);
  const LoginURI: string = `${API}/${ACCOUNT}/${REGISTER}`;

  const handleRegister: React.MouseEventHandler<HTMLInputElement> = (event) => {
    if (state.password === passwordConfirm) {
      console.log(JSON.stringify(state));
      fetch(LoginURI, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(state),
        credentials: "include",
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error("Network response was not OK");
          } else {
            return response.json();
          }
        })
        .catch((error) => {
          console.error(
            "There has been a problem with your fetch operation:",
            error
          );
        })
        .then((res) => {
          handleToLogin(res.email, true);
        });
    } else {
      setShowIncorrectInputDisclaimer(true);
    }
  };

  return (
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
          <label htmlFor="Year">Year of birth</label>
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
              setState({ ...state, year: event.target.value })
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
          <input type="button" value="Register" onClick={handleRegister} />
        </div>
        <div>
          {showIncorrectInputDisclaimer ? (
            <div>
              <p>Passwords don't match!</p>
            </div>
          ) : (
            <></>
          )}
        </div>
      </form>
    </div>
  );
};
