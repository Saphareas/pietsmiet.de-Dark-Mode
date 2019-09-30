/**
 * Copyright (C) 2018 Fabian Große
 * Released under the GNU GENERAL PUBLIC LICENSE 3
 * https://github.com/Saphareas/pietsmiet.de-Dark-Mode/blob/master/LICENSE
 */

function changeImg() {
    if (this.firstChild.src.includes('before.jpeg')) {
      this.firstChild.src = 'after.jpeg' }
    else {
      this.firstChild.src = 'before.jpeg' }
}

document.addEventListener("DOMContentLoaded", function() {
    document.getElementById("bla").addEventListener("click", changeImg);
});
