var tabID;

function showPageAction(request, sender) {
    tabID = sender.tab.id;
    chrome.pageAction.show(tabID);
}

chrome.runtime.onMessage.addListener(showPageAction);

function toggleDarkMode(actionTitle) {
    if (actionTitle == "Abdunkeln") {
        chrome.tabs.sendMessage(tabID, "toDark");
        chrome.pageAction.setTitle({tabId: tabID, title: "Zurück zu Normal"});
        chrome.pageAction.setIcon({tabId: tabID, path: {
            19: "icons/action-19.png",
            38: "icons/action-38.png"
        }});
    }
    else {
        chrome.tabs.sendMessage(tabID, "reset");
        chrome.pageAction.setTitle({tabId: tabID, title: "Abdunkeln"});
        chrome.pageAction.setIcon({tabId: tabID, path: {
            19: "icons/action-off-19.png",
            38: "icons/action-off-38.png"
        }});
    }
}

function _toggleDarkModeHelper() {
    chrome.pageAction.getTitle({tabId: tabID}, toggleDarkMode);
}

chrome.pageAction.onClicked.addListener(_toggleDarkModeHelper);
