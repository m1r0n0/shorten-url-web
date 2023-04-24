import { useEffect, useState } from "react";
import Table from "../Table/";
import { getItemsForMyLinksTable } from "../../../../API";
import { Navigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../../hooks";
import { isLogon } from "../../../../Services/user";
import { useSelector } from "react-redux";
import { updateTableData } from "../../../../Services/link";

export const MyLinksPage = () => {
  const userID = useAppSelector((state) => state.user.user.userId);
  const state = useAppSelector(state => state.link.userLinks);
  const dispatch = useAppDispatch();
  const { items, isLoaded } = state;

  const getHeadings = () => {
    const { items } = state;
    return Object.keys(items[0]);
  };


  const isTBodyEmpty = items.length === 0 || items == null;

  

  useEffect(() => {
    dispatch(updateTableData());
  }, [userID, isLoaded]);

  if (!isLoaded) {
    return (
      <div>
        <p>Loading...</p>
        {isLogon(userID) ? null : <Navigate to="/Unauthorized" />}
      </div>
    );
  } else {
    return (
      <div>
        <h1>My links</h1>
        {isTBodyEmpty ? (
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
