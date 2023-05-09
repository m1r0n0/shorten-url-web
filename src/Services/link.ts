import {
  addUrl,
  changeCertainLinkPrivacy,
  getItemsForMyLinksTable,
  proceedLinkDeleting,
} from "../API";
import { IUserLink, ILink } from "../Models";
import { AppDispatch } from "../Store";
import {
  hideAllDisclaimersAction,
  setIsDeletingLinkNotFoundAction,
  setIsDeletingLinkUnaccessibleAction,
  setIsLinkDeletedSuccessfullyAction,
} from "../Store/DisclaimerReducer";
import {
  handleUserLinksGettingAction,
  setIsLinkDeletingFinishedAction,
  setIsLinkDeletingRequestedAction,
  setIsShortLinkCreatedAction,
  setShortUrlAction,
} from "../Store/LinkReducer";
import { useAppSelector } from "../hooks";

export const createNewShortUrl =
  (state: IUserLink) => async (dispatch: AppDispatch) => {
    addUrl(state).then((res) => {
      dispatch(setShortUrlAction(res.shortUrl));
      dispatch(setIsShortLinkCreatedAction(true));
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
    if (link.shortUrl === "") {
      dispatch(setIsDeletingLinkNotFoundAction(true));
    } else {
      var isLinkDeletingFinished = false;
      dispatch(setIsLinkDeletingRequestedAction(true));
      var userLink: IUserLink = { ...link, userId: userId };
      await proceedLinkDeleting(userLink)
        .catch((error) => {
          if (error.message === "401") {
            dispatch(setIsDeletingLinkUnaccessibleAction(true));
          }
          if (error.message === "404") {
            dispatch(setIsDeletingLinkNotFoundAction(true));
          }
          dispatch(setIsLinkDeletingFinishedAction());
          isLinkDeletingFinished = true;
        })
        .then((res) => {
          if (userId !== "") dispatch(updateUserLinksTableData(userId));
          if (!isLinkDeletingFinished) {
            dispatch(setIsLinkDeletingFinishedAction());
            dispatch(setIsLinkDeletedSuccessfullyAction(true));
          }
        });
    }
  };
