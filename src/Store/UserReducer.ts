import { ILoginUser } from "../Models";

interface IUserAction {
  type: string;
  payload: ILoginUser | string | Error;
}

const defaultState = {
  user: { userId: "", userEmail: "" },
  isLoginRequested: false,
  isLoginSuccessful: false,
};

const SET_USER_ID = "SET_USER_ID";
const SET_USER_EMAIL = "SET_USER_EMAIL";
const HANDLE_LOGIN_REQUEST = "HANDLE_LOGIN_REQUEST";
const HANDLE_LOGIN_SUCCESS = "HANDLE_LOGIN_SUCCESS";
const HANDLE_LOGIN_FAILURE = "HANDLE_LOGIN_FAILURE";

export const userReducer = (state = defaultState, action: IUserAction) => {
  switch (action.type) {
    case SET_USER_ID:
      return { ...state, userId: action.payload };
    case SET_USER_EMAIL:
      return { ...state, userEmail: action.payload };
    case HANDLE_LOGIN_REQUEST:
      return { ...state, isLoginRequested: true };
    case HANDLE_LOGIN_SUCCESS:
      return {
        ...state,
        user: { userId: action.payload.userId, email: action.payload.email },
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

export const handleLoginSuccessAction = (payload: ILoginUser) => ({
  type: HANDLE_LOGIN_SUCCESS,
  payload,
});

export const handleLoginFailureAction = (payload: Error) => ({
  type: HANDLE_LOGIN_FAILURE,
  payload,
});
