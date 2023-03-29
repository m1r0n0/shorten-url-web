import { useState } from "react";
import { proceedPasswordChange } from "../../../../API";
import { useAppSelector } from "../../../../hooks";
import PasswordChangedDisclaimer from "./PasswordChangedDisclaimer";

export const ChangePassword = () => {
  const userId = useAppSelector((state) => state.user.user.userId);
  const [state, setState] = useState({
    newPassword: "",
    userId: String(userId),
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
