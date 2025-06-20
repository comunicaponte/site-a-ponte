(function () {
  const fadeObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
      } else {
        entry.target.classList.remove("visible");
      }
    });
  });
  document.querySelectorAll(".fade-up").forEach(el => {
    fadeObserver.observe(el);
  });
})();
