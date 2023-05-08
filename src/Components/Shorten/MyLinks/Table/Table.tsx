import { ILink, ILinks } from "../../../../Models";
import { TurnKeyIntoTableColumnStyleName } from "../../../../Services/link";
import TBodyRow from "./TBodyRow";
import "./Table.css";

interface ITable {
  tKeys: string[];
  tbodyData: ILinks;
}

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

export default function Table({ tKeys, tbodyData }: ITable) {
  return (
    <div className="d-flex flex-column">
      <div
        key="heading"
        className="d-flex flex-row justify-content-around align-items-center"
      >
        {tKeys.map((heading: string) => {
          return (
            <p
              className={
                TurnKeyIntoTableColumnStyleName(heading) + " " + "tableHeading"
              }
              key={heading as React.Key}
            >
              {TurnKeyIntoHeading(heading)}
            </p>
          );
        })}
      </div>
      <div className="d-flex flex-column">
        {tbodyData.map((row: ILink, index: number) => {
          return <TBodyRow key={index} row={row} keys={tKeys} index={index} />;
        })}
      </div>
    </div>
  );
}
