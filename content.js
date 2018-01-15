const CSS_FILE = chrome.runtime.getURL("darken_ps.css");

var element = document.createElement("link");
element.setAttribute("rel", "stylesheet");
element.setAttribute("type", "text/css");
element.setAttribute("href", CSS_FILE);
document.getElementsByTagName("head")[0].appendChild(element);
