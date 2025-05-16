const catalogBtn = document.querySelector("#catalog")
const catalogOpen = document.querySelector("#catalogOpen")
const arrow = document.querySelector(".catalog span")
const firmBtn = document.querySelector("#firm-open")
const firmMenu = document.querySelector("#firms-menu")

catalogBtn.onclick = function() {
    catalogOpen.classList.toggle("menu-close")
    arrow.classList.toggle("arrow")
}

firmBtn.onclick = function() {
    firmMenu.classList.toggle("menu-open")
}

document.addEventListener('DOMContentLoaded', function() {
    var brickButton = document.getElementById('brick');
    var tileButton = document.getElementById('tile');
    var cards = document.querySelectorAll('.card');
  
    brickButton.addEventListener('click', function() {
      cards.forEach(function(card) {
        card.classList.add('brick-card');
      });
    });
  
    tileButton.addEventListener('click', function() {
      cards.forEach(function(card) {
        card.classList.remove('brick-card');
      });
    });
});
  

function myFunction() {
    // Get the checkbox
    var checkBox = document.getElementById("myCheck");
    // Get the output text elements
    var text1 = document.getElementById("same");
    var text2 = document.getElementById("different");
  
    // If the checkbox is checked, change the font weight of text1
    if (checkBox.checked == true) {
        text2.style.fontWeight = "600";
        text1.style.fontWeight = "normal"; // Reset font weight of text2
    } else {
        text1.style.fontWeight = "600";
        text2.style.fontWeight = "normal"; // Reset font weight of text1
    }
}

