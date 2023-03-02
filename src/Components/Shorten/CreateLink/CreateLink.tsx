import React, { useState, useContext } from "react";
import { addUrl } from "../../../API";
import { UserIDContext } from "../../../App";
import { API, CREATE_LINK, SHORTEN } from "../../../JS/routeConstants";

export const CreateLink = () => {
  const { userID, setUserID } = useContext(UserIDContext);
  const [state, setState] = useState({
    fullUrl: "",
    isPrivate: false,
    userId: userID,
  });
  const [shortenedLink, setShortenedLink] = useState("");

  const isAuthorized = (): boolean => {
    if (userID === undefined) {
      return false;
    } else {
      return true;
    }
  };

  const handleSubmit: React.MouseEventHandler<HTMLInputElement> = (event) => {
    addUrl(state).then((res) => {
      setShortenedLink(res.shortUrl);
    });
  };
  return (
    <div>
      <h1>Create your Short URL!</h1>
      <div className="row">
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
            </div>
          ) : (
            <></>
          )}
        </div>
        <div>
          <input type="button" value="Create" onClick={handleSubmit} />
        </div>
        <br />
        <div>
          <h3> Your shortened Url: {shortenedLink}</h3>
          <br />
        </div>
      </div>
    </div>
  );
};
