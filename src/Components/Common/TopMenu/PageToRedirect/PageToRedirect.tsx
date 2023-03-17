import { useContext } from "react";
import { useParams } from "react-router-dom";
import { proceedRedirect } from "../../../../API";
import { UserContext } from "../../../../App";

export function PageToRedirect() {
  const { userID } = useContext(UserContext);
  let params = useParams();
  let tempUserId = String(userID);
  if (userID === undefined) tempUserId = "";
  proceedRedirect(String(params.shortenedUrl), tempUserId);
  return null;
}
