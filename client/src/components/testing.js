import React, {useEffect, useState, useRef} from "react";
import LoadingIcons from 'react-loading-icons'
import { AiOutlineReload } from "react-icons/ai";

import formatTime from "./formatTime";
import '../css_files/practice.css'
import '../css_files/testing.css'

const sample_text = "In summary, our typing website offers an unparalleled fusion of typing expertise and astrophotography fascination. Whether you're a novice or an experienced typist, our platform is your portal to a celestial odyssey through your keyboard. Join our community today, where we combine the wonders of the night sky with the magic of typing, and together."


function createTestArray(words){

    const amountofWords = 300;
  

    let tempWords = [...words];

    let min = 0;
    let max = words.length -1
    let testWords = ""

    for(let i = 0; i < amountofWords;i++){
        const wordsIndex = Math.round(Math.random() * (max - min)) + min;

        if(i === amountofWords - 1){
            testWords += tempWords[wordsIndex];
            
        }
        else{
            testWords += tempWords[wordsIndex] + " ";
        }
        

        // remove that words form the temp array

        tempWords.splice(wordsIndex,1);

        // reset the max.
        max = tempWords.length - 1;

    }

    return testWords;
}




const Testing = () => {
    const timeAmount = 60
    const [timer, setTimer] = useState(timeAmount);
    const [timerRunning,flipTimer] = useState(false)
    const [lettersArray, setLettersArray] = useState(sample_text.split(""));
    const [letterClassArray, setLetterClassArray] = useState(Array(lettersArray.length).fill('untouched'))
    const [currentIndex, setCurrentIndex] = useState(0);
    const [randomWords, setRandomWords] = useState([]);
    const [missedLetter, setMissedLetter] = useState(false)
    const [resultsScreen, setResultsScreen] = useState(false)
    const [correctStrokes, setCorrectStrokes] = useState(0);
    const [totalStrokes, setTotalStrokes] = useState(0);
    const [loading,setLoading] = useState(true);
    const [spacingCount,setspacingCount] = useState(0);
    

    const [screenBlocker, setScreenBlocker] = useState(true);

    // reference to the text passage.
    const paraReference = useRef(null)

    const switchScreenBlocker = () => {
        setScreenBlocker(!screenBlocker);
    }

    const scrollDownOneLine = () => {
    if (paraReference.current) {
      // Get the computed style of the text element
        const style = window.getComputedStyle(paraReference.current);
    
        // Extract the font size and line height
        const fontSize = parseFloat(style.fontSize); // Convert to numeric value
        const lineHeight = parseFloat(style.lineHeight);

        // If lineHeight is 'normal', use a default multiplier (e.g., 1.2)
        let scrollHeight = isNaN(lineHeight) ? fontSize * 1.2 : lineHeight;
    

        paraReference.current.scrollTop += scrollHeight;
        }
    }

    // Check when the timer hits zero
    useEffect(() => {
    if (timer === 0) {
        setResultsScreen(true);
        setScreenBlocker(true);

        flipTimer(false)
        setTimer(0);
        
        }
    }, [timer]);

    function generateTestCase(){
        setLettersArray(createTestArray(randomWords).split(""))
        let lettersClassList = Array(lettersArray.length).fill('untouched');

        lettersClassList[0] = 'test_touching';

        setLetterClassArray(lettersClassList);
    }
    

    const resetStates = () => {
        paraReference.current.scrollTop = 0;
        setspacingCount(0);
        setCurrentIndex(0);
        setTimer(timeAmount);
        setScreenBlocker(true);
        setResultsScreen(false);
        setCorrectStrokes(0);
        setTotalStrokes(0);
    }
    



    const resetAndNewPassage = () => {
        setLoading(true);
        flipTimer(false);


        generateTestCase();
        resetStates();
        setTimeout(async () => {
            await setLoading(false)
        }, 1000);
        
    }

    const resetTest = () => {

        // reset the letters class array
        let resetLettersClass = Array(lettersArray.length).fill('untouched');
        resetLettersClass[0] = 'test_touching';
        setLetterClassArray(resetLettersClass);
        // also add a case where we scroll up to the top of the text box.
        resetStates()

   
    }


    // start countdown timeer

    useEffect(() => {
        let interval;
    
        // if the time is running is on then run this
        if (timerRunning) {
  
          // interval is a reference to a function/instance that will be call every second  
          interval = setInterval(() => {
            setTimer(prevTime => prevTime - 1);
          }, 1000);
        }
    
        return () => clearInterval(interval);
  
      }, [timerRunning]);
  

    useEffect(() => {
        // Set up the event listener
  
        const handleKeyDown = (event) => {
            // Check if screenBlocker is active, if so, ignore keydown
            if (screenBlocker || resultsScreen || loading) {
                return;
            }

            if (event.key === ' ') {
                event.preventDefault();
                // Add your logic here for what should happen when space is pressed
            }



            // start the time as soon as the user starts typing after the screenblocker is deactivated.
            if(!timerRunning){
                flipTimer(true);
            }
            // console.log(event.key);
            let updatedLetterClass = [...letterClassArray]
       

            if (!/^[a-zA-Z ]$/.test(event.key)) {
                return; // Ignore keys that are not spaces or alphabetical characters
            }
        
    
            // If you want to check if the pressed key matches the current character in lettersArray
            if (event.key === lettersArray[currentIndex]) {

                

                // mark letter as either correct or incorrect.
               
                updatedLetterClass[currentIndex] = missedLetter ? 'incorrect' : 'correct';
                console.log(letterClassArray[currentIndex+1])
         

                if(!missedLetter){
                    setCorrectStrokes(correctStrokes + 1);
                }

                // if the user has reached the end, stop the clock.
                if(currentIndex + 1 === lettersArray.length){

                    flipTimer(false)
                    setResultsScreen(true);
                    setScreenBlocker(true);

                }
                
                updatedLetterClass[currentIndex + 1] = 'test_touching'

                if(lettersArray[currentIndex] === " "){
                    
                    if (spacingCount === 9){
                        scrollDownOneLine();
                        setspacingCount(0);

                    }else{
                        setspacingCount(spacingCount + 1);
                    }
                }


                setLetterClassArray(updatedLetterClass)
                setMissedLetter(false);

                // user has reach the end

              
                setCurrentIndex(currentIndex + 1);
                setTotalStrokes(totalStrokes + 1);

                

                

         
             
            } else {
              

                // prevent additional reruns.
                if (missedLetter !== true){
                    setMissedLetter(true);

                }
               
            }
        };
    
        window.addEventListener('keydown', handleKeyDown);
    
        // Clean up the event listener
        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, [screenBlocker, lettersArray, currentIndex,missedLetter]); // Dependencies




    // fetch words from the db.

    useEffect(() => {


        fetch("/TestingApi")
        .then(response => response.json())
        .then(async lastdocument => {
            console.log("backend",lastdocument.words);
            setRandomWords(lastdocument.words);
           
        })
    }, [])


    useEffect(() => {
        // This effect will run when randomWords changes
        if (randomWords.length > 0) {
            generateTestCase();
            setTimeout(async () => {
                setLoading(false)
            }, 2000);
        }
    }, [randomWords]);




    // Create a function to calculate line breaks
    const getDisplayText = () => {
        let currentLineBreakCount = 0;
        return lettersArray.map((letter, index) => {
            const shouldBreak = letter === " " && currentLineBreakCount === 9;
            
            // console.log("here",letter, letter === " ", currentLineBreakCount)
            if (shouldBreak) {
               
                currentLineBreakCount = 0;
                return <React.Fragment key={index} ><span className = {letterClassArray[index]}>{letter}</span><br/></React.Fragment>;
            } else {
                if(letter === " "){currentLineBreakCount += 1;}
                
                return <span key={index} className={letterClassArray[index]}>{letter}</span>;
            }
        });
    }

    return (
        <div>
                {loading ? (
      // Loading screen or spinner while data is being fetched
            <div className="easy-container"><LoadingIcons.TailSpin className = "loading-icon-practice"/></div>
         ) : ( 




            <div className='testing-container'>
           

                <div className={`resultsPopup ${resultsScreen ? 'open' : ''}`}>
            
                    <div className="results-content">
                        <div className = "results-content-header">
                            <h1>Your WPM:{Math.floor((correctStrokes/5) /((60-timer)/60))}</h1>
                        </div>

                        <h2 className = "results-text">Total Key Strokes<br/>{totalStrokes}</h2>
                        <h2 className = "results-text">Correct Key Strokes<br/>{correctStrokes}</h2>

                        <div className = "results-text">  <button onClick = {() => {resetTest()}}>Retry</button></div>
                        <div className = "results-text"><button onClick = {() => {resetAndNewPassage()}} >New Text</button></div> 

                    </div>

                </div>

    

                <div className = 'clock-newpassage-container'>

                    <span className = 'clock-object'>{formatTime(timer)}</span>
                    
                    <button className="new-passage-button" onClick = {() => {resetAndNewPassage()}}><AiOutlineReload/></button>
                </div>

                <div className='easy-display-container' id = "testing-d-container">


                    {screenBlocker && (
                            <div className = 'start-overlay' onClick={switchScreenBlocker}>
                            Click to Activate...
        
                        </div>
                        

                    )}
                
                    <p className='testing-display-text' ref={paraReference}>
                        {getDisplayText()}
                    </p>
                </div>
            
            </div>
         )}

        </div>

        
    );
}

export default Testing;
