/**
 * Copyright (C) 2018 Fabian Große
 * Released under the GNU GENERAL PUBLIC LICENSE 3
 * https://github.com/Saphareas/pietsmiet.de-Dark-Mode/blob/master/LICENSE
 */

if (typeof browser == "undefined") {
    var browser = chrome;
}

function handleMessage(msg) {
    let head = document.head;
    let style = document.getElementById("darken-ps");
    if (msg.isDark === true && !style) {
        style = document.createElement("link");
        style.href = browser.runtime.getURL("darken_ps.css");
        style.rel = "stylesheet";
        style.id = "darken-ps";
        head.append(style);
    }
    else if (msg.isDark === false) {
        style.remove();
    }
}

browser.runtime.onMessage.addListener(handleMessage);
