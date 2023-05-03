import {
  addUrl,
  changeCertainLinkPrivacy,
  getItemsForMyLinksTable,
} from "../API";
import { ILink, IUserLink } from "../Models";
import { AppDispatch } from "../Store";
import {
  handleLinkPrivacyChangeAction,
  handleUserLinksGettingAction,
  setIsShortLinkCreated,
  setShortUrlAction,
} from "../Store/LinkReducer";

export const createNewShortUrl =
  (state: ILink) => async (dispatch: AppDispatch) => {
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
  (row: IUserLink, userId: string) => async (dispatch: AppDispatch) => {
    // await dispatch(handleLinkPrivacyChangeAction(row));
    changeCertainLinkPrivacy(row, userId).then(() => {
      dispatch(updateUserLinksTableData(userId));
    });
  };
