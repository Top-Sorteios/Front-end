import { SERVER_NAME, TOKEN } from "./CONSTANTES.js";

const buttonNovoDestaque = document.querySelector("#button-novo-destaque");

window.addEventListener("load", async () => {
  const url = SERVER_NAME + "index/obter";
  const response = await fetch(url, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${TOKEN}`,
      "Content-Type": "application/json",
    },
  });
  const dadosDestaque = await response.json();
  console.log("dados", dadosDestaque);

  buttonNovoDestaque.disabled = dadosDestaque.length < 3 ? false : true;
  buttonNovoDestaque.title = dadosDestaque.length < 3 ? "Clique para adicionar uma nova imagem em destaque." : "Número máximo de imagens em destaque atingido. Máximo: 3 imagens.";
  buttonNovoDestaque.style.cursor = buttonNovoDestaque.disabled
    ? "not-allowed"
    : "pointer";

  buttonNovoDestaque.addEventListener("click", () => {
    window.location.assign("./gerenciamento-destaques.html");
  });

  createTableDestaque(dadosDestaque);
});

const createTableDestaque = async (destaque) => {
  const table = document.getElementById("table-destaques");

  destaque.forEach((itensDestaque) => {
    const tr = document.createElement("tr");
    const tdEditar = document.createElement("td");
    const linkEditar = document.createElement("a");
    const tdNome = document.createElement("td");
    const tdTitulo = document.createElement("td");
    const tdImagem = document.createElement("td");
    const tdCriadoPor = document.createElement("td");
    const tdCriadoEm = document.createElement("td");
    const img = document.createElement("img");
    const txtNome = document.createTextNode(itensDestaque.nome);
    const txtTitulo = document.createTextNode(itensDestaque.titulo);
    const txtEditar = document.createTextNode("Editar");
    const txtCriadoPor = document.createTextNode(itensDestaque.criadoPor);
    const txtCriadoEm = document.createTextNode(
      `${itensDestaque.criadoEm.split("T")[0].split("-").reverse().join("/")} ${
        itensDestaque.criadoEm.split("T")[1].split(".")[0]
      }`
    );

    tr.setAttribute("class", "hover-cor");
    img.setAttribute("src", `data:image/webp;base64,${itensDestaque.imagem}`);
    tdNome.setAttribute("class", "filtrarNome");
    linkEditar.setAttribute("href", "#");
    linkEditar.setAttribute("idmarca", itensDestaque.id);

    table.appendChild(tr);
    tr.appendChild(tdEditar);
    tdEditar.appendChild(linkEditar);
    linkEditar.appendChild(txtEditar);
    tdNome.appendChild(txtNome);
    tr.appendChild(tdNome);
    tdTitulo.appendChild(txtTitulo);
    tr.appendChild(tdTitulo);
    tdImagem.appendChild(img);
    tr.appendChild(tdImagem);
    tr.appendChild(tdCriadoPor);
    tdCriadoPor.appendChild(txtCriadoPor);
    tr.appendChild(tdCriadoEm);
    tdCriadoEm.appendChild(txtCriadoEm);

    linkEditar.addEventListener("click", () => {
      sessionStorage.setItem("idDestaques", itensDestaque.id);
      window.location.assign(
        "../gestao-dos-destaques/gerenciamento-destaques.html"
      );
    });
  });
};
