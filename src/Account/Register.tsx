import React, { Component } from "react";

export default class Register extends Component {
  render() {
    return (
      <div>
        <h2>Register</h2>
        <form method="post" asp-controller="Account" asp-action="Register">
          <div asp-validation-summary="ModelOnly"></div>
          <div>
            <label asp-for="Email"></label>
            <br />
            <input asp-for="Email" />
            <span asp-validation-for="Email"></span>
          </div>
          <div>
            <label asp-for="Year"></label>
            <br />
            <input
              type="date"
              id="start"
              name="trip-start"
              min="1910-01-01"
              max="2023-01-01"
              asp-for="Year"
            />
            <span asp-validation-for="Year"></span>
          </div>
          <div>
            <label asp-for="Password"></label>
            <br />
            <input asp-for="Password" />
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
