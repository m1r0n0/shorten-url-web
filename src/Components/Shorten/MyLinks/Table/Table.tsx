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
  // const IsThereNeededCheckBox = (value: any): boolean => {
  //   //to different JSON
  //   if (value === true || value === false) {
  //     return true;
  //   } else {
  //     return false;
  //   }
  // };

  const TurnKeyIntoHeading = (key: string): string => {
    switch (key) {
      case "fullUrl":
        return "Full Url";
      case "shortUrl":
        return "Short Url";
      case "isPrivate":
        return "Is Private?";
      default:
        return "";
    }
  };

  return (
    //css flex
    <table className="table">
      <thead>
        <tr key="heading">
          {tKeys.map((heading: string) => {
            return (
              <th key={heading as React.Key}>{TurnKeyIntoHeading(heading)} </th>
            );
          })}
        </tr>
      </thead>
      <tbody>
        {tbodyData.map((row: IUserLink, index: number) => {
          return <TBodyRow row={row} keys={tKeys} index={index} />;
        })}
      </tbody>
    </table>
  );
}
