import { fetchUserEmail, proceedLogin, proceedRegister } from "../API";
import { lifeTimeOfCookie } from "../JS/constants";
import { ILoginUser, IRegisterUser, IUser } from "../Models";
import { AppDispatch } from "../Store";
import {
  setIsEmailSuitableAction,
  setIsInvalidPasswordInputAction,
  setIsExistingEmailAction,
  hideAllDisclaimersAction,
} from "../Store/DisclaimerReducer";
import {
  handleAppReadinessAction,
  handleEmailRequestAction,
  handleLoginFailureAction,
  handleLoginRequestAction,
  handleLoginSuccessAction,
  handleRegisterSuccessAction,
  setUserEmailAction,
  setUserIdAction,
} from "../Store/UserReducer";
import { useAppSelector } from "../hooks";

const splittedCookies: string[] = document.cookie.split("; ");

export const prepareAppToLoad =
  (user: IUser) => async (dispatch: AppDispatch) => {
    await dispatch(setUserStateBasedOnCookies());
    if (user.userEmail !== "" || splittedCookies.at(0) === "")
      dispatch(handleAppReadinessAction());
  };

export const setUserStateBasedOnCookies =
  () => async (dispatch: AppDispatch) => {
    const isUserEmailRequested = useAppSelector(
      (state) => state.user.isUserEmailRequested
    );
    if (!isUserEmailRequested) {
      splittedCookies.forEach((cookie) => {
        if (cookie.startsWith("userID=")) {
          let tempUserID = cookie.split("=").pop()!;
          dispatch(setUserIdAction(tempUserID));
          if (!(tempUserID === undefined || tempUserID === "")) {
            dispatch(handleEmailRequestAction());
            fetchUserEmail(tempUserID).then((result) => {
              dispatch(setUserEmailAction(result.newEmail));
            });
          }
        }
      });
    }
  };

export const handleRegister =
  (properState: IRegisterUser, isEmailSuitable: boolean) =>
  async (dispatch: AppDispatch) => {
    await proceedRegister(properState)
      .catch((error) => {
        //isEmailSuitable = error.message !== "409";
        dispatch(setIsEmailSuitableAction(error.message !== "409"));
        if (isEmailSuitable) dispatch(setIsInvalidPasswordInputAction(true));
        //setShowInvalidPasswordInputDisclaimer(true);
        dispatch(setIsExistingEmailAction(!isEmailSuitable));
        //setShowExistingEmailDisclaimer(!isEmailSuitable);
      })
      .then((res) => {
        if (isEmailSuitable) {
          const user: ILoginUser = {
            email: res.email,
            password: res.password,
            rememberMe: true,
          };
          dispatch(handleLogin(user));
          dispatch(handleRegisterSuccessAction());
          //setIsReadyToRedirect(true);
          dispatch(hideAllDisclaimersAction());
          //HideDisclaimers();
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
