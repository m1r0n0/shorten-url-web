import { useParams } from "react-router-dom";
import { proceedRedirect } from "../../../../API";
import { useAppSelector } from "../../../../hooks";
import ClipLoader from "react-spinners/ClipLoader";

export function PageToRedirect() {
  const userID = useAppSelector((state) => state.user.user.userId);
  let params = useParams();
  let tempUserId = String(userID);
  if (userID === undefined) tempUserId = "";
  proceedRedirect(String(params.shortenedUrl), tempUserId);
  return (
    <div className="d-flex align-items-center justify-content-center">
      <ClipLoader
        size={300}
        loading={true}
        color={"#000000"}
        cssOverride={{}}
        speedMultiplier={1}
        className="loader"
      />
    </div>
  );
}
