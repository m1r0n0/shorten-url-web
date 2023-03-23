export interface IUserEmailAction {
  type: string;
  payload: string;
}

const defaultState = {
  userEmail: "",
};

const SET_USER_EMAIL = "SET_USER_EMAIL";

export const userEmailReducer = (
  state = defaultState,
  action: IUserEmailAction
) => {
  switch (action.type) {
    case SET_USER_EMAIL:
      return { ...state, userEmail: action.payload };
    default:
      return state;
  }
};

export const setUserEmailAction = (payload: string) => ({
  type: SET_USER_EMAIL,
  payload,
});
