const MAIN_CSS = chrome.runtime.getURL("darken_ps.css"); //Voll-qualifizierter Pfad zur "dunklen" CSS-Datei
const POD_CSS = chrome.runtime.getURL("darken_podcast.css"); //Voll-qualifizierter Pfad zur "dunklen" CSS-Datei für de Podcast-Seite
var isFirstLoad = true;

function _podcastHelper() {
    var title = document.getElementsByTagName("title")[0].innerText;
    if (title.includes("Podcast")) {
        window.addEventListener("load", function() {_podcastHelper(element2);});
        var element2 = document.createElement("link");
        element2.setAttribute("id", "darkmode"); //id, um es später wieder zu finden
        element2.setAttribute("rel", "stylesheet");
        element2.setAttribute("type", "text/css");
        element2.setAttribute("href", POD_CSS);
        var iFrame = document.getElementById("blockrandom");
        iFrame.contentWindow.document.getElementsByTagName("html")[0].appendChild(element2);
    }
}

function onToggleMode(request, sender) {
    if (request == "toDark") { //Wenn auf dunkel gewechselt werden soll
        var element = document.createElement("link");
        element.setAttribute("id", "darkmode"); //id, um es später wieder zu finden
        element.setAttribute("rel", "stylesheet");
        element.setAttribute("type", "text/css");
        element.setAttribute("href", MAIN_CSS);
        document.getElementsByTagName("head")[0].appendChild(element); //hänge an den Head an
        if (isFirstLoad) {
            window.addEventListener("load", function() {_podcastHelper();});
            isFirstLoad = false;
        } else {
            _podcastHelper();
        }

        chrome.storage.local.set({isDark: true});
    } else { //also wenn auf normal gewechselt werden soll
        document.getElementById("darkmode").remove(); //entferne vorher erstelltes link-Element aus DOM

        var title = document.getElementsByTagName("title")[0].innerText;
        if (title.includes("Podcast")) {
            hasIFrame = document.getElementsByClassName("contentpane")[0].children[0];
            if (hasIFrame) {
                hasIFrame.contentWindow.document.getElementById("darkmode").remove();
            }
        }

        chrome.storage.local.set({isDark: false});
    }
}

chrome.runtime.sendMessage("show the damn icon"); // Sende irgendwas zum Background, um dort die TabID zu haben
chrome.runtime.onMessage.addListener(onToggleMode); //Sobald das Content-Script eine Message erhält, onToggleMode ausführen

// Antworten-Button Fix
window.addEventListener("load", function() { //läuft, wenn die Seite geladen wurde
    setTimeout(function() { //1 sec Delay, weil Kommentare erst nachträglich geladen werden
        var comments = document.getElementsByClassName("comment-body");
        for (i=0; i < comments.length; i++) {
            comments[i].parentNode.children[2].setAttribute("class","comments-buttons");
        }
    }, 1000);
});
