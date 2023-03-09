import { createContext, useState, SetStateAction, Dispatch } from "react";
import "./App.css";
import TopMenu from "./Components/Common/TopMenu";

interface IUserIDContextType {
  userID: string | undefined;
  setUserID: Dispatch<SetStateAction<string | undefined>>;
  isLogon: () => boolean;
}

const defaultUserIDContextValue = {
  userID: undefined,
  setUserID: () => undefined,
  isLogon: () => false,
};
export const UserIDContext = createContext<IUserIDContextType>(
  defaultUserIDContextValue
);

function App() {
  const [userID, setUserID] = useState<string>();
  const isLogon = (): boolean => {
    if (userID === undefined || userID === "") {
      return false;
    } else {
      return true;
    }
  };
  return (
    <div className="App">
      <header className="App-header">
        <UserIDContext.Provider
          value={{
            userID,
            setUserID,
            isLogon,
          }}
        >
          <TopMenu />
        </UserIDContext.Provider>
      </header>
    </div>
  );
}

export default App;
