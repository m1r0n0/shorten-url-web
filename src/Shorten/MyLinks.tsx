import React, { Component, useContext, useEffect, useState } from "react";
import Table from "../Table";
import { FMenu } from "../FMenu";
import { API, SHORTEN, GET_USER_LINKS } from "../JS/routeConstants";
import { UserIDContext } from "../App";

export const MyLinks = () => {
  const { userID, setUserID } = useContext(UserIDContext);
  const [state, setState] = useState({
    items: [],
    isLoaded: false,
    error: null,
  });

  const { items, isLoaded } = state;

  const getHeadings = () => {
    const { items } = state;
    console.log(items);
    return Object.keys(items[0]);
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

  //var table = Object.keys(items);
  if (!isLoaded) {
    return <p>Loading...</p>;
  } else {
    return (
      <div>
        <h1>My links</h1>
        <Table theadData={getHeadings()} tbodyData={items} />
      </div>
    );
  }
};
