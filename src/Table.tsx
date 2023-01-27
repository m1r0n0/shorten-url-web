export default function Table({ theadData, tbodyData } : any) {
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
          return <tr key={index}> 
          <td> </td>
          </tr>;
        })}
      </tbody>
    </table>
  );
}
