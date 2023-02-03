import React, { Component } from "react";

export default class Register extends Component {
  state = {
    email: "",
    password: "",
    year: 0,
  };

  render() {
    return (
      <div>
        <h2>Register</h2>
        <form method="post" asp-controller="Account" asp-action="Register">
          <div asp-validation-summary="ModelOnly"></div>
          <div>
            <label htmlFor="Email">Email</label>
            <br />
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
            <label htmlFor="Year">Year of birth</label>
            <br />
            <input
              type="date"
              id="year"
              name="year"
              min="1910-01-01"
              max="2023-01-01"
              asp-for="Year"
              value={this.state.year}
              onChange={(event) =>
                this.setState({ ...this.state, year: event.target.value })
              }
            />
          </div>
          <div>
            <label htmlFor="Password">Password</label>
            <br />
            <input
              onChange={(event) =>
                this.setState({ ...this.state, password: event.target.value })
              }
              type="password"
              name="password"
              id="password"
            />
            <span asp-validation-for="Password"></span>
          </div>
          <div>
            <label asp-for="PasswordConfirm"></label>
            <br />
            <input asp-for="PasswordConfirm" />
            <span asp-validation-for="PasswordConfirm"></span>
          </div>
          <div>
            <input type="submit" value="Register" />
          </div>
        </form>
      </div>
    );
  }
}
