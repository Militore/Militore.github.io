//Ability to maximize every image
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