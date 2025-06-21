(function () {
  const fadeObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.remove("invisible");
      } else {
        entry.target.classList.add("invisible");
      }
    });
  });
  document.querySelectorAll(".fade-up").forEach((el) => {
    fadeObserver.observe(el);
  });
})();
