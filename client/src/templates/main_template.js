import React from 'react';

import '../css_files/main_page.css'
import { Facebook, Twitter, Instagram } from 'react-feather';

const MainTemplate = ({PageContent}) => {
    return (
    <div className = 'main-wrapper'>

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

            <div className = 'footer-content-containers'>
                <h2>Mission Statement</h2>

                <p>
                    At KeyBoardDemons, our mission is to empower individuals with the essential skill of typing, enabling them to communicate and work efficiently in the digital age. We provide a comprehensive platform that caters to users of all levels, from beginners to experts.

                    Our user-friendly interface and engaging exercises help users build a strong foundation and enhance their typing proficiency. We believe that effective typing is a key to success in today's world.

                </p>
               
                
            
            </div>

            <div className = 'footer-content-containers'>
                <h2>Follow Our Socials</h2>

                <div className = 'social-containers'>
                    <Facebook className = 'social-icons'/>
                    <Twitter className = 'social-icons'/>
                    <Instagram className = 'social-icons'/>

                </div>
                
          
            </div>

            <div className = 'footer-content-containers'>

                <h2>Developed By</h2>
                <img src = "cheezebyte.png" alt = "website logo"/>
            </div>
           
    

    
        </footer>

    
    </div>
    )
    
    

  }
export default MainTemplate;