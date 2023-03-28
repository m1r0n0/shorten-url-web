import { Reducer } from "redux";
import { ILoginUserResponse } from "../Models";

const SET_USER_ID = "SET_USER_ID";
const SET_USER_EMAIL = "SET_USER_EMAIL";
const HANDLE_LOGIN_REQUEST = "HANDLE_LOGIN_REQUEST";
const HANDLE_LOGIN_SUCCESS = "HANDLE_LOGIN_SUCCESS";
const HANDLE_LOGIN_FAILURE = "HANDLE_LOGIN_FAILURE";

interface IUserAction {
  type: string;
  payload: ILoginUserResponse | string | Error;
}

interface UserState {
  user: {
    userId: string;
    userEmail: string;
  };
  isLoginRequested: boolean;
  isLoginSuccessful: boolean;
  isLoginFinished: boolean;
}

const defaultState: UserState = {
  user: { userId: "", userEmail: "" },
  isLoginRequested: false,
  isLoginSuccessful: false,
  isLoginFinished: false,
};

export const userReducer: Reducer<UserState, IUserAction> = (
  state = defaultState,
  action: IUserAction
) => {
  let loginUser: ILoginUserResponse = action.payload as ILoginUserResponse;
  switch (action.type) {
    case SET_USER_ID:
      return {
        ...state,
        user: { ...state.user, userId: action.payload as string },
      };
    case SET_USER_EMAIL:
      return {
        ...state,
        user: { ...state.user, userEmail: action.payload as string },
      };
    case HANDLE_LOGIN_REQUEST:
      return { ...state, isLoginRequested: true };
    case HANDLE_LOGIN_SUCCESS:
      return {
        ...state,
        user: { userId: loginUser.userId, userEmail: loginUser.email },
        isLoginSuccessful: true,
        isLoginFinished: true,
      };
    case HANDLE_LOGIN_FAILURE:
      return {
        ...state,
        isLoginSuccessful: false,
      };
    default:
      return state;
  }
};

export const setUserIdAction = (payload: string) => ({
  type: SET_USER_ID,
  payload,
});

export const setUserEmailAction = (payload: string) => ({
  type: SET_USER_EMAIL,
  payload,
});

export const handleLoginRequestAction = () => ({
  type: HANDLE_LOGIN_REQUEST,
});

export const handleLoginSuccessAction = (payload: ILoginUserResponse) => ({
  type: HANDLE_LOGIN_SUCCESS,
  payload,
});

export const handleLoginFailureAction = (payload: Error) => ({
  type: HANDLE_LOGIN_FAILURE,
  payload,
});
