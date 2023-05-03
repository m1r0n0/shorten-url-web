import { IUserLink } from "../../../../../Models";
import { ChangeLinkPrivacy } from "../../../../../Services/link";
import { useAppDispatch, useAppSelector } from "../../../../../hooks";
import "../Table.css";

interface Props {
  row: IUserLink;
  keys: string[];
  index: number;
}

export const TBodyRow = ({ row, keys, index }: Props): JSX.Element => {
  const dispatch = useAppDispatch();
  const userId = useAppSelector((state) => state.user.user.userId);

  const IsCheckBoxThere = (key: string) => {
    if (key === "fullUrl" || key === "shortUrl") return false;
    if (key === "isPrivate") return true;
  };

  return (
    <div
      key={index}
      className="d-flex flex-row justify-content-around align-items-center"
    >
      {keys.map((key: string) => {
        return IsCheckBoxThere(key as string) ? (
          <input
            type="checkbox"
            defaultChecked={row[key] as boolean}
            onClick={() => dispatch(ChangeLinkPrivacy(row, userId))}
            key={row[key] as React.Key}
            className="tableCell"
          />
        ) : (
          <p key={row[key] as React.Key} className="tableCell">
            {row[key]}
          </p>
        );
      })}
    </div>
  );
};
