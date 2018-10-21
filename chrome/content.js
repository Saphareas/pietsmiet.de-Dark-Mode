const MAIN_CSS = chrome.runtime.getURL("darken_ps.css"); //Voll-qualifizierter Pfad zur "dunklen" CSS-Datei
const POD_CSS = chrome.runtime.getURL("darken_podcast.css"); //Voll-qualifizierter Pfad zur "dunklen" CSS-Datei für de Podcast-Seite
var isFirstLoad = true;

function _podcastHelper() {
    var title = document.getElementsByClassName("mr-3 active")[0].innerText;
    if (title.includes("Podcast")) {
        var element2 = document.createElement("link");
        element2.setAttribute("id", "darkmode"); //id, um es später wieder zu finden
        element2.setAttribute("rel", "stylesheet");
        element2.setAttribute("type", "text/css");
        element2.setAttribute("href", POD_CSS);
        var iFrame = document.getElementById("blockrandom");
        iFrame.contentWindow.document.getElementsByTagName("html")[0].appendChild(element2);
        console.log("Podcast darkend");
    }
}

function onToggleMode(request, sender) {
    if (request == "toDark") { //Wenn auf dunkel gewechselt werden soll
        var element = document.createElement("link");
        element.setAttribute("id", "darkmode"); //id, um es später wieder zu finden
        element.setAttribute("rel", "stylesheet");
        element.setAttribute("type", "text/css");
        element.setAttribute("href", MAIN_CSS);
        document.getElementsByTagName("html")[0].appendChild(element); //hänge an das DOM an
        if (isFirstLoad) {
            window.addEventListener("load", function() {_podcastHelper();});
            isFirstLoad = false;
            _podcastHelper(); /* wirft fast immer einen Error, aber ohne ist es buggy */
        } else {
            _podcastHelper();
        }
        chrome.storage.local.set({isDark: true});
    }
    else { //also wenn auf normal gewechselt werden soll
        document.getElementById("darkmode").remove(); //entferne vorher erstelltes link-Element aus DOM
        var title = document.getElementsByClassName("mr-3 active")[0].innerText;
        if (title.includes("Podcast")) {
            var iFrame = document.getElementById("blockrandom");
            iFrame.contentWindow.document.getElementById("darkmode").remove();
            console.log("Podcast lightend");
        }
        chrome.storage.local.set({isDark: false});
    }
}

chrome.runtime.sendMessage("show the damn icon"); // Sende irgendwas zum Background, um dort die TabID zu haben
chrome.runtime.onMessage.addListener(onToggleMode); //Sobald das Content-Script eine Message erhält, onToggleMode ausführen
