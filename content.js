const CSS_FILE = chrome.runtime.getURL("darken_ps.css"); //Voll-qualifizierter Pfad zur "dunklen" CSS-Datei

chrome.runtime.sendMessage("show the damn icon"); // Sende irgendwas zum Background, um dort die TabID zu haben

function onToggleMode(request, sender) {
    if (request == "toDark") { //Wenn auf dunkel gewechselt werden soll
        var element = document.createElement("link");
        element.setAttribute("id", "darkmode"); //id, um es später wieder zu finden
        element.setAttribute("rel", "stylesheet");
        element.setAttribute("type", "text/css");
        element.setAttribute("href", CSS_FILE);
        document.getElementsByTagName("head")[0].appendChild(element); //hänge an den Head an
    }
    else { //also wenn auf normal gewechselt werden soll
        document.getElementById("darkmode").remove(); //entferne vorher erstelltes link-Element aus DOM
    }
}

chrome.runtime.onMessage.addListener(onToggleMode); //Sobald das Content-Script eine Message erhält, onToggleMode ausführen

// Antworten-Button Fix
var comments = document.getElementsByClassName("comment-body");
for (i=0; i < comments.length; i++) {
    commBodies[i].parentNode.children[2].setAttribute("class","comments-buttons");
}
