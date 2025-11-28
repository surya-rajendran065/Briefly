/*

This javascript file is used to hold a default screenreader
to use for testing. Summarize.js can return much more human sounding voices,
but this is built in and won't get rate-limited.

*/

// The speechsynthesis utterance
const screenReader = new SpeechSynthesisUtterance();
const synth = window.speechSynthesis;

// Converts given text to speech
function textToSpeech(givenText) {
    synth.cancel();
    setText(givenText);
    synth.speak(screenReader);
    // This is used to call a function once it's finished
    return screenReader;
}

// Stops screen reader
function stopScreenreader() {
    synth.cancel();
    setText("Cancelling screen reader");
    synth.speak(screenReader);
    screenReaderActive = false;
}

// Sets screenreader's text
function setText(text) {
    screenReader.text = text;
}

// Sets the built-in screenreader to the most human sounding voice
synth.addEventListener("voiceschanged", () => {
    screenReader.voice = synth.getVoices()[4];
});
