let currentSlide = 0;

const slides = document.querySelectorAll(".slide");
const totalSlides = slides.length;

function changeSlide(direction) {
  currentSlide += direction;
  if (currentSlide < 0) {
    currentSlide = totalSlides - 1; // Loop to last slide
  } else if (currentSlide >= totalSlides) {
    currentSlide = 0; // Loop to first slide
  }
  updateSlidePosition();
}

function updateSlidePosition() {
  const slidesContainer = document.querySelector(".slides");
  slidesContainer.style.transform = `translateX(-${currentSlide * 100}%)`;
}

setInterval(() => {
  changeSlide(1); // Auto slide every 3 seconds
}, 1000000);
