import { Reducer } from "redux";
import { ILink, ILinks } from "../Models";

interface ILinkAction {
  type: string;
  payload: string | ILinks | ILink | boolean;
}

interface ILinkState {
  shortUrl: string;
  userLinks: { items: ILinks; isLoaded: boolean };
  isShortLinkCreated: boolean;
  isLinkDeletingRequested: boolean;
  isLinkDeletingFinished: boolean;
}

const defaultState: ILinkState = {
  shortUrl: "",
  userLinks: { items: [], isLoaded: false },
  isShortLinkCreated: false,
  isLinkDeletingRequested: false,
  isLinkDeletingFinished: false,
};

const SET_SHORT_URL = "SET_SHORT_URL";
const HANDLE_USER_LINKS_GETTING = "HANDLE_USER_LINKS_GETTING";
const HANDLE_LINK_PRIVACY_CHANGING = "HANDLE_LINK_PRIVACY_CHANGING";
const SET_IS_SHORT_LINK_CREATED = "SET_IS_SHORT_LINK_CREATED";
const SET_IS_LINK_DELETING_REQUESTED = "SET_IS_LINK_DELETING_REQUESTED";
const SET_IS_LINK_DELETING_FINISHED = "SET_IS_LINK_DELETING_FINISHED";

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
          items: action.payload as ILinks,
          isLoaded: true,
        },
      };
    case HANDLE_LINK_PRIVACY_CHANGING:
      var link = action.payload as ILink;
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
    case SET_IS_LINK_DELETING_REQUESTED:
      return { ...state, isLinkDeletingRequested: action.payload as boolean };
    case SET_IS_LINK_DELETING_FINISHED:
      return {
        ...state,
        isLinkDeletingRequested: false,
        isLinkDeletingFinished: true,
      };
    default:
      return state;
  }
};

export const setShortUrlAction = (payload: string) => ({
  type: SET_SHORT_URL,
  payload,
});
export const handleUserLinksGettingAction = (payload: ILinks) => ({
  type: HANDLE_USER_LINKS_GETTING,
  payload,
});
export const handleLinkPrivacyChangeAction = (payload: ILink) => ({
  type: HANDLE_LINK_PRIVACY_CHANGING,
  payload,
});
export const setIsShortLinkCreatedAction = (payload: boolean) => ({
  type: SET_IS_SHORT_LINK_CREATED,
  payload,
});
export const setIsLinkDeletingRequestedAction = (payload: boolean) => ({
  type: SET_IS_LINK_DELETING_REQUESTED,
  payload,
});
export const setIsLinkDeletingFinishedAction = () => ({
  type: SET_IS_LINK_DELETING_FINISHED,
});
