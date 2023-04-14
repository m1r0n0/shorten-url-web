import React, { useEffect, useState } from "react";
import { addUrl } from "../../../API";
import { useAppDispatch, useAppSelector } from "../../../hooks";
import { ILink } from "../../../Models";
import { isLogon } from "../../../Services/user";
import { createNewShortUrl } from "../../../Services/link";

export const CreateLink = () => {
  const userID = useAppSelector((state) => state.user.user.userId);
  const shortUrl = useAppSelector((state) => state.goal.shortUrl);
  const dispatch = useAppDispatch();
  const [state, setState] = useState<ILink>({
    fullUrl: "",
    isPrivate: false,
    userId: userID,
    shortUrl: "",
  });

   const handleSubmit: React.MouseEventHandler<HTMLInputElement> = (event) => {
    dispatch(createNewShortUrl(state));
  };

  useEffect(() => {
    setState({ ...state, shortUrl: shortUrl });
  }, [shortUrl]);

  return (
    //css flex
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
          {isLogon(userID) ? (
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
