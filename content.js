if (typeof browser == "undefined") {
    var browser = chrome;
}

function handleMessage(msg) {
    let head = document.head;
    if (msg.isDark === true) {
        let style = document.createElement("link");
        style.href = browser.runtime.getURL("darken_ps.css");
        style.rel = "stylesheet";
        style.id = "darken-ps";
        head.append(style);
    }
    else {
        let style = document.getElementById("darken-ps");
        head.removeChild(style);
    }
}

browser.runtime.onMessage.addListener(handleMessage);
