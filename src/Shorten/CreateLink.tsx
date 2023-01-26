import React, { Component } from 'react'

export default class CreateLink extends Component {
  render() {
    return (
      <div>
        <h1>Create your Short URL!</h1>

<div className="row">
    <div className="col-md-4">
        <form method="post">
            <div asp-validation-summary="ModelOnly" className="text-danger"></div>
            <div>
                <label asp-for="FullUrl" className="control-label"></label>
                <input asp-for="FullUrl" className="form-control" />
                <span asp-validation-for="FullUrl" className="text-danger"></span>
                @if (User.Identity.IsAuthenticated)
                {
                <div>
                    <label asp-for="IsPrivate"></label> <br />
                    <input asp-for="IsPrivate" />
                </div>
                }
            </div>

            <div className="form-group">
                <input type="submit" value="Create" className="btn btn-primary" />
            </div>
            <br />
            <div>
                <h3> Your shortened Url: @Model?.ShortUrl</h3>
             <br />
            </div>
        </form>
    </div>
</div>
      </div>
    )
  }
}
