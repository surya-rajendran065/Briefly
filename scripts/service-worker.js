chrome.commands.onCommand.addListener(async (command) => {
    if (command === 'summarize-page') {
        let tab = await getCurrentTab();

        chrome.scripting.executeScript({
            target: { tabId: tab.id },
            func: getPageContent
        })
    }
})

async function getCurrentTab() {
    const queryOptions = { active: true, currentWindow: true};
    const tabs = await chrome.tabs.query(queryOptions);
    return tabs[0];
}

function getPageContent() {
    console.log(document.body.innerText);
}