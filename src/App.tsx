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
  userID: string | undefined;
  setUserID: Dispatch<SetStateAction<undefined>> | Dispatch<SetStateAction<string>>;
}

const defaultUserIDContextValue = {
  userID: undefined,
  setUserID: () => undefined,
};
export const UserIDContext = createContext<IUserIDContextType>(
  defaultUserIDContextValue
);

function App() {
  const [userID, setUserID] = useState();
  return (
    <div className="App">
      <header className="App-header">
        <UserIDContext.Provider
          value={{
            userID,
            setUserID,
          }}
        >
          <FMenu />
        </UserIDContext.Provider>
      </header>
    </div>
  );
}

export default App;
