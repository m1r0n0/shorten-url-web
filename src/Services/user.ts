import { proceedLogin } from "../API";
import { useAppDispatch } from "../hooks";
import { lifeTimeOfCookie } from "../JS/constants";
import { ILoginUser } from "../Models";
import { AppDispatch } from "../Store";
import {
  handleLoginFailureAction,
  handleLoginRequestAction,
  handleLoginSuccessAction,
} from "../Store/UserReducer";

export {};

export const handleLogin =
  (loginData: ILoginUser) => async (dispatch: AppDispatch) => {
    dispatch(handleLoginRequestAction());
    try {
      const user = await proceedLogin(loginData);
      dispatch(handleLoginSuccessAction(user));
      if (loginData.rememberMe) {
        setLongTermUserCookies(String(user.userID));
      } else {
        setOnCloseUserCookies(String(user.userID));
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
