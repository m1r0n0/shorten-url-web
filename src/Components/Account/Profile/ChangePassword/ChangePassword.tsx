import { useContext, useState } from "react";
import { proceedEmailChange, proceedPasswordChange } from "../../../../API";
import { UserContext } from "../../../../App";
import PasswordChangedDisclaimer from "./PasswordChangedDisclaimer";

export const ChangePassword = () => {
  const { userID } = useContext(UserContext);
  const [state, setState] = useState({
    newPassword: "",
    userId: String(userID),
  });
  const [isPasswordChangedSuccessfully, setIsPasswordChangedSuccessfully] =
    useState(false);
  const [showPasswordChangedDisclaimer, setShowPasswordChangedDisclaimer] =
    useState(false);

  const handleSubmit = () => {
    proceedPasswordChange(state)
      .then(() => {
        setIsPasswordChangedSuccessfully(true);
        setShowPasswordChangedDisclaimer(true);
      })
      .catch(() => {
        setIsPasswordChangedSuccessfully(false);
      });
  };

  return (
    <div>
      <div>
        <label htmlFor="password">Enter new Password:</label> <br />
        <input
          value={state.newPassword}
          onChange={(event) =>
            setState({ ...state, newPassword: event.target.value })
          }
          type="password"
          name="password"
          id="password"
        />
      </div>
      <div>
        <input type="button" value="Change Password" onClick={handleSubmit} />
        {showPasswordChangedDisclaimer ? (
          <PasswordChangedDisclaimer
            isPasswordChanged={isPasswordChangedSuccessfully}
          />
        ) : null}
      </div>
    </div>
  );
};
