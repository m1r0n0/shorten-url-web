import React, { Component } from "react";

export default class Login extends Component {
  render() {
    function handleSubmit(event: any) {
      event.preventDefault();

      const data = new FormData(event.target);

      const value = Object.fromEntries(data.entries());

      console.log({ value });
    }

    const form = document.querySelector("form");
    // form.addEventListener("submit", handleSubmit);
    return (
      <div>
        <h2> Enter the app</h2>
        <form>
          <div asp-validation-summary="ModelOnly"></div>
          <div>
            <label htmlFor="email">Email</label> <br />
            <input type="text" name="email" id="email" />
          </div>
          <div>
            <label htmlFor="password"></label>Password <br />
            <input type="password" name="password" id="password" />
          </div>
          <div>
            <label htmlFor="rememberMe">Remember me?</label> <br />
            <input type="checkbox" name="rememberMe" id="rememberMe" />
          </div>
          <div>
            <input
              type="submit"
              value="Log in"
              onClick={form!.handleSubmit(this.setState)}
            />
          </div>
        </form>
      </div>
    );
  }
}
