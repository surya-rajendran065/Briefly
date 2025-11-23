// Listents to keyboard commands
chrome.commands.onCommand.addListener(async (command) => {
    // When user presses Ctrl+B
    let tab = await getCurrentTab();
    if (command === "summarize-page") {
        // Prints message alerting that Ctrl+B has been pressed
        chrome.scripting.executeScript({
            target: { tabId: tab.id },
            func: () => {
                console.log("Pressed Ctrl+B");
            },
        });
    }
});

// Gets the current tab
async function getCurrentTab() {
    const queryOptions = { active: true, currentWindow: true };
    const tabs = await chrome.tabs.query(queryOptions);
    return tabs[0];
}

// Logs a message within the console of the active tab
async function logMsg(msg) {
    let tab = await getCurrentTab();

    chrome.scripting.executeScript({
        target: { tabId: tab.id },
        func: () => {
            console.log(msg);
        },
    });
}

/* Executes a function in the current tab and returns 'true'
if no errors were present
*/
async function executeOnTab(callBack) {
    let tab = await getCurrentTab();
    let status = "Success";

    chrome.scripting.executeScript({
        target: { tabId: tab.id },
        func: callBack,
    });

    return status;
}

// For testing executeOnTab
function hi() {
    console.log("Hello World!");
}

// Handles messages from content.js
function handleMessage(message, sender, sendResponse) {
    executeOnTab(hi).then((result) => {
        sendResponse({ message: result });
    });
    return true;
}

// Adds event listener
chrome.runtime.onMessage.addListener(handleMessage);
