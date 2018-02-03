const MAIN_CSS = chrome.runtime.getURL("darken_ps.css"); //Voll-qualifizierter Pfad zur "dunklen" CSS-Datei
const POD_CSS = chrome.runtime.getURL("darken_podcast.css"); //Voll-qualifizierter Pfad zur "dunklen" CSS-Datei für de Podcast-Seite
var firstLoad = true;

function _podcastHelper(iFrame, element) {
    iFrame.contentWindow.document.getElementsByTagName("head")[0].appendChild(element);
}

function onToggleMode(request, sender) {
    if (request == "toDark") { //Wenn auf dunkel gewechselt werden soll
        var element = document.createElement("link");
        element.setAttribute("id", "darkmode"); //id, um es später wieder zu finden
        element.setAttribute("rel", "stylesheet");
        element.setAttribute("type", "text/css");
        element.setAttribute("href", MAIN_CSS);

        document.getElementsByTagName("head")[0].appendChild(element); //hänge an den Head an

        hasIFrame = document.getElementsByTagName("iframe")[0];
        if (hasIFrame) {
            var element2 = document.createElement("link");
            element2.setAttribute("id", "darkmode"); //id, um es später wieder zu finden
            element2.setAttribute("rel", "stylesheet");
            element2.setAttribute("type", "text/css");
            element2.setAttribute("href",POD_CSS);
            hasIFrame.addEventListener("load", _podcastHelper(hasIFrame, element2));
            if (firstLoad) {
                firstLoad = false;
            } else {
                _podcastHelper(hasIFrame, element2);
            }
        }

        chrome.storage.local.set({isDark: true});
    } else { //also wenn auf normal gewechselt werden soll

        document.getElementById("darkmode").remove(); //entferne vorher erstelltes link-Element aus DOM

        hasIFrame = document.getElementsByTagName("iframe")[0]
        if (hasIFrame) {
            hasIFrame.contentWindow.document.getElementById("darkmode").remove();
        }

        chrome.storage.local.set({isDark: false});
    }
}

chrome.runtime.sendMessage("show the damn icon"); // Sende irgendwas zum Background, um dort die TabID zu haben
chrome.runtime.onMessage.addListener(onToggleMode); //Sobald das Content-Script eine Message erhält, onToggleMode ausführen

// Antworten-Button Fix
var comments = document.getElementsByClassName("comment-body");
for (i=0; i < comments.length; i++) {
    commBodies[i].parentNode.children[2].setAttribute("class","comments-buttons");
}
