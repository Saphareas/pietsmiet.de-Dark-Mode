/**
 * Copyright (C) 2018 Fabian Große
 * Released under the GNU GENERAL PUBLIC LICENSE 3
 * https://github.com/Saphareas/pietsmiet.de-Dark-Mode/blob/master/LICENSE
 */

if (typeof browser == "undefined") {
    var browser = chrome;
}

function updateTheme(tab) {
    browser.storage.local.get(null, (item) => {
        if (item.isDark === true) {
            browser.tabs.sendMessage(tab.id, {isDark:true})
            browser.pageAction.setIcon({
                tabId: tab.id,
                path: {
                    19: "icons/action-19.png",
                    38: "icons/action-38.png"
                }
            });
        }
        else {
            browser.tabs.sendMessage(tab.id, {isDark:false})
            browser.pageAction.setIcon({
                tabId: tab.id,
                path: {
                    19: "icons/action-off-19.png",
                    38: "icons/action-off-38.png"
                }
            });
        }
    });
}

function toggleTheme(tab) {
    browser.storage.local.get(null, (item) => {
        browser.storage.local.set({ isDark: !item.isDark });
        updateTheme(tab);
    });
}

function init(tab) {
    if (tab.url.includes("pietsmiet.de")) {
        updateTheme(tab);
        browser.pageAction.show(tab.id);
    }
}

browser.tabs.onUpdated.addListener((id, info, tab) => {
    init(tab);
});

browser.pageAction.onClicked.addListener(toggleTheme);
