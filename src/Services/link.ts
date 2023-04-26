import {
  addUrl,
  changeCertainLinkPrivacy,
  getItemsForMyLinksTable,
} from "../API";
import { ILink, IUserLink } from "../Models";
import { AppDispatch } from "../Store";
import {
  handleUserLinksGettingAction,
  setShortUrlAction,
} from "../Store/LinkReducer";
import { useAppSelector } from "../hooks";

export const createNewShortUrl =
  (state: ILink) => async (dispatch: AppDispatch) => {
    addUrl(state).then((res) => {
      dispatch(setShortUrlAction(res.shortUrl));
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
    
    changeCertainLinkPrivacy(row, userId).then(() => {
      dispatch(updateUserLinksTableData(userId));
    });
  };
