import React from 'react';
import Table from 'react-bootstrap/Table';

function CandidateTable({ columns, data }) {
  return (
    <div className="table-responsive p-1">
      <Table  className="nowrap-table">
        <thead>
          <tr >
            {columns.map(column => (
              <th key={column.accessor} className={column.className || ''} style={{textWrap:'nowrap',padding:'8px',fontSize:'12px',fontWeight:'600',background: '#f5f5f5'}}>
                {column.Header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row, rowIndex) => (
            <tr key={rowIndex}>
              {columns.map(column => (
                <td key={`${rowIndex}-${column.accessor}`} className={column.className || ''} style={{textWrap:'nowrap',padding:'12px',fontSize:'13px'}}>
                  {column.Cell ? column.Cell(row) : row[column.accessor]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
}

export default CandidateTable;
