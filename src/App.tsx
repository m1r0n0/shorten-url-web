import { createContext, useState, SetStateAction, Dispatch } from "react";
import "./App.css";
import TopMenu from "./Components/Common/TopMenu";
import { Routers } from "./Components/Utilities/Routers/Routers";

interface IUserContextType {
  userID: string | undefined;
  setUserID: Dispatch<SetStateAction<string | undefined>>;
  userEmail: string | undefined;
  setUserEmail: Dispatch<SetStateAction<string>>;
  isLogon: () => boolean;
}

const defaultUserContextValue = {
  userID: undefined,
  setUserID: () => undefined,
  userEmail: "",
  setUserEmail: () => "",
  isLogon: () => false,
};
export const UserContext = createContext<IUserContextType>(
  defaultUserContextValue
);

function App() {
  const [userID, setUserID] = useState<string>();
  const [userEmail, setUserEmail] = useState<string>("");
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
        <UserContext.Provider
          value={{
            userID,
            setUserID,
            userEmail,
            setUserEmail,
            isLogon,
          }}
        >
          {/* <TopMenu /> */}
          <Routers />
        </UserContext.Provider>
      </header>
    </div>
  );
}

export default App;
