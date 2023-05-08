import { ILink } from "../../../../../Models";
import {
  ChangeLinkPrivacy,
  DeleteLink,
  TurnKeyIntoTableColumnStyleName,
} from "../../../../../Services/link";
import { useAppDispatch, useAppSelector } from "../../../../../hooks";
import "../Table.css";

interface Props {
  row: ILink;
  keys: string[];
  index: number;
}

export const TBodyRow = ({ row, keys, index }: Props): JSX.Element => {
  const dispatch = useAppDispatch();
  const userId = useAppSelector((state) => state.user.user.userId);

  const IsActionButtonThere = (key: string) => {
    if (key === "fullUrl" || key === "shortUrl") return false;
    if (key === "isPrivate" || key === "deleteAction") return true;
  };

  const renderActionButton = (row: ILink, key: string, index: number) => {
    switch (key) {
      case "isPrivate":
        return (
          <input
            type="checkbox"
            defaultChecked={row[key] as boolean}
            onClick={() => dispatch(ChangeLinkPrivacy(row, userId))}
            key={(key + index) as React.Key}
            className={TurnKeyIntoTableColumnStyleName(key)}
          />
        );
      case "deleteAction":
        return (
          <div
            className={TurnKeyIntoTableColumnStyleName(key)}
            key={(key + index) as React.Key}
          >
            <button
              type="button"
              className="btn btn-danger"
              onClick={() => dispatch(DeleteLink(row, userId))}
            >
              Delete
            </button>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div
      key={index}
      className="d-flex flex-row justify-content-around align-items-center"
    >
      {keys.map((key: string) => {
        return IsActionButtonThere(key) ? (
          renderActionButton(row, key, index)
        ) : (
          <p
            key={row[key] as React.Key}
            className={TurnKeyIntoTableColumnStyleName(key)}
          >
            {row[key]}
          </p>
        );
      })}
    </div>
  );
};
