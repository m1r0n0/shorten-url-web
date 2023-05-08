import {
  addUrl,
  changeCertainLinkPrivacy,
  getItemsForMyLinksTable,
  proceedLinkDeleting,
} from "../API";
import { IUserLink, ILink } from "../Models";
import { AppDispatch } from "../Store";
import {
  handleUserLinksGettingAction,
  setIsShortLinkCreated,
  setShortUrlAction,
} from "../Store/LinkReducer";

export const createNewShortUrl =
  (state: IUserLink) => async (dispatch: AppDispatch) => {
    addUrl(state).then((res) => {
      dispatch(setShortUrlAction(res.shortUrl));
      dispatch(setIsShortLinkCreated(true));
    });
  };

export const updateUserLinksTableData =
  (userId: string) => async (dispatch: AppDispatch) => {
    if (userId !== "") {
      getItemsForMyLinksTable(userId).then((result) => {
        dispatch(handleUserLinksGettingAction(result.urlList));
      });
    }
  };

export const ChangeLinkPrivacy =
  (row: ILink, userId: string) => async (dispatch: AppDispatch) => {
    changeCertainLinkPrivacy(row, userId).then(() => {
      dispatch(updateUserLinksTableData(userId));
    });
  };

export const TurnKeyIntoTableColumnStyleName = (key: string): string => {
  switch (key) {
    case "fullUrl":
      return "tableFullUrlColumn";
    case "shortUrl":
      return "tableShortUrlColumn";
    case "isPrivate":
    case "deleteAction":
      return "tableActionColumn";
  }
  return "";
};

export const DeleteLink =
  (link: ILink, userId: string) => async (dispatch: AppDispatch) => {
    var userLink: IUserLink = { ...link, userId: userId };
    proceedLinkDeleting(userLink).then((res) => {
      dispatch(updateUserLinksTableData(userId));
    });
  };
