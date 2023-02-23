import {
  createContext,
  useContext,
  useState,
  SetStateAction,
  Dispatch,
} from "react";
import logo from "./logo.svg";
import "./App.css";
import { FMenu } from "./FMenu";

interface IUserIDContextType {
  userID: undefined;
  setUserID: Dispatch<SetStateAction<undefined>>;
}

const defaultUserIDContextValue = {
  setUserID: () => undefined,
  userID: undefined,
};
const UserIDContext = createContext<IUserIDContextType>(
  defaultUserIDContextValue
);

function App() {
  const [userID, setUserID] = useState();
  return (
    <div className="App">
      <header className="App-header">
        {/* <UserIDContext.Provider
          value={{
            userID,
            setUserID,
          }}
        >
          
        </UserIDContext.Provider> */}
        <FMenu />
      </header>
    </div>
  );
}

export default App;
