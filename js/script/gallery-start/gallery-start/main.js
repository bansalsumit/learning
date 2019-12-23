var displayedImage = document.querySelector('.displayed-img');
var thumbBar = document.querySelector('.thumb-bar');

btn = document.querySelector('button');
var overlay = document.querySelector('.overlay');

/* Looping through images */
for (var i = 1; i <= 5; i++) {
  var newImage = document.createElement('img');
  newImage.setAttribute('src', 'file:///home/sumit/learning/js/script/gallery-start/gallery-start/images/pic' + i + '.jpg');
  thumbBar.appendChild(newImage);
  src= newImage.onclick = getSrc;
  displayedImage(src)
}


function getSrc(event) {
  return event.target.getAttribute('src');
}

function displayedImageSet(event) {
  displayedImage.setAttribute('src', event.target.getAttribute('src'));
}
/* Wiring up the Darken/Lighten button */
btn.onclick = displayedImageStyleChanger;
function displayedImageStyleChanger(e) {
  if(e.target.getAttribute('class') == 'dark') {
    e.target.setAttribute('class', 'light');
    e.target.textContent = 'light';
    overlay.style.backgroundColor = 'rgba(0,0,0,0.5)';
  }
  else {
    e.target.setAttribute('class', 'dark');
    e.target.textContent = 'dark';
    overlay.style.backgroundColor = 'rgba(0,0,0,0)';
  }
}
