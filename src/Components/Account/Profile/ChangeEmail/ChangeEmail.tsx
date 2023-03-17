import { useContext, useState } from "react";
import { proceedEmailChange } from "../../../../API";
import { UserContext } from "../../../../App";
import EmailChangedDisclaimer from "./EmailChangedDisclaimer";

export const ChangeEmail = () => {
  const { userID, setUserEmail } = useContext(UserContext);
  const [state, setState] = useState({
    newEmail: "",
    userId: String(userID),
  });
  const [isEmailChangedSuccessfully, setIsEmailChangedSuccessfully] =
    useState(false);
  const [showEmailChangedDisclaimer, setShowEmailChangedDisclaimer] =
    useState(false);

  const handleSubmit = () => {
    proceedEmailChange(state)
      .catch(() => {
        setIsEmailChangedSuccessfully(false);
      })
      .then((response) => {
        if (response.newEmail !== null) {
          setUserEmail(response.newEmail);
          setIsEmailChangedSuccessfully(true);
        }
        setShowEmailChangedDisclaimer(true);
      });
  };

  return (
    <div>
      <div>
        <label htmlFor="email">Enter new Email:</label> <br />
        <input
          value={state.newEmail}
          onChange={(event) =>
            setState({ ...state, newEmail: event.target.value })
          }
          type="text"
          name="email"
          id="email"
        />
      </div>
      <div>
        <input type="button" value="Change Email" onClick={handleSubmit} />
        {showEmailChangedDisclaimer ? (
          <EmailChangedDisclaimer isEmailChanged={isEmailChangedSuccessfully} />
        ) : null}
      </div>
    </div>
  );
};
