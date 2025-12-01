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

/**
 * Agent Functions
 * These are functions that are needed when the content scripts cannot perform
 * a certain browser operation. They will send a message to the service
 * worker telling it to execute the specified function
 */

// List Current Tabs
async function listTabs() {
    let tabs = await chrome.tabs.query({});
    return tabs;
}

/**
 * End of Agent Function
 */

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
        func: (msg) => {
            console.log(msg);
        },
        args: [msg],
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
        func: (callBack) => {
            callBack;
        },
        args: [callBack],
    });

    return status;
}

// Handles messages from content scripts
function handleMessage(message, sender, sendResponse) {
    if ("func_message" in message) {
        if (message.func_message === "listTabs") {
            listTabs().then((result) => sendResponse({ tabs: result }));
        }
    } else {
        sendResponse({ response: "Not a function message" });
    }
    return true;
}

// Adds event listener
chrome.runtime.onMessage.addListener(handleMessage);
