// Variables
let speechToTextResult;
let sentences;
let endAgent = false;

let timeHandler = new TimeOutHandler("noResponse, finalResult, fallBack");

const recogniton = createRecognition();

// Creates a SpeechRecogniton Object
function createRecognition() {
    const rec = new window.SpeechRecognition();
    rec.language = "en-US";
    rec.continuous = true;
    rec.interimResults = false;

    return rec;
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
}

// Played when AI Agent is cancelled and the user doesn't produce any noise
function stopAIAgentSound() {
    endAgent = true;
    playStopEffect();
    textToSpeech("Exiting AI Agent");
    recogniton.stop();
}

// Called once user has given input
function afterSpeech() {
    timeHandler.clearAllTime();
    endAgent = true;
    recogniton.stop();
    textToSpeech("Thank you");
}

/* Returns a formatted string of the sentences array to be sent to be
processed by the AI Agent */
function formattedSentences() {
    let formattedSentences = `${sentences.join(".")}.`;
    return formattedSentences;
}
/**
 * These are the event listeners that listen for
 * events from the user: when the user starts speaking,
 * when the user speaks a single sentence, and when the user is
 * done speaking
 */
recogniton.addEventListener("result", (event) => {
    speechToTextResult = event.results;

    clearTimeout(noResponse);

    const text = Array.from(speechToTextResult)
        .map((result) => result[0])
        .map((result) => result.transcript)
        .join("\n");

    timeHandler.setTime("finalResult", afterSpeech, 3);
    sentences = text.split("\n");
    console.log(text);
});

recogniton.addEventListener("speechstart", () => {
    console.log("Started speaking :)");
    timeHandler.setTime("fallback", afterSpeech, 10);
});

recogniton.addEventListener("speechend", () => {
    console.log("Finished speaking :)");
});
