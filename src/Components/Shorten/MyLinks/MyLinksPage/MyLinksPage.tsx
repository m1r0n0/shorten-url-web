import { useContext, useEffect, useState } from "react";
import Table from "../Table/";
import { API, SHORTEN, GET_USER_LINKS } from "../../../../JS/routeConstants";
import { UserIDContext } from "../../../../App";

export const MyLinksPage = () => {
  const { userID } = useContext(UserIDContext);
  const [state, setState] = useState({
    items: [],
    isLoaded: false,
    error: null,
  });

  const { items, isLoaded } = state;

  const getHeadings = () => {
    const { items } = state;
    return Object.keys(items[0]);
  };

  const isTBodyEmpty = () => {
    if (items.length === 0 || items == null) {
      return true;
    } else {
      return false;
    }
  };

  const getAllLinksURI: string = `${API}/${SHORTEN}/${GET_USER_LINKS}?userID=${userID}`;

  useEffect(() => {
    fetch(getAllLinksURI)
      .then((res) => res.json())
      .then(
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
  }, []);

  if (!isLoaded) {
    return <p>Loading...</p>;
  } else {
    return (
      <div>
        <h1>My links</h1>
        {isTBodyEmpty() ? (
          <p>You haven't created any link yet!</p>
        ) : (
          <Table theadData={getHeadings()} tbodyData={items} />
        )}
      </div>
    );
  }
};
