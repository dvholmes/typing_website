
import React, {useEffect, useState, useRef} from "react";
import LoadingIcons from 'react-loading-icons'
import { AiOutlineReload } from "react-icons/ai";
import formatTime from "./formatTime";
import '../css_files/practice.css'


const sample_text = "In summary, our typing website offers an unparalleled fusion of typing expertise and astrophotography fascination. Whether you're a novice or an experienced typist, our platform is your portal to a celestial odyssey through your keyboard. Join our community today, where we combine the wonders of the night sky with the magic of typing, and together."






const Practice = () => {


  const [time,setTime] = useState(0)
  const [timerRunning, alterTimer] = useState(false);
  const [wordIndex,setWordIndex] = useState(0);
  const [usertext,setText] = useState('');
  const [wordsRight,addToWordsRight] = useState(0);
  const [CorrectkeyStrokes, setCorrectKeyStrokes] = useState(0);
  const [loading,setLoading] = useState(true);

  

  const [wordsArray,setwordsArray] = useState(sample_text.split(/\s+/))

  const [resultsPopUp, setResultsPopup] = useState(false);
  
  
  const [wordColors, setWordColors] = useState(Array(wordsArray.length).fill('untouched'));

  const pRef = useRef(null); // Reference to the <p> element



  // run once the first time the user enters the page
  useEffect(() => {
    // Fetch data from the backend API
    generateANewPassage();

   
  }, []);


  const resetPractice = () => {

    // reset wordColors.
    let resetWordColors = Array(wordsArray.length).fill('untouched');
    resetWordColors[0] = 'touching'
    setWordColors(resetWordColors)
    resetStates();
    console.log(wordsArray)

  }

  const startTimer = () => {

    if(!timerRunning){
        alterTimer(true)

    }
  }


  // reset enviornment and generate a new passage as requested by the user.
  const newPassageAndReset = () => {
    alterTimer(false)
    setLoading(true);

    generateANewPassage();
    resetStates();
 
  }


  // function grab a new passage from the backend
  const generateANewPassage = () => {

    fetch("/PracticeApi")
    .then(response => response.json())
    .then(async data => {

      // split the queried text by space
      const queried_text = data["text"].split(/\s+/)
      console.log(queried_text)
      await setwordsArray(queried_text)
      


      // update wordColors array with a new words array.
      let updatedWordColors = Array(wordsArray.length).fill('untouched');
      updatedWordColors[0] = 'touching'
      await setWordColors(updatedWordColors)

            // Introduce a delay of 5 seconds before doing further actions
    setTimeout(async () => {
      await setLoading(false)
    }, 1500);

    })
    .catch(error => {
      console.error("Error fetching data:", error);
      setLoading(false); // Set loading to false in case of an error
    });
  }


  const resetStates = () => {
    //  reset states
      // move the passage display back to the top.
    pRef.current.scrollTop = 0;
    setTime(0);

    addToWordsRight(0);
    setCorrectKeyStrokes(0);
    setWordIndex(0);
    setResultsPopup(false);
    setText('')
  }


  const handleKeyDown = (event) => {
    // Check if the key pressed is the spacebar (key code 32)
    if (event.keyCode === 32) {
      event.preventDefault();
      let textResult = event.target.value.slice(0,event.target.value.length)

      // check if the resulting text equals the current word.
      let updatedwordStatus = [...wordColors];
      if(textResult === wordsArray[wordIndex]){
        // set the text to correct.
        updatedwordStatus[wordIndex] = 'correct';
        addToWordsRight(wordsRight + 1);

        // add keystrokes

        setCorrectKeyStrokes((CorrectkeyStrokes) + wordsArray[wordIndex].length + 1)

      }
      else{
        // the inputted word does not match the original.
        updatedwordStatus[wordIndex] = 'incorrect';
      }

      // set the next word to the proper class.
      updatedwordStatus[wordIndex + 1] = 'touching';
      setWordColors(updatedwordStatus);
      // move to the next space.
      
      if ((wordIndex + 1) % 10 === 0 && wordIndex !== 0){
        // scrool down
        scrollDownOneLine();

      }

      setWordIndex(wordIndex + 1);

      console.log(wordIndex + 1, wordsArray.length)
      if (wordIndex + 1 === wordsArray.length){
       
        // stop the time
        alterTimer(false)
        setResultsPopup(true);
      }

      setText("");
      event.target.value = ""
    }
  };



  const scrollDownOneLine = () => {
    if (pRef.current) {
      // Get the computed style of the text element
      const style = window.getComputedStyle(pRef.current);
  
      // Extract the font size and line height
      const fontSize = parseFloat(style.fontSize); // Convert to numeric value
      const lineHeight = parseFloat(style.lineHeight);

      // If lineHeight is 'normal', use a default multiplier (e.g., 1.2)
      let scrollHeight = isNaN(lineHeight) ? fontSize * 1.2 : lineHeight;
   

      pRef.current.scrollTop += scrollHeight;
    }
  };


  // compare text each time a user types into the text area.  
  const compareText = (event) => {
      startTimer();

      // text inputted
      let gatherText = event.target.value;

    
      let comparisonString = wordsArray[wordIndex].slice(0,gatherText.length);
      let updatedWordColors = [...wordColors];

      if(comparisonString === gatherText){
        
        // the word is correct, so properly highlight it
        updatedWordColors[wordIndex] = 'touching';

        // update the array of clasess
        setWordColors(updatedWordColors);
        

      }else{
        // the word they are typed is incorrect, make it red.

        updatedWordColors[wordIndex] = 'touching-incorrect'
        setWordColors(updatedWordColors)
      }

      // allow the user to see the text in the text box
      setText(gatherText);
  }


  // this will run each time "timerRunning" is altered
  useEffect(() => {
      let interval;
  
      // if the time is running is on then run this
      if (timerRunning) {

        // interval is a reference to a function/instance that will be call every second  
        interval = setInterval(() => {
          setTime(prevTime => prevTime + 1);
        }, 1000);
      }
  
      return () => clearInterval(interval);

    }, [timerRunning]);






  return (

    <div>
        {loading ? (
      // Loading screen or spinner while data is being fetched
      <div className="easy-container"><LoadingIcons.TailSpin className = "loading-icon-practice"/></div>
    ) : ( 
    <div className = "easy-container">


      <div className={`resultsPopup ${resultsPopUp ? 'open' : ''}`}>
      
        <div className="results-content">
          <div className = "results-content-header">
            <h1>Your WPM: {Math.floor((CorrectkeyStrokes/5) /(time/60))}</h1>
          </div>
          
          <h2 className = "results-text">Final Time<br/>{formatTime(time)}</h2>
          <h2 className = "results-text">Words Right<br/>{wordsRight}</h2>
          <h2 className = "results-text">Words Wrong<br/>{wordsArray.length - wordsRight}</h2>
          <h2 className = "results-text">Total Words<br/>{wordsArray.length}</h2>
          <div className = "results-text">  <button onClick={() => resetPractice()}>Retry</button></div>
        
          <div className = "results-text"><button onClick = {() => newPassageAndReset()}>New Text</button></div>

        </div>

      </div>

      <div className = "clock-newpassage-container">|
      
      <span className = 'clock-object'>{formatTime(time)}</span>
        
      <button className="new-passage-button" onClick={() => newPassageAndReset()}><AiOutlineReload/></button>

      </div>


      <div className ="easy-display-container">

          <p className = "sample-text" ref = {pRef}> 
          {wordsArray.map((word,index) => (

            <React.Fragment key={index}>
            <span className={wordColors[index]}>
              {word}
            </span>
            {index !== wordsArray.length - 1 && (index + 1) % 10 === 0 && <br />}
            {index !== wordsArray.length - 1 && (index + 1) % 10 !== 0 && ' '}
            </React.Fragment>


          ))}
          </p>

      </div>

      <textarea onChange = {compareText} name = "typingArea" className = "textbox-area" value = {usertext} onKeyDown={handleKeyDown}>


      </textarea>

    </div>
      )}
        
      
    </div>
  
  )
}



export default Practice;