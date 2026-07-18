export default function DataTable({ columns, rows, onRowClick, renderCell }) {
  return (
    <table className="data-table">
      <thead>
        <tr>
          {columns.map((c) => <th key={c.key}>{c.label}</th>)}
        </tr>
      </thead>
      <tbody>
        {rows.map((row, i) => (
          <tr key={i} className={onRowClick ? 'clickable' : ''} onClick={() => onRowClick && onRowClick(row)}>
            {columns.map((c) => (
              <td key={c.key}>{renderCell ? renderCell(c.key, row) : row[c.key]}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}
