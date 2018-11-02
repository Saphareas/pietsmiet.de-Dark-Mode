var tabID; //global ist nicht schön

if (typeof browser == "undefined") {
    var browser = chrome;
}

function init() {
    var getStorage = browser.storage.local.get(null,
        function getStorageCallback(items){
            if ("isDark" in items) {
                if (items["isDark"]) {
                    _toggleDarkModeHelper();
                }
            }
            else {
                browser.storage.local.set({isDark: false});
            }
        }
    )
}

//Zeige die Page Action für den Tab, aus dem eine Message kam (pietsmiet.de)
function showPageAction(request, sender) {
    tabID = sender.tab.id;
    browser.pageAction.show(tabID);
    init();
}

function toggleDarkMode(actionTitle) {
    if (actionTitle == "Abdunkeln") {
        browser.tabs.sendMessage(tabID, "toDark"); //benachrichtige Content-Script, das Theme zu dunkel zu wechseln
        browser.pageAction.setTitle({tabId: tabID, title: "Zurück zu Normal"});
        browser.pageAction.setIcon({tabId: tabID, path: {
            19: "icons/action-19.png",
            38: "icons/action-38.png"
        }});
    }
    else {
        browser.tabs.sendMessage(tabID, "reset"); //benachrichtige Content-Script, das Theme zu normal zu wechseln
        browser.pageAction.setTitle({tabId: tabID, title: "Abdunkeln"});
        browser.pageAction.setIcon({tabId: tabID, path: {
            19: "icons/action-off-19.png",
            38: "icons/action-off-38.png"
        }});
    }
}

//Helper-Funktion, weil getTitle unbedingt einen Callback haben muss o.O
function _toggleDarkModeHelper() {
    //ruft toggleDarkMode auf und übergibt den aktuellen Action Title
    browser.pageAction.getTitle({tabId: tabID}, toggleDarkMode);
}

browser.runtime.onMessage.addListener(showPageAction); //Sobald das Background-Script eine Message erhält, showPageAction ausführen
browser.pageAction.onClicked.addListener(_toggleDarkModeHelper); //sobald auf die Page Action geklickt wurde, führe _toggleDarkModeHelper aus
