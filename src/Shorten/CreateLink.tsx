import React, { Component } from "react";

export default class CreateLink extends Component {
  state = {
    fullUrl: "",
    isPrivate: false,
  };

  render() {
    const handleSubmit: React.MouseEventHandler<HTMLInputElement> = (event) => {
      console.log(this.state);
    };
    return (
      <div>
        <h1>Create your Short URL!</h1>
        <div className="row">
          <div className="col-md-4">
            <div asp-validation-summary="ModelOnly"></div>
            <div>
              <label htmlFor="FullUrl">Your Full URL: </label>
              <input
                value={this.state.fullUrl}
                onChange={(event) =>
                  this.setState({
                    ...this.state,
                    fullUrl: event.target.value,
                  })
                }
                type="text"
                name="fullUrl"
                id="fullUrl"
              />
              <span asp-validation-for="FullUrl" className="text-danger"></span>
              @if (User.Identity.IsAuthenticated)
              {
                <div>
                  <label htmlFor="IsPrivate">Private link?</label> <br />
                  <input
                    onChange={(event) =>
                      this.setState({
                        ...this.state,
                        isPrivate: event.target.checked,
                      })
                    }
                    type="checkbox"
                    name="isPrivate"
                    id="isPrivate"
                  />
                </div>
              }
            </div>
            <div>
              <input type="button" value="Log in" onClick={handleSubmit} />
            </div>
            <br />
            <div>
              <h3> Your shortened Url: @Model?.ShortUrl</h3>
              <br />
            </div>
          </div>
        </div>
      </div>
    );
  }
}
