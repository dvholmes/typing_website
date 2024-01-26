
import React, {useState}from 'react';
import '../css_files/page_contenttemplate.css'
import Testing from '../components/testing'

import Practice from '../components/practice';
import InfoPage from '../components/infopage';


// return the current mode




const Page_contenttemplate = () => {

  const [isOpen, setIsOpen] = useState(false);

  const [currentMode,setMode] = useState(1);
  


  // change mode when the user clicks on an item in the menu
  const setModeonClick = (newMode) => {

    setMode(newMode);

  }

  
  const togglePanel = () => {
    setIsOpen(!isOpen);
  };


    return (
    <div className = 'Practice-container'>
      

        <div className={`panel ${isOpen ? 'open' : ''}`}>
          
          <div className="panel-content">

            <div className = "panel-exit">

             <button className = "drop-down-button" onClick={togglePanel}>X</button>

            </div>
            <div className = "panel-content-header">
              <h1>Options</h1>
            </div>

            <div className = 'panel-content-container'>
              <a className = {`panel-options ${currentMode  === 1 ? 'selected': ''}`}  onClick = {() => setModeonClick(1)} href='https://www.nike.com/'>Test: Easy</a>
       
              <a  className = {`panel-options ${currentMode  === 2 ? 'selected': ''}`}  onClick = {() => setModeonClick(2)} href = 'https://www.nike.com/'>Practice</a>
              <a  className = {`panel-options ${currentMode  === 3 ? 'selected': ''}`}  onClick = {() => setModeonClick(3)} href = 'https://www.nike.com/'>Resources</a>


            </div>
          </div>
        </div>


      <div className = 'outer-menu-container'>

        <div className = 'menu-container'>
          <div className = {`menu-content-container ${currentMode  === 1 ? 'selected': ''}`}  onClick = {() => setModeonClick(1)}>
            <h1>Test Mode</h1>

          </div>
          <div className = {`menu-content-container ${currentMode  === 2 ? 'selected': ''}`} onClick = {() => setModeonClick(2)}>
            <h1>Practice</h1>

          </div>
          <div className = {`menu-content-container ${currentMode  === 3 ? 'selected': ''}`} onClick = {() => setModeonClick(3)}>
            <h1>Typing Information</h1>

          </div>

        </div>


        <div className = "menu-button-container">
          <button className = "menu-button" onClick = {togglePanel}> Menu </button>

        </div>

        
      </div>

      {currentMode === 1 ? <Testing /> :null}
      {currentMode === 2 ? <Practice /> : null}
      {currentMode === 3 ? <InfoPage /> : null}

      
      
    </div>
    )
    
  }
export default Page_contenttemplate;