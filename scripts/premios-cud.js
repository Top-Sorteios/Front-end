import {
  ACAO,
  MARCA_NOME,
  PREMIO_ID,
  SERVER_NAME,
  get,
  put,
} from "./CONSTANTES.js";

const titulo = document.querySelector("#titulo");
const legend = document.querySelector("#form-legend");

const form = document.querySelector("#form");
const formSelect = document.querySelector("#selecionar-marca");
const marca = document.querySelector("#selecionar-marca");
const nomePremio = document.querySelector("#nome-premio");
const codigoSku = document.querySelector("#codigo-sku");
const descricaoPremio = document.querySelector("#descricao-premio");
const numeroPremio = document.querySelector("#numero-premio");
const criadoPor = document.querySelector("#criador");
const criadoEm = document.querySelector("#data-criacao");

marca.addEventListener("change", () => {
  console.log(marca.value);
  console.log(marca.querySelector(`option[value="${marca.value}"]`).id);
});

console.log({
  Ação: ACAO,
  "ID do prêmio": PREMIO_ID,
  "Nome da marca": MARCA_NOME,
});

//FAZ O GET COM BASE NO ID ARMAZENADO EM "PREMIO_ID"
const obterPremio = async function (id) {
  const request = await get(`premios/obter/${PREMIO_ID}`, true);
  if (request.ok) {
    const response = await request.json();
    //CHAMA A FUNÇÃO QUE PREENCHE AS ENTRADAS COM OS DADOS DO PRÊMIO CADASTRADO
    definirCampos(response);
  }
};

const definirCampos = function (premio) {
  //PREENCHE AS ENTRADAS COM OS DADOS VINDOS DO PARÂMETRO PRÊMIOS
  marca.querySelector(`option[value="${MARCA_NOME}"]`).selected = true;
  nomePremio.value = premio.nome;
  codigoSku.value = premio.codigoSku;
  descricaoPremio.value = premio.descricao;
  numeroPremio.value = premio.quantidade;
  criadoPor.value = premio.criadoPor;
  criadoEm.value = premio.criadoEm.split("T")[0];
};

//VERIFICA A AÇÃO A SER FEITA E MOLDA A PÁGINA A PARTIR DELA
switch (ACAO) {
  case "criar":
    titulo.textContent = "Adicionar novo prêmio da semana";
    legend.textContent = "Adicionar novo prêmio da semana";
    break;

  case "editar":
    titulo.textContent = "Editar prêmio da semana";
    legend.textContent = "Editar prêmio da semana";
    obterPremio(PREMIO_ID);
    break;

  default:
    break;
}

//FAZ O GET DAS MARCAS CADASTRADAS E EXIBE COMO OPÇÃO NO MENU DROPDOWN
const obterMarcasSelect = async function () {
  const request = await get("marcas/obter", true);
  if (request.ok) {
    const response = await request.json();
    response.forEach((marca) => {
      const formOption = document.createElement("option");
      formOption.value = marca.nome;
      formOption.textContent = marca.nome;
      formOption.id = marca.id;
      formSelect.appendChild(formOption);
    });
  }
};

const cadastrarPremio = async function () {
  let url = `${SERVER_NAME}premios/registrar`;

  const request = await fetch(url, {
    method: "POST",
  });
};

const editarPremio = async function () {
  const formData = new FormData();

  formData.append("nome", nomePremio.value);
  formData.append("codigoSku", codigoSku.value);
  formData.append("imagem", null);
  formData.append("quantidade", numeroPremio.value);
  formData.append("descricao", descricaoPremio.value);
  formData.append(
    "marcaId",
    marca.querySelector(`option[value="${marca.value}"]`).id
  );
  formData.append("criadoPor", criadoPor.value);
  formData.append("criadoEm", criadoEm.value);

  const request = await put(`premios/editar/${PREMIO_ID}`, formData);
  const response = await request.json();
  console.log(formData.get("nome"));
  console.log(formData.get("codigoSku"));
  console.log(formData.get("imagem"));
  console.log(formData.get("quantidade"));
  console.log(formData.get("descricao"));
  console.log(formData.get("marcaId"));
  console.log(formData.get("criadoPor"));
  console.log(formData.get("criadoEm"));
};

window.addEventListener("load", () => {
  obterMarcasSelect();
});

form.addEventListener("submit", (event) => {
  event.preventDefault();
  editarPremio();
});
