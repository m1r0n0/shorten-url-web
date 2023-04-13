import { fetchUserEmail, proceedLogin } from "../API";
import { lifeTimeOfCookie } from "../JS/constants";
import { ILoginUser, IUser } from "../Models";
import { AppDispatch } from "../Store";
import {
  handleAppReadinessAction,
  handleLoginFailureAction,
  handleLoginRequestAction,
  handleLoginSuccessAction,
  setUserEmailAction,
  setUserIdAction,
} from "../Store/UserReducer";

const splittedCookies: string[] = document.cookie.split("; ");

export const prepareAppToLoad =
  (user: IUser) => async (dispatch: AppDispatch) => {
    setUserStateBasedOnCookies();
    if (user.userEmail !== "" || splittedCookies.at(0) === "")
      dispatch(handleAppReadinessAction());
  };

export const setUserStateBasedOnCookies =
  () => async (dispatch: AppDispatch) => {
    const setUserEmailFromUserID = (tempUserID: string) => {
      fetchUserEmail(tempUserID).then((result) => {
        dispatch(setUserEmailAction(result.newEmail));
      });
    };

    splittedCookies.forEach((cookie) => {
      if (cookie.startsWith("userID=")) {
        let tempUserID = cookie.split("=").pop()!;
        dispatch(setUserIdAction(tempUserID));
        if (!(tempUserID === undefined || tempUserID === ""))
          setUserEmailFromUserID(tempUserID);
      }
    });
  };

export const handleLogin =
  (loginData: ILoginUser) => async (dispatch: AppDispatch) => {
    dispatch(handleLoginRequestAction());
    try {
      const user = await proceedLogin(loginData);
      dispatch(handleLoginSuccessAction(user));
      if (loginData.rememberMe) {
        setLongTermUserCookies(String(user.userId));
      } else {
        setOnCloseUserCookies(String(user.userId));
      }
    } catch (error) {
      dispatch(handleLoginFailureAction(error as Error));
    }
  };

const setLongTermUserCookies = (userID: string) => {
  document.cookie = "userID=" + userID + "; max-age=" + lifeTimeOfCookie;
};

const setOnCloseUserCookies = (userID: string) => {
  document.cookie = "userID=" + userID;
};

export const isLogon = (userId: string): boolean => {
  return userId !== "";
};
