import { useAppSelector } from "../../../../hooks";
import ExistingEmailDisclaimer from "./ExistingEmailDisclaimer";
import IncorrectDateOfBirthDisclaimer from "./IncorrectDateOfBirthDisclaimer";
import InvalidEmailDisclaimer from "./InvalidEmailDisclaimer";
import InvalidPasswordInputDisclaimer from "./InvalidPasswordInputDisclaimer";
import NoMatchingPasswordsDisclaimer from "./NoMatchingPasswordsDisclaimer";

export const Disclaimers = () => {
  const showExistingEmailDisclaimer = useAppSelector(
    (state) => state.disclaimer.isExistingEmail
  );
  const showIncorrectDateOfBirth = useAppSelector(
    (state) => state.disclaimer.isIncorrectDateOfBirth
  );
  const showInvalidEmailDisclaimer = useAppSelector(
    (state) => state.disclaimer.isInvalidEmail
  );
  const showInvalidPasswordInputDisclaimer = useAppSelector(
    (state) => state.disclaimer.isInvalidPasswordInput
  );
  const showNoMatchingPasswordsDisclaimer = useAppSelector(
    (state) => state.disclaimer.isNoMatchingPasswords
  );

  return (
    <div className="d-flex justify-content-center">
      <div>
        {showNoMatchingPasswordsDisclaimer ? (
          <NoMatchingPasswordsDisclaimer />
        ) : null}
      </div>
      <div>
        {showExistingEmailDisclaimer ? <ExistingEmailDisclaimer /> : null}
        {showInvalidEmailDisclaimer ? <InvalidEmailDisclaimer /> : null}
      </div>
      <div>
        {showInvalidPasswordInputDisclaimer ? (
          <InvalidPasswordInputDisclaimer />
        ) : null}
      </div>
      <div>
        {showIncorrectDateOfBirth ? <IncorrectDateOfBirthDisclaimer /> : null}
      </div>
    </div>
  );
};
