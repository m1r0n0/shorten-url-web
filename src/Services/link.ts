import { addUrl, getItemsForMyLinksTable } from "../API";
import { ILink } from "../Models";
import { AppDispatch } from "../Store";
import { setShortUrlAction } from "../Store/LinkReducer";
import { useAppSelector } from "../hooks";

export const createNewShortUrl =
  (state: ILink) => async (dispatch: AppDispatch) => {
    addUrl(state).then((res) => {
      dispatch(setShortUrlAction(res.shortUrl));
    });
  };

export const updateTableData = () => async (dispatch: AppDispatch) => {
  const userID = useAppSelector((state) => state.user.user.userId);
  if (userID !== "") {
    getItemsForMyLinksTable(userID).then(
      (result) => {
        setState({
          items: result.urlList,
          isLoaded: true,
          error: state.error,
        });
      },
      (error) => {
        setState({
          items: state.items,
          isLoaded: true,
          error,
        });
      }
    );
  }
};
