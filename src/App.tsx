import "./App.css";
import { Routers } from "./Components/Utilities/Routers/Routers";
import { ClipLoader } from "react-spinners";
import { useAppDispatch, useAppSelector } from "./hooks";
import { prepareAppToLoad } from "./Services/user";

function App() {
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.user.user);
  const isAppLoaded = useAppSelector((state) => state.user.isAppLoaded);

  dispatch(prepareAppToLoad(user));

  return (
    <div>
      {isAppLoaded ? (
        <div className="App">
          <Routers />
        </div>
      ) : (
        <div className="container">
          <ClipLoader
            size={300}
            loading={true}
            color={"#000000"}
            cssOverride={{}}
            speedMultiplier={1}
            className="loader"
          />
        </div>
      )}
    </div>
  );
}

export default App;
