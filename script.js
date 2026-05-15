const menuToggle = document.querySelector(".menu-toggle");
const navLinks = document.querySelector(".nav-links");
const figureButtons = document.querySelectorAll(".figure-zoom");
const imageModal = document.querySelector("#image-modal");
const modalImage = imageModal?.querySelector("img");
const modalClose = imageModal?.querySelector(".modal-close");

if (menuToggle && navLinks) {
  menuToggle.addEventListener("click", () => {
    const isOpen = navLinks.classList.toggle("is-open");
    menuToggle.setAttribute("aria-expanded", String(isOpen));
  });

  navLinks.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      navLinks.classList.remove("is-open");
      menuToggle.setAttribute("aria-expanded", "false");
    });
  });
}

if (imageModal && modalImage && modalClose) {
  const closeModal = () => {
    imageModal.classList.remove("is-open");
    imageModal.setAttribute("aria-hidden", "true");
    modalImage.src = "";
    modalImage.alt = "";
  };

  figureButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const image = button.querySelector("img");

      if (!image) return;

      modalImage.src = image.currentSrc || image.src;
      modalImage.alt = image.alt;
      imageModal.classList.add("is-open");
      imageModal.setAttribute("aria-hidden", "false");
      modalClose.focus();
    });
  });

  modalClose.addEventListener("click", closeModal);

  imageModal.addEventListener("click", (event) => {
    if (event.target === imageModal) {
      closeModal();
    }
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && imageModal.classList.contains("is-open")) {
      closeModal();
    }
  });
}
