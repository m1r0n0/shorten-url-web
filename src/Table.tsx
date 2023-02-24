import React from "react";

export default function Table({ theadData, tbodyData }: any) {
  const IsThereNeededCheckBox = (value: any): boolean => {
    if (value === true || value === false) {
      return false;
    } else {
      return true;
    }
  };

  // $(function () {
  //   $(".toggle").change(function () {
  //     var self = $(this);
  //     var url = self.data("url");
  //     var id = self.attr("id");
  //     var value = self.prop("checked");

  //     $.ajax({
  //       url: url,
  //       data: { id: id },
  //       type: "PATCH",
  //     });
  //   });
  // });

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
              {theadData.map((key: any, index: any) => {
                return row[key] ? (
                  IsThereNeededCheckBox(row[key]) ? (
                    <td key={row[key]}> {row[key]}</td>
                  ) : (
                    <td key={row[key]}>
                      <input
                        // className="toogle"
                        type="checkbox"
                        defaultChecked={row[key]}
                      ></input>
                    </td>
                  )
                ) : (
                  <td key={row[key]}>
                    <input
                      // className="toogle"
                      type="checkbox"
                      defaultChecked={row[key]}
                    ></input>
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
