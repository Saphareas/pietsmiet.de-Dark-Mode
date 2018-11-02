if (typeof browser == "undefined") {
    var browser = chrome;
}

const MAIN_CSS = browser.runtime.getURL("darken_ps.css"); //Voll-qualifizierter Pfad zur "dunklen" CSS-Datei
const POD_CSS = browser.runtime.getURL("darken_podcast.css"); //Voll-qualifizierter Pfad zur "dunklen" CSS-Datei für de Podcast-Seite

