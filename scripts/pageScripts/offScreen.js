// Handles messages from content scripts
function handleMessage(message, sender, sendResponse) {
    const data = message.data;
    if (message.target === "offScreen") {
        if (data.purpose === "start") {
            console.log("Starting...");
            console.log(recogniton);
            startAIAgent();
        }

        if (data.purpose === "stop") {
            console.log("Stopping...");
            stopAIAgent();
        }
    }
}
