/*

This javascript file is used to hold a default screenreader
to use for testing. Summarize.js can return much more human sounding voices,
but this is built in and won't get rate-limited.

*/

// The speechsynthesis utterance
const screenReader = new SpeechSynthesisUtterance();

// Converts given text to speech
function textToSpeech(givenText) {
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(givenText);
    window.speechSynthesis.speak(utterance);
}

// Stops screen reader
function stopScreenreader() {
    window.speechSynthesis.cancel();
    screenReader.text = "Cancelling screen reader";
    window.speechSynthesis.speak(screenReader);
    screenReaderActive = false;
}