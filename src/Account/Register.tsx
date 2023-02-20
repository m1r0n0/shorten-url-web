import React, { Component, useState } from "react";

export function Register() {
  const [state, setState] = useState({ email: "", password: "", year: "0" });
  const [passwordConfirm, setPasswordConfirm] = useState("");

  const handleSubmit: React.MouseEventHandler<HTMLInputElement> = (event) => {
    if (state.password === passwordConfirm) {
      console.log(state);
    } else {
      console.log("Passwords don't match");
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
            onChange={(event) => (setPasswordConfirm(event.target.value))}
            type="password"
            name="passwordConfirm"
            id="passwordConfirm"
          />
        </div>
        <br></br>
        <div>
          <input type="button" value="Register" onClick={handleSubmit} />
        </div>
      </form>
    </div>
  );
}
