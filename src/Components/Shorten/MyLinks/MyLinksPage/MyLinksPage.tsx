import { useEffect } from "react";
import Table from "../Table/";
import { Navigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../../hooks";
import { isLogon } from "../../../../Services/user";
import { updateUserLinksTableData } from "../../../../Services/link";
import ClipLoader from "react-spinners/ClipLoader";

export const MyLinksPage = () => {
  const userId = useAppSelector((state) => state.user.user.userId);
  const state = useAppSelector((state) => state.link.userLinks);
  const dispatch = useAppDispatch();
  const { items, isLoaded } = state;

  const getKeys = () => {
    const { items } = state;
    var keys = Object.keys(items[0]);
    keys.push("deleteAction")
    return keys;
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
          <Table tKeys={getKeys()} tbodyData={items} />
        )}
      </div>
    );
  }
};
