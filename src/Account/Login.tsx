import React, { Component, useState } from "react";
import { FMenu } from "../FMenu";
import { API, ACCOUNT, LOGIN } from "../JS/routeConstants";

interface LoginProps {
  handleToUpdate: (userEmail: string, isLogon: boolean) => void;
}

export const Login: React.FC<LoginProps> = ({ handleToUpdate, ...rest }) => {
  const [state, setState] = useState({
    email: "",
    password: "",
    rememberMe: false,
  });

  const LoginURI: string = `${API}/${ACCOUNT}/${LOGIN}`;

  const handleSubmit: React.MouseEventHandler<HTMLInputElement> = (event) => {
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
        console.log(res);
        handleToUpdate(res.email, res.rememberMe);
      });

    //console.log(state);
  };
  //var handleToUpdate = this.props.handleToUpdate;

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
        <input type="button" value="Log in" onClick={handleSubmit} />
      </div>
    </div>
  );
};
