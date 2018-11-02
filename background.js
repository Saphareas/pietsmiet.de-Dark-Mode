if (typeof browser == "undefined") {
    var browser = chrome;
}
const MAIN_CSS = browser.runtime.getURL("darken_ps.css"); //Voll-qualifizierter Pfad zur "dunklen" CSS-Datei
const POD_CSS = browser.runtime.getURL("darken_podcast.css"); //Voll-qualifizierter Pfad zur "dunklen" CSS-Datei für de Podcast-Seite

function updateTheme(tab) {
    let details = {
        allFrames: true,
        file: "/darken_ps.css",
        cssOrigin: "user",
        runAt: "document_start"
    }
    browser.storage.local.get(null, (item) => {
        if (item.isDark === true) {
            browser.tabs.insertCSS(tab.id, details);
            browser.pageAction.setIcon({
                tabId: tab.id,
                path: {
                    19: "icons/action-19.png",
                    38: "icons/action-38.png"
                }
            });
        }
        else {
            browser.tabs.removeCSS(tab.id, details);
            browser.pageAction.setIcon({
                tabId: tab.id,
                path: null
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
