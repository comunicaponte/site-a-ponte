let codePreview = false;
let htmlContent = "";
let styleContent = "";
let scriptContent = "";
let contentCode = "";

const html = document.querySelector(".main_content");
const raw = document.querySelector(".main_raw");
const toogle = document.querySelector(".toogle-preview");

function cleanText(text) {
  return text
    .replace(/\n/g, " ") // Troca todas as quebras de linha por espaço
    .replace(/\s+/g, " ") // Troca múltiplos espaços (ou tabs) por um único espaço
    .trim(); // Remove espaços nas pontas (início e fim)
}

async function setContent(page) {
  if (!html || !raw) {
    console.error("Main content element not found");
    return;
  }
  sessionStorage.setItem('activePage', page);

  try {
    await Promise.all([getHtml(page), getStyle(), getScript()]);

    contentCode = `<style>\n${styleContent}\n</style>\n${htmlContent}`;
    html.innerHTML = contentCode;

    const script = document.createElement("script");
    script.textContent = scriptContent;
    html.appendChild(script);
    contentCode += `\n<script>\n${scriptContent}\n</scrip>`;
    raw.textContent = html.innerHTML;
  } catch (error) {
    console.error("Erro ao carregar conteúdo:", error);
  }
  codePreview = false;
  setPreview();
}

async function getHtml(page) {
  const res = await fetch(`pages/${page}.html`);
  const content = await res.text();
  htmlContent = content;
}

async function getStyle() {
  const pageRes = await fetch(`css/page.css`);
  const tokensRes = await fetch(`css/tokens.css`);
  const pageCSS = await pageRes.text();
  const tokensCSS = await tokensRes.text();
  console.log(tokensCSS);
  const content = await replaceTokens(tokensCSS, pageCSS);
  styleContent = cleanText(content);
}

async function replaceTokens(tokensCSS, paginasCSS) {
  const tokens = {};
  
  // Extrai os tokens do :root
  tokensCSS.replace(/--([\w-]+):\s*(.*?);/g, (_, nome, valor) => {
    tokens[`var(--${nome})`] = valor.trim();
  });
console.log(JSON.stringify(tokens, null, 2));
  // Substitui os tokens no CSS das páginas
  const final = paginasCSS.replace(/var\(--[\w-]+\)/g, match => tokens[match] || match);
  return final;
}

async function getScript() {
  const res = await fetch(`js/page.js`);
  const content = await res.text();
  scriptContent = cleanText(content);
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
  navigator.clipboard
    .writeText(contentCode)
    .then(() => {
      alert("Texto copiado com sucesso!");
    })
    .catch((err) => {
      console.error("Erro ao copiar o texto: ", err);
    });
}

let activePage = sessionStorage.getItem('activePage') || "home";

setContent(activePage);
