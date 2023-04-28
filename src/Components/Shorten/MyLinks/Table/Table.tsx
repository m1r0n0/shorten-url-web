import { changeCertainLinkPrivacy } from "../../../../API";
import { ITableHeadings, IUserLink, IUserLinks } from "../../../../Models";
import { updateUserLinksTableData } from "../../../../Services/link";
import { useAppDispatch, useAppSelector } from "../../../../hooks";
import TBodyRow from "./TBodyRow";

interface ITable {
  tKeys: string[];
  tbodyData: IUserLinks;
}

export default function Table({ tKeys, tbodyData }: ITable) {

  const TurnKeyIntoHeading = (key: string): string => {
    switch (key) {
      case "fullUrl":
        return "Full Url";
      case "shortUrl":
        return "Short Url";
      case "isPrivate":
        return "Is Private?";
    }
    return "";
  };

  return (
    //css flex
    <table className="table">
      <thead>
        <tr key="heading">
          {tKeys.map((heading: string) => {
            return (
              <th key={heading as React.Key}>
                {TurnKeyIntoHeading(heading)} 
                </th>
            );
          })}
        </tr>
      </thead>
      <tbody>
        {tbodyData.map((row: IUserLink, index: number) => {
          return <TBodyRow key={index} row={row} keys={tKeys} index={index} />;
        })}
      </tbody>
    </table>
  );
}
