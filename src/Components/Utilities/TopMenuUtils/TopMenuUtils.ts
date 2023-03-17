import { fetchUserID } from "../../../API";
import { lifeTimeOfCookie } from "../../../JS/constants";

export const handleToLogin = (
  userEmail: string,
  rememberMe: boolean,
  setUserEmail: (email: string) => void,
  setUserID: (Id: string) => void
) => {
  setUserEmail(userEmail);
  setCookiesAndUserIDFromUserEmail(userEmail, rememberMe, setUserID);
};

const setCookiesAndUserIDFromUserEmail = (
  userEmail: string,
  rememberMe: boolean,
  setUserID: (Id: string) => void
) => {
  if (userEmail !== "") {
    fetchUserID(userEmail).then((result) => {
      setUserID(result.userID);
      if (rememberMe) {
        setLongTermUserCookies(String(result.userID));
      } else {
        setOnCloseUserCookies(String(result.userID));
      }
    });
  }

  const setLongTermUserCookies = (userID: string) => {
    document.cookie = "userID=" + userID + "; max-age=" + lifeTimeOfCookie;
  };

  const setOnCloseUserCookies = (userID: string) => {
    document.cookie = "userID=" + userID;
  };
};
