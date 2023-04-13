import { Reducer } from "redux";

interface IGoalAction {
  type: string;
  payload: string;
}

interface GoalState {
  shortUrl: string;
}

const defaultState: GoalState = {
  shortUrl: "",
};

const SET_SHORT_URL: string = "SET_SHORT_URL";

export const userReducer: Reducer<GoalState, IGoalAction> = (
  state = defaultState,
  action: IGoalAction
) => {
  switch (action.type) {
    case SET_SHORT_URL:
      return { ...state, shortUrl: action.payload };
    default:
      return state;
  }
};

export const setShortUrlAction = (payload: string) => ({
  type: SET_SHORT_URL,
  payload,
});
