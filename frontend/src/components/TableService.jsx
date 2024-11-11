import useTable from "@hooks/table/useTable.jsx";
import "@styles/form.css"; // Ensure this path is correct

export default function TableService({
  data,
  columns,
  filter,
  dataToFilter,
  initialSortName,
  onSelectionChange,
}) {
  const { tableRef } = useTable({
    data,
    columns,
    filter,
    dataToFilter,
    initialSortName,
    onSelectionChange,
  });

  return (
    <div className="table-container">
      <table>
        <thead>
          <tr>
            {columns.map((column) => (
              <th key={column.accessor}>{column.header}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row) => (
            <tr key={row.idServicio}>
              {columns.map((column) => (
                <td key={column.accessor}>
                  {column.Cell ? column.Cell({ row }) : row[column.accessor]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
