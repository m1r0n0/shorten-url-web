import { Reducer } from "redux";
import { IUserLinks } from "../Models";

interface ILinkAction {
  type: string;
  payload: string | IUserLinks;
}

interface LinkState {
  shortUrl: string;
  userLinks: { items: IUserLinks[]; isLoaded: boolean; error: null };
}

const defaultState: LinkState = {
  shortUrl: "",
  userLinks: { items: [], isLoaded: false, error: null },
};

const SET_SHORT_URL = "SET_SHORT_URL";
const END_CREATION_OF_SHORT_URL = "END_CREATION_OF_SHORT_URL";
const HANDLE_USER_LINKS_GETTING = "HANDLE_USER_LINKS_GETTING";

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
    case HANDLE_USER_LINKS_GETTING:
      return {
        ...state,
        userLinks: { ...state, items: action.payload, isLoaded: true },
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
export const handleUserLinksGettingAction = (payload: IUserLinks) => ({
  type: HANDLE_USER_LINKS_GETTING,
  payload,
});
