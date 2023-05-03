import { IUserLink, IUserLinks } from "../../../../Models";
import TBodyRow from "./TBodyRow";
import "./Table.css";

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
    <div className="d-flex flex-column">
      <div
        key="heading"
        className="d-flex flex-row justify-content-around align-items-center"
      >
        {tKeys.map((heading: string) => {
          return (
            <p className="tableCell tableHeading" key={heading as React.Key}>
              {TurnKeyIntoHeading(heading)}
            </p>
          );
        })}
      </div>
      <div className="d-flex flex-column">
        {tbodyData.map((row: IUserLink, index: number) => {
          return <TBodyRow key={index} row={row} keys={tKeys} index={index} />;
        })}
      </div>
    </div>
  );
}
