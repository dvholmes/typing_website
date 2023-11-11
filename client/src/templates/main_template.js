import React from 'react';

import '../css_files/main_page.css'

const MainTemplate = ({PageContent}) => {
    return (
    <div >

        <header className = 'header-container'>

            <div className = 'header-content-container'>

                  <div className = "header-left-container">

                    <img src = "main_logo.png" alt = "website logo"/>
                    <h1>KeyBoardDemons</h1>
                </div>

        

            

                
            

                <div className = 'header-right-container'>
                    <a href = "nike.com"> Login/Sign Up</a>
                </div>

            </div>
            

              
        </header>


        <main className = "main-content-container">

            {PageContent}

        </main>

        <footer className = "footer-container">

            <div className = 'footer-one-container'>
                <h2>Mission Statement</h2>
               
                
            
            </div>

            <div className = 'footer-two-container'>
                <h2>Follow Us On Our Socials</h2>
                
          
            </div>

            <div className = 'footer-three-container'>
                <h2>Company Information</h2>

            

            </div>
            <div className = 'footer-four-container'>

            <img src = "cheezebyte.png" alt = "website logo"/>

            </div>
    
    

    
        </footer>

    
    </div>
    )
    
    

  }
export default MainTemplate;