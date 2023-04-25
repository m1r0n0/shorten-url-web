import { changeParticularLinkPrivacy } from "../../../../API";
import { ITableHeadings, IUserLink, IUserLinks } from "../../../../Models";
import { updateUserLinksTableData } from "../../../../Services/link";
import { useAppDispatch, useAppSelector } from "../../../../hooks";

interface ITable {
  theadData: string[];
  tbodyData: IUserLinks;
}

export default function Table({ theadData, tbodyData }: ITable) {
  const dispatch = useAppDispatch();
  const userId = useAppSelector((state) => state.user.user.userId);

  const IsThereNeededCheckBox = (value: any): boolean => {
    //to different JSON
    if (value === true || value === false) {
      return true;
    } else {
      return false;
    }
  };

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

  const ChangePrivacyOfLink = (row: any): any => {
    changeParticularLinkPrivacy(row, userId).then(() => {
      dispatch(updateUserLinksTableData(userId));
    });
  };

  return (
    //css flex
    <table className="table">
      <thead>
        <tr>
          {theadData.map((heading: string) => {
            return <th key={heading}> {TurnKeyIntoHeading(heading)} </th>;
          })}
        </tr>
      </thead>
      <tbody>
        {tbodyData.map((row: IUserLink, index: number) => {
          return (
            <tr key={index}>
              {theadData.map((key: string) => {
                //non-boolean (non-checkbox) row[key] always equals true
                return row[key] ? (
                  IsThereNeededCheckBox(row[key]) ? (
                    <td key={row[key]}>
                      <input
                        type="checkbox"
                        defaultChecked={row[key]}
                        onClick={() => ChangePrivacyOfLink(row)}
                      />
                    </td>
                  ) : (
                    <td key={row[key]}> {row[key]}</td>
                  )
                ) : (
                  <td key={row[key]}>
                    <input
                      type="checkbox"
                      defaultChecked={row[key]}
                      onClick={() => ChangePrivacyOfLink(row)}
                    />
                  </td>
                );
              })}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}
