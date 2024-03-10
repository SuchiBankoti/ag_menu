import "./Navbar.css"
import {CiSearch,CiChat2,CiSettings} from 'react-icons/ci'

const Navbar = (props) => {
  const { setSearchVal, searchRow ,searchVal} = props
  const handleSearch = (e) => {
    const inputValue = e.target.value;
    setSearchVal(inputValue);
    searchRow(inputValue);
  };
  
  return (
      <div className="navbar">
          <div className="title">products</div>
          <div className="navbar-sub">
              <div className="icon">
               <CiSearch/>
                <input id="input" placeholder="search" value={searchVal} onChange={handleSearch}/>
              </div>
              <div className="icon">
                  <CiChat2/>
              </div>
              <div className="icon">
                 <CiSettings/>
              </div>
          </div>
  </div>
      
  );
};

export default Navbar;
