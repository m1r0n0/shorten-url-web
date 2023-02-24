import React, { useState, useContext } from "react";
import { UserIDContext } from "../App";

export const CreateLink = () => {
  const { userID, setUserID } = useContext(UserIDContext);
  const [state, setState] = useState({
    fullUrl: "",
    isPrivate: false,
    userId: userID,
  });

  const handleSubmit: React.MouseEventHandler<HTMLInputElement> = (event) => {
    fetch("https://localhost:7161/api/Shorten/CreateLink", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(state),
    }).then(() => {
      console.log(JSON.stringify(state));
    });
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
              value={state.fullUrl}
              onChange={(event) =>
                setState({
                  ...state,
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
                    setState({
                      ...state,
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
            <input type="button" value="Create" onClick={handleSubmit} />
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
};
