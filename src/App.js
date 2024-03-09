import React, { useEffect, useMemo, useState} from 'react';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-quartz.css';
import data from './sample.json'

const App = () => {
  
  const [columnDefs, setColumnDefs] = useState([]);
  const [rowData, setRowData] = useState([]);
  
  const formatters =useMemo(() => ({
    formatMembers: params => params.data.members.map(member => member.url).join(', '),
    formatCategories: params => params.data.categories.join(', '),
    formatTags: params => params.data.tags.join(', ')
  }),[])

  useEffect(() => {
    const formattedColumns = data.columns.map(column => {
      return {
        ...column,
        valueFormatter: formatters[column.valueFormatter] 
      };
    });

    setColumnDefs(formattedColumns)
    setRowData(data.rows)
  }, [formatters])
  
    
  return (
    <div
      className="ag-theme-quartz"
      style={{
        height: '500px',
        width:'100vw'
      }}
    >
      <AgGridReact
        columnDefs={columnDefs}
        rowData={rowData}
        rowSelection="multiple"
      >
        
    </AgGridReact>
    </div>
  );
};

export default App;
