import { useAppSelector } from "../../../../hooks";
import NotFoundDisclaimer from "./NotFoundDisclaimer";
import UnauthorizedDisclaimer from "./UnauthorizedDisclaimer";

export const DeleteLinkDisclaimers = () => {
  const isDeletingLinkNotFound = useAppSelector(
    (s) => s.disclaimer.isDeletingLinkNotFound
  );
  const isDeletingLinkUnaccessible = useAppSelector(
    (s) => s.disclaimer.isDeletingLinkUnaccessible
  );
  return (
    <div className="d-flex justify-content-center m-3">
      {isDeletingLinkNotFound ? <NotFoundDisclaimer /> : null}
      {isDeletingLinkUnaccessible ? <UnauthorizedDisclaimer /> : null}
    </div>
  );
};
