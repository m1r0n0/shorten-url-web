import React, { Component } from "react";
import Cmenu from "../Cmenu";
import { API, ACCOUNT, LOGIN } from "../JS/routeConstants";

export default class Login extends Component {
  public state = {
    email: "",
    password: "",
    rememberMe: false,
  };

  //public handleToUpdate = { userEmail: "", isLogon: false };

  private LoginURI: string = `${API}/${ACCOUNT}/${LOGIN}`;

  render() {
    const handleSubmit: React.MouseEventHandler<HTMLInputElement> = (event) => {
      event.preventDefault();
      const {handleToUpdate} = this.props

      fetch(this.LoginURI, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(this.state),
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
          handleToUpdate(res)
        });

      console.log(this.state);
    };

    //var handleToUpdate = this.props.handleToUpdate;

    return (
      <div>
        <h2> Enter the app</h2>
        <div>
          <label htmlFor="email">Email</label> <br />
          <input
            value={this.state.email}
            onChange={(event) =>
              this.setState({ ...this.state, email: event.target.value })
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
              this.setState({ ...this.state, password: event.target.value })
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
              this.setState({ ...this.state, rememberMe: event.target.checked })
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
  }
}
