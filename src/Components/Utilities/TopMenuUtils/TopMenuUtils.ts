import { fetchUserID } from "../../../API";
import { useAppDispatch } from "../../../hooks";
import { lifeTimeOfCookie } from "../../../JS/constants";
import { IUserEmailAction } from "../../../Store/UserEmailReducer";

export const isLogon = (userId: string): boolean => {
  if (userId === undefined || userId === "") {
    return false;
  } else {
    return true;
  }
};

'export const handleToLogin = (
  userEmail: string,
  rememberMe: boolean,
  setUserEmail: (userEmail: string),
  setUserID: (Id: string) => void
) => {
  setUserEmail(userEmail);
  setCookiesAndUserIDFromUserEmail(userEmail, rememberMe, setUserID);
};'

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
