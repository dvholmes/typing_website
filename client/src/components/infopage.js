import React, {useEffect, useState, useRef} from "react";

import "../css_files/infopage.css"




const InfoPage = () => {


    return(
        <div className = "infopage-container">
            <div className = "infopage-content-container">

                <div className = "infopage-aboutus-container">
                    
                    <h1>About Our Page</h1>

                    <p>
                        Welcome to KeyBoardDemons, your destination for mastering typing in the digital age. Our mission is to enhance communication and work efficiency through a user-friendly platform suitable for all, from beginners to typing experts. 
                        Engage in our exercises to build a strong foundation and continually improve your typing skills, essential for success in today's fast-paced world. Test your speed and accuracy with our Testing Mode, featuring 300 random words and immediate feedback with color-coded markers for mistakes and correct entries. 
                        Alternatively, our Practice Modes offer a relaxed setting with 400-word passages, focusing on whole-word accuracy, perfect for gradual improvement without time pressure. Plus, contribute to our community by submitting a 350-word passage for our Practice Mode, enriching our content and aiding users globally. 
                        Join KeyBoardDemons and embark on your journey to typing excellence!
                    </p>

                </div>

                <div className = "finger-placement-container">
                    <h1>Proper Finger Placement</h1>

                    <div className = "finger-placement-imgcontainer">
                        <img src = "finger_placement.jpg"/>

                    </div>
                </div>

                <div className = "Typing-tips-container">
                    <h1>Typing Tips</h1>

                   
                    <ul class="typing-tips-bullets">
                        <li>Proper Finger Placement: Encourage users to use the "home row" method where each finger is responsible for specific keys, enhancing muscle memory and speed.</li>
                        <li>Regular Practice: Stress the importance of consistent practice. Daily typing exercises can significantly improve speed and accuracy over time.</li>
                        <li>Focus on Accuracy Before Speed: Emphasize starting with a focus on accuracy to build a strong foundation. Speed naturally increases as accuracy improves.</li>
                        <li>Use Typing Software and Games: Recommend interactive typing software and games which make practice more engaging and track progress over time.</li>
                        <li>Learn to Touch Type: Encourage learning to type without looking at the keyboard. Touch typing is essential for increasing speed.</li>
                        <li>Maintain Proper Posture: Highlight the importance of good posture and ergonomics. Sitting correctly with hands and wrists properly positioned can reduce fatigue and increase typing efficiency.</li>
                        <li>Custom Exercises for Problematic Keys: Suggest custom exercises for keys or combinations that are particularly challenging, as this targeted practice can help overcome specific hurdles in typing speed.</li>
                    </ul>
                
                </div>

                <div className = "testing-practice-container">
                

                    <div className = "testvpract-container">
                        <h2>Testing Mode</h2>

                        <p> 
                            In Testing Mode, each letter of the sample passage is meticulously tracked: characters typed correctly are highlighted green, 
                            while errors are marked red. Users must type the correct letter or space before advancing, ensuring they follow the correct sequence rather than typing randomly. 
                            This mode challenges users with a one-minute time limit and utilizes a sample text composed of random words, lacking proper sentence structure, to slightly increase the difficulty level.
                        </p>

                    </div>

                    <div className = "testvpract-container">
                        <h2>Practice Mode</h2>
                        <p>
                            In Practice Mode, each word is individually tracked: words typed correctly are marked green, while incorrect ones are marked red. The word you're currently typing turns red if misspelled, and remains grey if your current spelling is correct. 
                            To progress to the next word, simply hit the space button. This mode features sample text that is an actual passage with proper sentence fluency and structure, differing from the Testing Mode. 
                            Although there's no time limit, a timer is still used to calculate the words per minute (WPM), providing a stress-free environment to enhance typing skills while still tracking progress.
                        </p>
                    </div>
                </div>


                <div className = "wpm-calculations">
                    <h1>How we calculate WPM</h1>
                    <div className = "testpract-wpm-container">
                        <h2>Testing Mode WPM Formula</h2>
                        <img src = "TestingFormula.png"/>

                    </div>

                    <div className = "testpract-wpm-container">
                        <h2>Practice Mode WPM Formula</h2>
                        <img src = "PracticeFormula.png"/>

                    </div>

                </div>

            </div>

        </div>
       
    )
}

export default InfoPage;