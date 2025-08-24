const modal = document.getElementById('image-modal');
const modalImg = document.getElementById('modal-img');
const closeBtn = document.querySelector('.close');
const images = document.querySelectorAll('.gallery img');

// Show modal on image click
images.forEach(img => {
  img.addEventListener('click', () => {
    modal.style.display = 'block';
    modalImg.src = img.src;
  });
});

// Close modal on close button click
closeBtn.onclick = () => {
  modal.style.display = 'none';
};

// Close modal when clicking outside image
modal.onclick = (e) => {
  if (e.target === modal) {
    modal.style.display = 'none';
  }
};