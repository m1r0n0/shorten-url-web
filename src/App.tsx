import "./App.css";
import { Routers } from "./Components/Utilities/Routers/Routers";
import { ClipLoader } from "react-spinners";
import { useAppDispatch, useAppSelector } from "./hooks";
import { useEffect } from "react";
import { fetchUserEmail } from "./API";
import {
  setUserIdAction,
  setUserEmailAction,
  handleAppReadinessAction,
} from "./Store/UserReducer";

function App() {
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.user.user);
  const isAppLoaded = useAppSelector((state) => state.user.isAppLoaded);
  const splittedCookies: string[] = document.cookie.split("; ");

  const settingStateBasedOnCookies = () => {
    splittedCookies.forEach((cookie) => {
      if (cookie.startsWith("userID=")) {
        let tempUserID = cookie.split("=").pop()!;
        dispatch(setUserIdAction(tempUserID));
        if (!(tempUserID === undefined || tempUserID === ""))
          setUserEmailFromUserID(tempUserID);
      }
    });
  };

  const setUserEmailFromUserID = (tempUserID: string) => {
    fetchUserEmail(tempUserID).then((result) => {
      dispatch(setUserEmailAction(result.newEmail));
    });
  };

  useEffect(() => {
    settingStateBasedOnCookies();
    if (user.userEmail !== "" && user.userEmail !== "")
      dispatch(handleAppReadinessAction());
  }, [user.userId, user.userEmail]);

  return (
    <body>
      {isAppLoaded ? (
        <div className="App">
          <Routers />
        </div>
      ) : (
        <ClipLoader
          size={300}
          loading={true}
          color={"#000000"}
          cssOverride={{}}
          speedMultiplier={1}
        />
      )}
    </body>
  );
}

export default App;
