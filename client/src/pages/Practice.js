
import React, {useState}from 'react';
import '../css_files/practice.css'

const Practice = () => {

  const [isOpen, setIsOpen] = useState(false);

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
              <a href='https://www.nike.com/' >Test: Easy</a>
              <a href = 'https://www.nike.com/'>Test: Hard</a>
              <a href = 'https://www.nike.com/'>Practice</a>
              <a href = 'https://www.nike.com/'>Resources</a>

            </div>
           
          </div>
        </div>


      <div className = 'outer-menu-container'>

        <div className = 'menu-container'>
          <div className = "menu-content-container"id='menu-one'>
            <h1>Test Mode: Easy</h1>

          </div>
          <div className = "menu-content-container" id='menu-two'>
            <h1>Test Mode: Hard</h1>

          </div>

          <div className = "menu-content-container" id='menu-three'>
            <h1>Practice</h1>

          </div>
          <div className = "menu-content-container"id='menu-four'>
            <h1>Typing Information</h1>

          </div>

        </div>


        <div className = "menu-button-container">
          <button className = "menu-button" onClick = {togglePanel}> Menu </button>

        </div>

        
      </div>
      
      
    </div>
    )
    
  }
export default Practice;