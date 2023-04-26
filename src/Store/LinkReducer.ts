import { Reducer } from "redux";
import { IUserLinks } from "../Models";

interface ILinkAction {
  type: string;
  payload: string | IUserLinks;
}

interface ILinkState {
  shortUrl: string;
  userLinks: { items: IUserLinks; isLoaded: boolean };
}

const defaultState: ILinkState = {
  shortUrl: "",
  userLinks: { items: [], isLoaded: false },
};

const SET_SHORT_URL = "SET_SHORT_URL";
const END_CREATION_OF_SHORT_URL = "END_CREATION_OF_SHORT_URL";
const HANDLE_USER_LINKS_GETTING = "HANDLE_USER_LINKS_GETTING";
const HANDLE_LINK_PRIVACY_CHANGING = "HANDLE_LINK_PRIVACY_CHANGING";

export const linkReducer: Reducer<ILinkState, ILinkAction> = (
  state: ILinkState = defaultState,
  action: ILinkAction
) => {
  switch (action.type) {
    case SET_SHORT_URL:
      return {
        ...state,
        shortUrl: action.payload as string,
      };
    case HANDLE_USER_LINKS_GETTING:
      return {
        ...state,
        userLinks: {
          ...state.userLinks,
          items: action.payload as IUserLinks,
          isLoaded: true,
        },
      };
      case HANDLE_LINK_PRIVACY_CHANGING:
        var items = state.userLinks.items;
        items.find(element => element.shortUrl === action.payload)
        return{...state, userLinks:{...state.userLinks, items: }}
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
export const changeCertainLinkPrivacyAction = (payload: IUserLinks) => ({
  type: HANDLE_LINK_PRIVACY_CHANGING,
  payload,
});
