function changeImg() {
    if (this.firstChild.src.includes('before.jpeg')) {
      this.firstChild.src = 'after.jpeg' }
    else {
      this.firstChild.src = 'before.jpeg' }
}

document.addEventListener("DOMContentLoaded", function() {
    document.getElementById("bla").addEventListener("click", changeImg);
});
