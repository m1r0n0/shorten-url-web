import { Reducer } from "redux";

interface ILinkAction {
  type: string;
  payload: string;
}

interface LinkState {
  shortUrl: string;
}

const defaultState: LinkState = {
  shortUrl: "",
};

const SET_SHORT_URL: string = "SET_SHORT_URL";
const END_CREATION_OF_SHORT_URL: string = "END_CREATION_OF_SHORT_URL";

export const linkReducer: Reducer<LinkState, ILinkAction> = (
  state = defaultState,
  action: ILinkAction
) => {
  switch (action.type) {
    case SET_SHORT_URL:
      return {
        ...state,
        shortUrl: action.payload,
      };
    default:
      return state;
  }
};

export const setShortUrlAction = (payload: string) => ({
  type: SET_SHORT_URL,
  payload,
});

export const endCreationOfShortUrlAction = () => ({
  type: END_CREATION_OF_SHORT_URL,
});
