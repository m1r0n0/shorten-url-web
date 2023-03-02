import { createContext, useState, SetStateAction, Dispatch } from "react";
import "./App.css";
import TopMenu from "./Components/Common/TopMenu";

interface IUserIDContextType {
  userID: string | undefined;
  setUserID: Dispatch<SetStateAction<string | undefined>>;
}

const defaultUserIDContextValue = {
  userID: undefined,
  setUserID: () => undefined,
};
export const UserIDContext = createContext<IUserIDContextType>(
  defaultUserIDContextValue
);

function App() {
  const [userID, setUserID] = useState<string>();
  return (
    <div className="App">
      <header className="App-header">
        <UserIDContext.Provider
          value={{
            userID,
            setUserID,
          }}
        >
          <TopMenu />
        </UserIDContext.Provider>
      </header>
    </div>
  );
}

export default App;
