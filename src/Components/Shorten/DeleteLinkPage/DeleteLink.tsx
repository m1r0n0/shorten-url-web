import { useState } from "react";
import DeleteLinkDisclaimers from "./DeleteLinkDisclaimers";
import { useAppDispatch, useAppSelector } from "../../../hooks";
import { DeleteLink } from "../../../Services/link";
import { ILink } from "../../../Models";

export const DeleteLinkPage = () => {
  const dispatch = useAppDispatch();
  const userId = "";
  const [shortUrl, setShortUrl] = useState("");
  var link: ILink = {
    fullUrl: "",
    shortUrl: shortUrl,
    isPrivate: false,
  };
  
  return (
    <div>
      <h1>Delete your Short URL</h1>
      <div>
        <div className="mt-5">
          <label htmlFor="FullUrl"> Your Short URL: </label>
          <input
            value={shortUrl}
            onChange={(event) => setShortUrl(event.target.value)}
            type="text"
            name="shortUrl"
            id="shortUrl"
          />
          <div>
            <button
              type="button"
              className="btn btn-danger"
              onClick={() => dispatch(DeleteLink(link, userId))}
            >
              Delete
            </button>
          </div>
          <DeleteLinkDisclaimers />
        </div>
      </div>
    </div>
  );
};
