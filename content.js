/**
 * Copyright (C) 2018 Fabian Große
 * Released under the GNU GENERAL PUBLIC LICENSE 3
 * https://github.com/Saphareas/pietsmiet.de-Dark-Mode/blob/master/LICENSE
 */

// Bodge for cross-browser compatebility
if (typeof browser == "undefined") {
  var browser = chrome;
}

/****************
 **** Helpers ****
****************/

/** Run a function when document is ready */
function docReady(fn) {
  // see if DOM is already available
  if (document.readyState === "complete" || document.readyState === "interactive") {
    // call on next available tick
    setTimeout(fn, 1);
  } else {
    // attach fn to DOMContentLoaded
    document.addEventListener("DOMContentLoaded", fn);
  }
}

/** Convert a HTML string to a valid DOM element */
function html2node(str) {
  let temp = document.createElement("template");
  temp.innerHTML = str;
  return temp.content.firstChild;
}

/******************
**** Functions ****
******************/

/** Insert a theme switching button into the site */
function insertSwitch() {
  let html = '<a id="theme-switch" href="javascript:void(0)" onclick="toggleTheme()" class="flex relative px-4 cursor-pointer text-ps-lightest text-xl"><div class="flex"><div title=" " name=" " class="ion ion self-center"><svg style="width: 24px; height: 24px;" viewBox="0 0 24 24"><path d="M7.5,2C5.71,3.15 4.5,5.18 4.5,7.5C4.5,9.82 5.71,11.85 7.53,13C4.46,13 2,10.54 2,7.5A5.5,5.5 0 0,1 7.5,2M19.07,3.5L20.5,4.93L4.93,20.5L3.5,19.07L19.07,3.5M12.89,5.93L11.41,5L9.97,6L10.39,4.3L9,3.24L10.75,3.12L11.33,1.47L12,3.1L13.73,3.13L12.38,4.26L12.89,5.93M9.59,9.54L8.43,8.81L7.31,9.59L7.65,8.27L6.56,7.44L7.92,7.35L8.37,6.06L8.88,7.33L10.24,7.36L9.19,8.23L9.59,9.54M19,13.5A5.5,5.5 0 0,1 13.5,19C12.28,19 11.15,18.6 10.24,17.93L17.93,10.24C18.6,11.15 19,12.28 19,13.5M14.6,20.08L17.37,18.93L17.13,22.28L14.6,20.08M18.93,17.38L20.08,14.61L22.28,17.15L18.93,17.38M20.08,12.42L18.94,9.64L22.28,9.88L20.08,12.42M9.63,18.93L12.4,20.08L9.87,22.27L9.63,18.93Z"></path></svg></div></div></a>';
  // append to navbar
  let innerNav = document.body.querySelector("nav > div");
  innerNav.appendChild(html2node(html));
}

/** Change status of the theme. false -> true, true -> false
 * This function is called by the injected button.
 */
function toggleTheme() {
  let cookie = JSON.parse(window.localStorage.getItem("darken-ps-isDark"));
  window.localStorage.setItem("darken-ps-isDark", !cookie);
  let event = new CustomEvent("themeChanged", {detail: {isDark: !cookie}});
  document.dispatchEvent(event);
}

/** Insert/remove a style tag in the document to apply/remove the theme's CSS */
function applyTheme(msg) {
  let style = document.getElementById("darken-ps");
  if (msg && !style) { // if cookie is true and style tag does not already exist
    style = document.createElement("link");
    style.href = window.localStorage.getItem("darken-ps-url");
    style.rel = "stylesheet";
    style.id = "darken-ps";
    document.head.appendChild(style);
  }
  else if (!msg && style) { // else if cookie is false and style tag exists
    style.remove();
  }
}

/****************
**** Runtime ****
****************/

// make 'toggleTheme' available in the DOM
exportFunction(toggleTheme, window, {defineAs:"toggleTheme"});
// set absolute URL for the CSS
window.localStorage.setItem("darken-ps-url", browser.runtime.getURL("darken_ps.css"));
// listen for "themeChanged" events and apply/remove theme accordingly
document.addEventListener("themeChanged", (e) => {
  //console.debug(e.detail.isDark);
  try {
    applyTheme(e.detail.isDark);
  } catch (e) {
    console.debug(e);
  }
});

// when doc is ready, insert the switch and apply theme once
try {
  //console.debug("start extension");
  docReady(() => {insertSwitch(); applyTheme(JSON.parse(window.localStorage.getItem("darken-ps-isDark")))});
} catch (e) {
  console.debug(e);
}
