const CSS_FILE = chrome.runtime.getURL("darken_ps.css");

chrome.runtime.sendMessage("show the damn icon");

function onToggleMode(request, sender) {
    if (request == "toDark") {
        var element = document.createElement("link");
        element.setAttribute("id", "darkmode");
        element.setAttribute("rel", "stylesheet");
        element.setAttribute("type", "text/css");
        element.setAttribute("href", CSS_FILE);
        document.getElementsByTagName("head")[0].appendChild(element);
    }
    else {
        document.getElementById("darkmode").remove();
    }
}

chrome.runtime.onMessage.addListener(onToggleMode);
