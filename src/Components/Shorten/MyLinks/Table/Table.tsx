import { useContext } from "react";
import { changeParticularLinkPrivacy } from "../../../../API";
import { UserIDContext } from "../../../../App";

export default function Table({ theadData, tbodyData, updateTableData }: any) {
  const { userID } = useContext(UserIDContext);

  const IsThereNeededCheckBox = (value: any): boolean => {
    if (value === true || value === false) {
      return true;
    } else {
      return false;
    }
  };

  const ChangePrivacyOfLink = (row: any): any => {
    changeParticularLinkPrivacy(row, userID).then(() => {
      updateTableData();
    });
  };

  return (
    <table className="table text-white">
      <thead>
        <tr>
          {theadData.map((heading: any) => {
            return <th key={heading}>{heading}</th>;
          })}
        </tr>
      </thead>
      <tbody>
        {tbodyData.map((row: any, index: any) => {
          return (
            <tr key={index}>
              {theadData.map((key: any) => {
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
