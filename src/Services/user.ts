import { proceedLogin } from "../API";
import { lifeTimeOfCookie } from "../JS/constants";
import { ILoginUser } from "../Models";
import { AppDispatch } from "../Store";
import {
  handleLoginFailureAction,
  handleLoginRequestAction,
  handleLoginSuccessAction,
} from "../Store/UserReducer";

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
  if (userId === undefined || userId === "") {
    return false;
  } else {
    return true;
  }
};
