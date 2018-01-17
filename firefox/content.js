/*
 * ----------------------------------------------------------------------------
 * "THE BEER-WARE LICENSE" (Revision 17):
 * <saphareas@gmail.com> wrote this file.  As long as you retain this notice you
 * can use this stuff for any non-commercial purposes. If we meet some day,
 * and you think this stuff is worth it, you can buy me a beer in return.
 *                                                                Fabian Große
 * ----------------------------------------------------------------------------
 */

const CSS_FILE = browser.runtime.getURL("darken_ps.css"); //Voll-qualifizierter Pfad zur "dunklen" CSS-Datei

function onToggleMode(request, sender) {
    if (request == "toDark") { //Wenn auf dunkel gewechselt werden soll
        var element = document.createElement("link");
        element.setAttribute("id", "darkmode"); //id, um es später wieder zu finden
        element.setAttribute("rel", "stylesheet");
        element.setAttribute("type", "text/css");
        element.setAttribute("href", CSS_FILE);
        document.getElementsByTagName("head")[0].appendChild(element); //hänge an den Head an
        browser.storage.local.set({isDark: true});
    }
    else { //also wenn auf normal gewechselt werden soll
        document.getElementById("darkmode").remove(); //entferne vorher erstelltes link-Element aus DOM
        browser.storage.local.set({isDark: false});
    }
}

browser.runtime.sendMessage("show the damn icon"); // Sende irgendwas zum Background, um dort die TabID zu haben
browser.runtime.onMessage.addListener(onToggleMode); //Sobald das Content-Script eine Message erhält, onToggleMode ausführen

// Antworten-Button Fix
var comments = document.getElementsByClassName("comment-body");
for (i=0; i < comments.length; i++) {
    commBodies[i].parentNode.children[2].setAttribute("class","comments-buttons");
}
