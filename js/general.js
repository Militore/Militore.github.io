// Ability to maximize every image without jquery
const images = document.querySelectorAll('img');

images.forEach((image) => {
  if (!image.classList.contains('no-expand')) {
    image.addEventListener('click', (event) => {
      const overlay = document.createElement('div');
      overlay.className = 'fullscreen-overlay';
      document.body.appendChild(overlay);

      const fullScreenImage = document.createElement('img');
      fullScreenImage.src = image.src;
      fullScreenImage.className = 'fullscreen-image';
      overlay.appendChild(fullScreenImage);

      overlay.addEventListener('click', () => {
        overlay.remove();
      });
    });
  }
});

// Hide and show navbar with jquery
let hideClicked = false;

$("#nav-hide").click(function(){
  if(!hideClicked) {
    $("#nav-hide").text('v');
    hideClicked=true;
  }
  else {
    $("#nav-hide").text('^');
    hideClicked=false;
  }
  $("nav").slideToggle(400);
});

// Change site theme with jquery
const defHeadText = $("body").css("--head-text");
const defMainText = $("body").css("--main-text");

var changeTheme = function(head, headSec, mainSec, main, headText, mainText){
  $("body").get(0).style.setProperty("--head-color", head);
  $("body").get(0).style.setProperty("--head-sec-color", headSec);
  $("body").get(0).style.setProperty("--main-sec-color", mainSec);
  $("body").get(0).style.setProperty("--main-color", main);
  if(headText==null){headText = defHeadText;}
  if(mainText==null){mainText = defMainText;}
  $("body").get(0).style.setProperty("--head-text", headText)
  $("body").get(0).style.setProperty("--main-text", mainText)
}

$("#change-theme").click(function(){
  if($("#change-theme").val() == 1) {
    changeTheme("#222831", "#393E46", "#948979", "#DFD0B8");
  }
  if($("#change-theme").val() == 2) {
    changeTheme("#37353E", "#44444E", "#715A5A", "#D3DAD9");
  }
  if($("#change-theme").val() == 3) {
    changeTheme("#D9C4B0", "#CFAB8D", "#BBDCE5", "#ECEEDF", "#000", "#000");
  }
});