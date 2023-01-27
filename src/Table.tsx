export default function Table({ theadData, tbodyData }: any) {
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
                return (
                  <td key={row[key]}>
                    if({row[key]} === true || {row[key]} === false){
                        <input type="checkbox" checked={row[key]}></input>}
                    else {
                        <td>{row[key]}</td>
                    };
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
