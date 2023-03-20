import InvalidPasswordInputDisclaimer from "../../../Register/InvalidPasswordInputDisclaimer";

interface PasswordChangedDisclaimerProps {
  isPasswordChanged: boolean;
}

export const PasswordChangedDisclaimer: React.FC<
  PasswordChangedDisclaimerProps
> = ({ isPasswordChanged }) => {
  return (
    <div>
      {isPasswordChanged ? (
        <p>Password changed successfully!</p>
      ) : (
        <div>
          <p>Password didn't changed!</p>
          <div>
            <p>It may be caused by several problems: </p>
            <InvalidPasswordInputDisclaimer />
          </div>
        </div>
      )}
    </div>
  );
};
