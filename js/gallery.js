const gallery = document.querySelector('.gallery');
const mediaElements = gallery.querySelectorAll('img, video');
const prevButton = document.querySelector('#prev-button');
const nextButton = document.querySelector('#next-button');

let currentIndex = 0;

mediaElements.forEach((media, index) => {
  if (index !== 0) {
    media.style.display = 'none';
  }
});

prevButton.addEventListener('click', () => {
  currentIndex--;
  if (currentIndex < 0) {
    currentIndex = mediaElements.length - 1;
  }
  updateMedia();
});

nextButton.addEventListener('click', () => {
  currentIndex++;
  if (currentIndex >= mediaElements.length) {
    currentIndex = 0;
  }
  updateMedia();
});

function updateMedia() {
  mediaElements.forEach((media) => {
    media.style.display = 'none';
  });
  mediaElements[currentIndex].style.display = 'inline-block';
}