import { useEffect, useState } from "react";
import Table from "../Table/";
import { getItemsForMyLinksTable } from "../../../../API";
import { Navigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../../hooks";
import { isLogon } from "../../../../Services/user";
import { useSelector } from "react-redux";
import { updateUserLinksTableData } from "../../../../Services/link";
import ClipLoader from "react-spinners/ClipLoader";
import { ITableHeadings } from "../../../../Models";

export const MyLinksPage = () => {
  const userId = useAppSelector((state) => state.user.user.userId);
  const state = useAppSelector((state) => state.link.userLinks);
  const dispatch = useAppDispatch();
  const { items, isLoaded } = state;

  const getHeadings = () => {
    // const { items } = state;
    // return Object.keys(items[0]);
    return Object({
      fullUrl: "Full Url",
      shortUrl: "Short Url",
      isPrivate: "Is Private",
    });
  };

  const isTBodyEmpty = items.length === 0 || items == null;

  useEffect(() => {
    dispatch(updateUserLinksTableData(userId));
  }, [userId, isLoaded]);

  if (!isLoaded) {
    return (
      <div>
        <ClipLoader
          size={200}
          loading={true}
          color={"#000000"}
          cssOverride={{}}
          speedMultiplier={1}
          className="loader"
        />
        {isLogon(userId) ? null : <Navigate to="/Unauthorized" />}
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
            updateTableData={updateUserLinksTableData}
          />
        )}
      </div>
    );
  }
};
