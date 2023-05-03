import { Reducer } from "redux";
import { IUserLink, IUserLinks } from "../Models";

interface ILinkAction {
  type: string;
  payload: string | IUserLinks | IUserLink | boolean;
}

interface ILinkState {
  shortUrl: string;
  userLinks: { items: IUserLinks; isLoaded: boolean };
  isShortLinkCreated: boolean;
}

const defaultState: ILinkState = {
  shortUrl: "",
  userLinks: { items: [], isLoaded: false },
  isShortLinkCreated: false,
};

const SET_SHORT_URL = "SET_SHORT_URL";
const HANDLE_USER_LINKS_GETTING = "HANDLE_USER_LINKS_GETTING";
const HANDLE_LINK_PRIVACY_CHANGING = "HANDLE_LINK_PRIVACY_CHANGING";
const SET_IS_SHORT_LINK_CREATED = "SET_IS_SHORT_LINK_CREATED";

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
      var link = action.payload as IUserLink;
      var changingLinkIndexInItems = state.userLinks.items.findIndex(
        (element) => element.shortUrl === link.shortUrl
      );
      var updatedItems = state.userLinks.items;
      // updatedItems[changingLinkIndexInItems].isPrivate =
      //   !updatedItems[changingLinkIndexInItems].isPrivate;
      return {
        ...state,
        userLinks: { ...state.userLinks, items: [...updatedItems] },
      };
    case SET_IS_SHORT_LINK_CREATED:
      return { ...state, isShortLinkCreated: action.payload as boolean };
    default:
      return state;
  }
};

export const setShortUrlAction = (payload: string) => ({
  type: SET_SHORT_URL,
  payload,
});
export const handleUserLinksGettingAction = (payload: IUserLinks) => ({
  type: HANDLE_USER_LINKS_GETTING,
  payload,
});
export const handleLinkPrivacyChangeAction = (payload: IUserLink) => ({
  type: HANDLE_LINK_PRIVACY_CHANGING,
  payload,
});
export const setIsShortLinkCreated = (payload: boolean) => ({
  type: SET_IS_SHORT_LINK_CREATED,
  payload,
});
