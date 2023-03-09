import { useContext, useEffect, useState } from "react";
import Table from "../Table/";
import { UserIDContext } from "../../../../App";
import { getItemsForMyLinksTable } from "../../../../API";
import { Navigate } from "react-router-dom";

export const MyLinksPage = () => {
  const { userID } = useContext(UserIDContext);
  const [state, setState] = useState({
    items: [],
    isLoaded: false,
    error: null,
  });
  const { items, isLoaded } = state;

  const isLogon = (): boolean => {
    if (userID === undefined || userID === "") {
      return false;
    } else {
      return true;
    }
  };

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

  useEffect(() => {
    if (!(userID === undefined)) {
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
  }, [userID, isLoaded]);

  if (!isLoaded) {
    return isLogon() ? <p>Loading...</p> : <Navigate to="/" />;
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
