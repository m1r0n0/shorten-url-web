import React from "react";

export default function Table({ theadData, tbodyData }: any) {
  const IsThereNeededCheckBox = (value: any): boolean => {
    if (value === true || value === false) {
      return false;
    } else {
      return true;
    }
  };

  return (
    <table>
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
              {theadData.map((key: any, index: any) => {
                return row[key] ? (
                  IsThereNeededCheckBox(row[key]) ? (
                    <td key={row[key]}> {row[key]}</td>
                  ) : (
                    <input type="checkbox" checked={row[key]}></input>
                  )
                ) : (
                  <td>
                    <input type="checkbox" checked={row[key]}></input>
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
