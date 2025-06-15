function setContent(page) {
  const main = document.querySelector(".main_content");
  if (!main) {
    console.error("Main content element not found");
    return;
  }

  fetch(`pages/${page}.html`)
    .then((res) => res.text())
    .then((html) => {
      main.innerHTML = html;
    });
}

setContent("pages");
