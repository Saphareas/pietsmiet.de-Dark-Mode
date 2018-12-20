/**
 * Copyright (C) 2018 Fabian Große
 * Released under the GNU GENERAL PUBLIC LICENSE 3
 * https://github.com/Saphareas/pietsmiet.de-Dark-Mode/blob/master/LICENSE
 */

function handleOnInstalled(details) {
    let manifest = browser.runtime.getManifest();
    if (details.reason == "install") {
            browser.tabs.create({ url: "/onboarding-page.html" })
    }
    else if (details.reason == "update") {
        let notificationOptions = {
            type: "basic",
            title: `Version ${manifest.version} Changelog`,
            message: `${manifest.name} wurde aktualisiert. Das hat sich geändert:
• Bug auf der Landing page gefixt
• Ab jetzt lizensiert unter der GPLv3`,
            iconUrl: "icons/icon-48.png"
        };
        browser.notifications.create(notificationOptions);
    }
}

browser.runtime.onInstalled.addListener(handleOnInstalled);
