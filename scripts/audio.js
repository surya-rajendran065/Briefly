// Sound effects
let startEffect = new Audio(chrome.runtime.getURL("audio/Start.mp3"));
let stopEffect = new Audio(chrome.runtime.getURL("audio/Stop.mp3"));

// Undefined Variables
let noResponse;
let speechToTextResult;
let sentences;
let endAgent = false;
const recogniton = createRecognition();

// Reduces the need to type 'navigator.mediaDevices.getUserMedia()' each time
const getUserMedia = navigator.mediaDevices.getUserMedia.bind(
    navigator.mediaDevices
);

// Creates a SpeechRecogniton Object
function createRecognition() {
    const rec = new window.SpeechRecognition();
    rec.language = "en-US";
    rec.continuous = true;
    rec.interimResults = true;
    return rec;
}

// Waits for a sepcified amount of time
async function Sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
}

// Sound effect to indicate AI Agent has started listening
function playStartEffect() {
    startEffect.play();
}

// Plays the sound effect indicating the AI has stopped listening
function playStopEffect() {
    stopEffect.play();
}

// Played after user holds f2 for 1 second
async function startAIAgent() {
    endAgent = false;
    playStartEffect();
    await Sleep(500);
    let intro = textToSpeech("Hello, I am your AI Agent, how can I help you?");

    // Waits for screenreader to finish before taking in input
    intro.onend = () => {
        if (!endAgent) {
            recogniton.start();
        }
    };

    // If the user says nothing, it will stop the listening
    noResponse = setTimeout(stopAIAgentSound, 10000);

    return sentences;
}

// Played when AI Agent is cancelled and the user doesn't produce any noise
function stopAIAgentSound() {
    endAgent = true;
    playStopEffect();
    textToSpeech("Exiting AI Agent");

    recogniton.stop();
}

//
function afterSpeech() {
    endAgent = true;
    recogniton.stop();
    textToSpeech("Thank you");
    console.log(sentences);
}

recogniton.addEventListener("result", (event) => {
    speechToTextResult = event.results;
    clearTimeout(noResponse);
    const text = Array.from(speechToTextResult)
        .map((result) => result[0])
        .map((result) => result.transcript)
        .join("\n");
    sentences = text.split("\n");
    console.log(text);
});

recogniton.addEventListener("speechstart", () => {
    console.log("Started speaking");
    setTimeout(afterSpeech, 10000);
});

recogniton.addEventListener("speechend", () => {
    console.log("Finished speaking :)");
});
