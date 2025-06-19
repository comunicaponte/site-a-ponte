let codePreview = false;
let contentCode;

const html = document.querySelector(".main_content");
const raw = document.querySelector(".main_raw");
const toogle = document.querySelector(".toogle-preview");

function cleanText(text) {
  return text
    .replace(/\n/g, ' ')        // Troca todas as quebras de linha por espaço
    .replace(/\s+/g, ' ')       // Troca múltiplos espaços (ou tabs) por um único espaço
    .trim();                    // Remove espaços nas pontas (início e fim)
}

function setContent(page) {
  let style;
  if (!html | !raw) {
    console.error("Main content element not found");
    return;
  }

 fetch(`css/page.css`)
    .then((res) => res.text())
    .then((content) => {
      contentCode = `<style>\n${cleanText(content)}\n</style>\n`;
    });
  
  fetch(`pages/${page}.html`)
    .then((res) => res.text())
    .then((content) => {
      html.innerHTML = content;
      contentCode += content;
      raw.textContent = contentCode;
    });
}

function tooglePreview() {
  codePreview = !codePreview;
  setPreview();
}

function setPreview() {
  toogle.textContent = codePreview ? "👁️" : "</>";
  html.className = codePreview ? "hidden" : "";
  raw.parentElement.className = codePreview ? "" : "hidden";
}

function copyContent() {
  navigator.clipboard.writeText(contentCode)
    .then(() => {
      console.log('Texto copiado com sucesso!');
    })
    .catch(err => {
      console.error('Erro ao copiar o texto: ', err);
    });
}

setContent("pages");
setPreview();
