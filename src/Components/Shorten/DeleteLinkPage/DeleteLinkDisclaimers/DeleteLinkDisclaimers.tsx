import { useAppSelector } from "../../../../hooks";
import NotFoundDisclaimer from "./NotFoundDisclaimer";
import SuccessfulDeleteDisclaimer from "./SuccessfulDeleteDisclaimer";
import UnauthorizedDisclaimer from "./UnauthorizedDisclaimer";

export const DeleteLinkDisclaimers = () => {
  const isDeletingLinkNotFound = useAppSelector(
    (s) => s.disclaimer.isDeletingLinkNotFound
  );
  const isDeletingLinkUnaccessible = useAppSelector(
    (s) => s.disclaimer.isDeletingLinkUnaccessible
  );
  const isLinkDeletedSuccessfully = useAppSelector(
    (s) => s.disclaimer.isLinkDeletedSuccessfully
  );
  return (
    <div className="d-flex justify-content-center m-3">
      {isDeletingLinkNotFound ? <NotFoundDisclaimer /> : null}
      {isDeletingLinkUnaccessible ? <UnauthorizedDisclaimer /> : null}
      {isLinkDeletedSuccessfully ? <SuccessfulDeleteDisclaimer /> : null}
    </div>
  );
};
