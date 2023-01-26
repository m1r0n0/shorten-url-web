import React, { Component } from "react";

export default class Login extends Component {
  render() {
    return (
      <div>
        <h2> Enter the app</h2>
        <form
          method="post"
          asp-controller="Account"
          asp-action="Login"
          asp-route-returnUrl="@Model.ReturnUrl"
        >
          <div asp-validation-summary="ModelOnly"></div>
          <div>
            <label asp-for="Email"></label> <br />
            <input asp-for="Email" />
            <span asp-validation-for="Email"></span>
          </div>
          <div>
            <label asp-for="Password"></label> <br />
            <input asp-for="Password" />
            <span asp-validation-for="Password"></span>
          </div>
          <div>
            <label asp-for="RememberMe"></label> <br />
            <input asp-for="RememberMe" />
          </div>
          <div>
            <input type="submit" value="Log in" />
          </div>
        </form>
      </div>
    );
  }
}
