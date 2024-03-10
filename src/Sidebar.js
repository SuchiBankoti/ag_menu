import { useState } from "react";
import "./Sidebar.css"
import {CiCircleRemove,CiPen,CiStethoscope,CiStar,CiFolderOn,CiUser,CiPower,CiBank,CiSquarePlus} from 'react-icons/ci'
const Sidebar = () => {
  
    const [isDropdownVisible, setDropdownVisible] = useState(false);

    const toggleDropdown = () => {
      setDropdownVisible(!isDropdownVisible);
    };

  return (
      <div className="sidebar">
          <div className="sidebar-top">
              
          <div className="title-bar">
              <div>
                <CiBank className="sidebar-icon"/>
                <div className="title-subbar">
                    <div className="sub">sub</div>
                    <div className="sub-title">title</div>
                </div>
              </div>
              <div>img</div>
          </div>
          <div className="team-container">
              
          <div className="team">
              <div>
              <CiPen/>
              <div className="sub-title">subtitle</div>
              </div>
              <div className="icon">
              <CiCircleRemove/>
              </div>
          </div>
          <div className="team">
          <div>
              <CiStethoscope/>
              <div className="sub-title">subtitle</div>
              </div>
                  <div className="icon">
              <CiCircleRemove/>
              </div>
          </div>
          <div className="team">
              <div>
              <CiStar/>
              <div className="sub-title">subtitle</div>
              </div>
              <div className="icon">
              <CiCircleRemove/>
              </div>
              </div>
          </div>
              
          <div className="create-team">
              <CiSquarePlus/>
              <div>create a team</div>
          </div>
          <div className="folders">
              <div className="folder-sub" onClick={toggleDropdown}>
              <div className="header-title">Folders</div>
              <CiSquarePlus />
              </div>
                  <div className={`folder-container ${isDropdownVisible ? 'show' : ''}`}>
                  <div className="folder">
                      <CiFolderOn/>
                          <div>products</div>
                    </div>
                    <div className="folder">
                      <CiFolderOn/>
                      <div>products</div>
                  </div>
                  <div className="folder">
                      <CiFolderOn/>
                      <div>products</div>
                  </div>
                  <div className="folder">
                      <CiFolderOn/>
                      <div>products</div>
                    </div>
              </div>
              </div>
          </div>
              
          <div className="sidebar-bottom">
          <div className="team">
              <div>
              <CiUser/>
              <div className="sub-title">subtitle</div>
              </div>
          </div>
          <div className="team">
              <div>
              <CiPower/>
              <div className="sub-title">subtitle</div>
              </div>
              <div className="icon">
              <CiCircleRemove/>
              </div>
          </div>
          <div className="sidebar-sub">
              <div>days left on trial</div>
              <button className="btn">Add-btn</button>
              </div>
          </div>
              
  </div>
      
  );
};

export default Sidebar;
