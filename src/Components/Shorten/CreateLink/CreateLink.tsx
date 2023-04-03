import React, { useState } from "react";
import { addUrl } from "../../../API";
import { useAppSelector } from "../../../hooks";

export const CreateLink = () => {
  const userID = useAppSelector((state) => state.user.user.userId);
  const [state, setState] = useState({
    fullUrl: "",
    isPrivate: false,
    userId: userID,
    shortUrl: "",
  });

  const isAuthorized = (): boolean => {
    if (userID === undefined) {
      return false;
    } else {
      return true;
    }
  };

  const handleSubmit: React.MouseEventHandler<HTMLInputElement> = (event) => {
    addUrl(state).then((res) => {
      setState({
        fullUrl: state.fullUrl,
        isPrivate: state.isPrivate,
        userId: userID,
        shortUrl: res.shortUrl,
      });
    });
  };

  return (
    <div>
      <h1>Create your Short URL!</h1>
      <br />
      <div className="row">
        <div>
          <label htmlFor="FullUrl"> Your Full URL: </label>
          <br />
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
          <br />
          <br />
          {isAuthorized() ? (
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
              <br />
              <br />
            </div>
          ) : (
            <></>
          )}
        </div>
        <br />
        <div>
          <input type="button" value="Create" onClick={handleSubmit} />
        </div>
        <br />
        <br />
        <div>
          <h3> Your shortened Url: {state.shortUrl}</h3>
          <br />
        </div>
      </div>
    </div>
  );
};
