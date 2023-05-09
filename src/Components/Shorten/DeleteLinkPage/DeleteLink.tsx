import { useEffect, useState } from "react";
import DeleteLinkDisclaimers from "./DeleteLinkDisclaimers";
import { useAppDispatch, useAppSelector } from "../../../hooks";
import { DeleteLink } from "../../../Services/link";
import { ILink } from "../../../Models";
import { hideAllDisclaimersAction } from "../../../Store/DisclaimerReducer";
import { ClipLoader } from "react-spinners";

export const DeleteLinkPage = () => {
  const dispatch = useAppDispatch();
  const userId = "";
  const [shortUrl, setShortUrl] = useState("");
  var link: ILink = {
    fullUrl: "",
    shortUrl: shortUrl,
    isPrivate: false,
  };
  const isLinkDeletingRequested = useAppSelector(
    (s) => s.link.isLinkDeletingRequested
  );

  useEffect(() => {
    dispatch(hideAllDisclaimersAction());
  }, []);

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
            {isLinkDeletingRequested ? (
              <ClipLoader
                size={75}
                loading={true}
                color={"#000000"}
                cssOverride={{}}
                speedMultiplier={1}
                className="loader"
              />
            ) : (
              <div>
                <div className="my-2">
                  <button
                    type="button"
                    className="btn btn-danger btn-lg"
                    onClick={() => dispatch(DeleteLink(link, userId))}
                  >
                    Delete
                  </button>
                </div>
                <DeleteLinkDisclaimers />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
