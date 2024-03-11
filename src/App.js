import React, { useCallback, useEffect, useMemo, useRef, useState} from 'react';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-quartz.css';
import data from './sample.json'
import Navbar from './Navbar';
import './App.css'
import Sidebar from './Sidebar';

const App = () => {
  
  const [columnDefs, setColumnDefs] = useState([]);
  const [rowData, setRowData] = useState([]);
  const [selectedNodes, setSelectedNodes] = useState([])
  const[searchVal,setSearchVal]=useState('')
  const myRef=useRef(null)
  
  const formatters = useMemo(() => ({
    formatCategories: params => (
      <div>
        {Array.isArray(params.data.categories) ?
          params.data.categories.map((category, index) => (
            <button key={index} className="category-button">
              {category}
            </button>
          ))
        :
          <button className="category-button">
            {params.data.categories}
          </button>
        }
      </div>
    ),
    formatTags: params => (
      <div>
        {Array.isArray(params.data.tags) ?
          params.data.tags.map((tag, index) => (
            <button key={index} className="tag-button">
              {tag}
            </button>
          ))
        :
          <button className="tag-button">
            {params.data.tags}
          </button>
        }
      </div>
    ),
  }), []);
  
  const customImageRenderer = (params) => {
    const imageUrlArray = params.value.map((member) => member.url);
    return imageUrlArray.map((url, index) => (
      <img key={index} src={url} alt={`Member ${index + 1}`} className='grid-profile-img' />
    ));
  };
  
  const getTimeLeftForMeeting = (nextMeetingDate) => {
    const now = new Date();
    const meetingDate = new Date(nextMeetingDate);
    
    if (
      meetingDate.getDate() === now.getDate() &&
      meetingDate.getMonth() === now.getMonth() &&
      meetingDate.getFullYear() === now.getFullYear()
    ) {
      const timeDiff = meetingDate.getTime() - now.getTime();
      const minutesLeft = Math.floor(timeDiff / (1000 * 60));
      
      if (minutesLeft <= 0) {
        return 'Meeting is in progress';
      } else {
        return `${minutesLeft} min left for the meeting today`;
      }
    }
    
    const tomorrow = new Date(now);
    tomorrow.setDate(now.getDate() + 1);
    
    if (
      meetingDate.getDate() === tomorrow.getDate() &&
      meetingDate.getMonth() === tomorrow.getMonth() &&
      meetingDate.getFullYear() === tomorrow.getFullYear()
    ) {
      return 'Meeting is tomorrow';
    }
    
    return `Meeting on ${meetingDate.toDateString()}`;
  };
  

  useEffect(() => {
    const formattedColumns = data.columns.map((column) => {
      if (column.field === 'members') {
        return {
          ...column,
          cellRenderer: customImageRenderer,
        };
      }
  
      if (column.field === 'nextmeeting') {
        return {
          ...column,
          valueFormatter: (params) => getTimeLeftForMeeting(params.data.nextmeeting),
          cellClass: 'date-cell',
        };
      }
  
      if (column.field === 'categories' || column.field === 'tags') {
        return {
          ...column,
          valueFormatter: formatters[column.field],
          cellClass: `${column.field}-cell`,
        };
      }
  
      return {
        ...column,
        valueFormatter: column.field in formatters ? formatters[column.field] : null,
      };
    });
  
    setColumnDefs(formattedColumns);
    setRowData(data.rows);
  }, [formatters]);
  
  

  const handleSelectionChanged = () => {
    const selected = myRef.current.api.getSelectedNodes();
    setSelectedNodes(selected.map(s=>s.data.id))
    console.log(selected);
  };
  const removeRow = useCallback(() => {
    setRowData(prev => prev.filter(row =>!selectedNodes.includes(row.id)))
  }, [selectedNodes])
  

  const searchRow = (searchVal) => {
    if (myRef.current) {
      myRef.current.api.setQuickFilter(searchVal);
    }
  };
  return (
    <div className='App'>
      <Sidebar/>
    <div
      className="ag-theme-quartz"
      style={{
        height: 'calc(100vh - 40px)',
        width: '80vw',
        position:'relative'
      }}
      >
        <Navbar setSearchVal={setSearchVal} searchRow={searchRow} searchVal={searchVal} />
      <AgGridReact
        columnDefs={columnDefs}
        rowData={rowData}
        rowSelection="multiple"
        ref={myRef}
          onSelectionChanged={handleSelectionChanged}
      >
        
        </AgGridReact>
      {
        selectedNodes.length > 0 &&
           <div className='btn-container'>
              <button>{selectedNodes.length}</button>
              <button onClick={removeRow} className='btn'>Delete</button>
           </div>
      }
      
      </div>
        
  </div>
      
  );
};

export default App;
