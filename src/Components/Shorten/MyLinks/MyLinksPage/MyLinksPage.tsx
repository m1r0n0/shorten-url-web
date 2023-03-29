import { useEffect, useState } from "react";
import Table from "../Table/";
import { getItemsForMyLinksTable } from "../../../../API";
import { Navigate } from "react-router-dom";
import { useAppSelector } from "../../../../hooks";
import { isLogon } from "../../../../Services/user";

export const MyLinksPage = () => {
  const userID = useAppSelector((state) => state.user.user.userId);
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

  const updateTableData = () => {
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
  };

  useEffect(() => {
    updateTableData();
  }, [userID, isLoaded]);

  if (!isLoaded) {
    return isLogon(userID) ? (
      <p>Loading...</p>
    ) : (
      <Navigate to="/Unauthorized" />
    );
  } else {
    return (
      <div>
        <h1>My links</h1>
        {isTBodyEmpty() ? (
          <p>You haven't created any link yet!</p>
        ) : (
          <Table
            theadData={getHeadings()}
            tbodyData={items}
            updateTableData={updateTableData}
          />
        )}
      </div>
    );
  }
};
