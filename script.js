document.addEventListener("DOMContentLoaded", () => {
  const carousel = document.querySelector(".carousel");
  const slides = document.querySelectorAll(".slide");
  const controlLinks = document.querySelectorAll(".controls a");
  const contents = document.querySelectorAll(".content");

  let i = 0;
  let intervalId;

  const updateActiveElements = (index) => {
    // Update carousel rotation
    carousel.style.rotate = `-${index * 90}deg`;
    // Update active slide
    document.querySelector(".slide.active").classList.remove("active");
    slides[index].classList.add("active");

    // Update active control link
    document.querySelector(".controls a.active").classList.remove("active");
    controlLinks[index].classList.add("active");

    // Update active content
    document.querySelector(".content.active").classList.remove("active");
    contents[index].classList.add("active");
  };

  const intervalFunction = () => {
    intervalId = setInterval(() => {
      i = (i + 1) % slides.length; // Increment and loop back to 0
      updateActiveElements(i);
    }, 3000);
  };

  intervalFunction();

  controlLinks.forEach((control, index) => {
    control.addEventListener("click", (event) => {
      event.preventDefault(); // Prevent default link behavior
      clearInterval(intervalId);
      i = index; // Update the current index
      updateActiveElements(index);
      intervalFunction();
    });
  });

  slides.forEach((slide) => {
    // Pause carousel rotation on image mouse enter within slide
    const img = slide.querySelector("img");
    if (img) {
      img.addEventListener("mouseenter", () => {
        clearInterval(intervalId);
        carousel.style.cursor = "pointer";
        // Optionally add additional behavior on image mouse enter
      });

      img.addEventListener("mouseleave", () => {
        intervalFunction();
        // Optionally add additional behavior on image mouse leave
      });
    }
  });
});
