import React, { Component } from "react";

export default class Login extends Component {
  state = {
    email: "",
    password: "",
    rememberMe: false,
  };

  render() {
    const handleSubmit: React.MouseEventHandler<HTMLInputElement> = (event) => {
      // this.state.setState({...this.state, rememberMe: event.target.value === 'on'}) ;

      console.log(this.state);
    };
    return (
      <div>
        <h2> Enter the app</h2>
        <div asp-validation-summary="ModelOnly"></div>
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
            // onClick={handleSubmit}
          />
        </div>
        <div>
          <input type="button" value="Log in" onClick={handleSubmit} />
        </div>
      </div>
    );
  }
}
