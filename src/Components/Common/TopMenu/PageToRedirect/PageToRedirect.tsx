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
    <ClipLoader
      size={500}
      loading={true}
      color={"#000000"}
      cssOverride={{}}
      speedMultiplier={1}
      className="loader"
    />
  );
}
