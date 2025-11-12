// This script is a placeholder for further enhacements
console.log("Content.js Script injected into tab");

// Summarizes the content of a webpage
async function summarizeContent() {
            const response = await fetch('https://summary-chrome-extension-backend.onrender.com/', {
                method: 'POST',
                headers: {
                'Content-Type': 'application/json'
                },
                body: JSON.stringify(document.body.innerText)
            })

            const data = await response.json();
            
            summarizedContent = data.summary;
            
            return data.summary;
}

// Converts given text to speech
function textToSpeech(givenText) {
    const utterance = new SpeechSynthesisUtterance(givenText);
    window.speechSynthesis.speak(utterance);
}

// Stops screen reader
function stopScreenreader() {
    window.speechSynthesis.cancel();
    window.speechSynthesis.speak(new SpeechSynthesisUtterance("Canceling Screen reader"));
    screenReaderActive = false;
}

// Summarized Content
let summarizedContent = "";

// Checks how many times user pressed Control
let timesControlPressed = 0;

// Boolean tells if screen reader is active or not
let screenReaderActive = false;

summarizeContent().then((result) => {
    summarizedContent = result;
});

document.addEventListener("keydown", (event) => {
    
    if(event.key === "Control") {
        if(screenReaderActive) {
            stopScreenreader();
            timesControlPressed = 0
        } else {
            timesControlPressed++;
        }
    }

    if (timesControlPressed === 3) {
        
        if(!screenReaderActive) {
            textToSpeech(summarizedContent);
            screenReaderActive = true;
        }

    }

    console.log(timesControlPressed, screenReaderActive, event.key); // Debugging


})