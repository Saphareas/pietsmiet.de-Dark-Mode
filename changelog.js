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
• Alles wurde komplett neu geschrieben, d.h. alle alten Bugs wurden behoben und (hoffentlich bessere Performance)
• Diese Benachrichtigung wurde eingeführt`,
            iconUrl: "icons/icon-48.png"
        };
        browser.notifications.create(notificationOptions);
    }
}

browser.runtime.onInstalled.addListener(handleOnInstalled);
