interface IUserIdAction {
  type: string;
  payload: string;
}

const defaultState = {
  userId: "",
};

const SET_USER_ID = "SET_USER_ID";

export const UserIdReducer = (state = defaultState, action: IUserIdAction) => {
  switch (action.type) {
    case SET_USER_ID:
      return { ...state, userId: action.payload };
    default:
      return state;
  }
};

export const setUserIdAction = (payload: string) => ({
  type: SET_USER_ID,
  payload,
});
