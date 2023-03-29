import { useParams } from "react-router-dom";
import { proceedRedirect } from "../../../../API";
import { useAppSelector } from "../../../../hooks";

export function PageToRedirect() {
  const userID = useAppSelector((state) => state.user.user.userId);
  let params = useParams();
  let tempUserId = String(userID);
  if (userID === undefined) tempUserId = "";
  proceedRedirect(String(params.shortenedUrl), tempUserId);
  return null;
}
