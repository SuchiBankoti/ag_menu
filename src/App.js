import React, { useCallback, useEffect, useRef, useState} from 'react';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-quartz.css';
import data from './sample.json'
import Navbar from './Navbar';
import './App.css'
import Sidebar from './Sidebar';
import TagRenderer from './customRenderers/tagRenderer';
import CategoryRenderer from './customRenderers/categoryRenderer';
import ImageRenderer from './customRenderers/imageRenderer';
import MeetingRenderer from './customRenderers/meetingRenderer';

const App = () => {
  
  const [columnDefs,setColumnDefs] = useState([]);
  const [rowData, setRowData] = useState([]);
  const [selectedNodes, setSelectedNodes] = useState([])
  const[searchVal,setSearchVal]=useState('')
  const myRef=useRef(null)
  
  

  useEffect(() => {
    setColumnDefs(data.columns)
    setRowData(data.rows);
  }, []);


  const handleSelectionChanged = () => {
    const selected = myRef.current.api.getSelectedNodes();
    setSelectedNodes(selected.map(s=>s.data.id))
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
          components={{
            'tagRenderer': TagRenderer,
            'categoryRenderer': CategoryRenderer,
            'imageRenderer': ImageRenderer,
            'meetingRenderer':MeetingRenderer
          }}
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
