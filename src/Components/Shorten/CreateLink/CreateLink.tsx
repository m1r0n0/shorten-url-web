import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../hooks";
import { IUserLink } from "../../../Models";
import { isLogon } from "../../../Services/user";
import { createNewShortUrl } from "../../../Services/link";
import { setIsFullUrlInvalidAction } from "../../../Store/DisclaimerReducer";
import InvalidFullUrlDisclaimer from "./InvalidFullUrlDisclaimer";
import {
  setIsShortLinkCreatedAction,
  setShortUrlAction,
} from "../../../Store/LinkReducer";

export const CreateLink = () => {
  const userID = useAppSelector((state) => state.user.user.userId);
  const shortUrl = useAppSelector((state) => state.link.shortUrl);
  const isFullUrlInvalid = useAppSelector(
    (state) => state.disclaimer.isFullUrlInvalid
  );
  const dispatch = useAppDispatch();
  const [state, setState] = useState<IUserLink>({
    fullUrl: "",
    isPrivate: false,
    userId: userID,
    shortUrl: "",
  });
  const isShortLinkCreated = useAppSelector(
    (state) => state.link.isShortLinkCreated
  );

  const handleSubmit: React.MouseEventHandler<HTMLInputElement> = (event) => {
    var isFullUrlValid: boolean = state.fullUrl !== "";
    if (isFullUrlValid) {
      dispatch(createNewShortUrl(state));
    } else {
      dispatch(setShortUrlAction(""));
      dispatch(setIsShortLinkCreatedAction(false));
    }
    dispatch(setIsFullUrlInvalidAction(!isFullUrlValid));
  };

  useEffect(() => {
    setState({ ...state, shortUrl: shortUrl });
  }, [shortUrl]);

  return (
    //css flex
    <div>
      <h1>Create your Short URL!</h1>
      <div>
        <div className="mt-5">
          <label htmlFor="FullUrl"> Your Full URL: </label>
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
          {isLogon(userID) ? (
            <div>
              <label htmlFor="IsPrivate">Private link?</label>
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
          ) : null}
        </div>
        <div className="my-2">
          <input
            type="button"
            value="Create"
            className="btn btn-primary btn-lg"
            onClick={handleSubmit}
          />
        </div>
        <div className="mb-3">
          {isShortLinkCreated ? (
            <h3> Your shortened Url: {state.shortUrl}</h3>
          ) : null}
        </div>
        <div>{isFullUrlInvalid ? <InvalidFullUrlDisclaimer /> : null}</div>
      </div>
    </div>
  );
};
