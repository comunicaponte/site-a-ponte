let codePreview = false;

const html = document.querySelector(".main_content");
const raw = document.querySelector(".main_raw");
const toogle = document.querySelector(".toogle_preview");

function setContent(page) {
  if (!html | !raw) {
    console.error("Main content element not found");
    return;
  }

  fetch(`pages/${page}.html`)
    .then((res) => res.text())
    .then((content) => {
      html.innerHTML = content;
      raw.textContent = content;
    });
}

function tooglePreview() {
  codePreview = !codePreview;
  setPreview();
}

function setPreview() {
  toogle.textContent = codePreview ? "👁️" : "</>";
  html.className = codePreview ? "hidden" : "";
  raw.className = codePreview ? "" : "hidden";
}

setContent("pages");
setPreview();
