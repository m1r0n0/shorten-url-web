import { addUrl } from "../API";
import { ILink } from "../Models";
import { AppDispatch } from "../Store";
import { setShortUrlAction } from "../Store/LinkReducer";

export const createNewShortUrl =
  (state: ILink) => async (dispatch: AppDispatch) => {
    addUrl(state).then((res) => {
      dispatch(setShortUrlAction(res.shortUrl));
    });
  };
