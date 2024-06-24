import {
  ACAO,
  MARCA_NOME,
  PREMIO_ID,
  SERVER_NAME,
  TOKEN,
  get,
  put,
  remove,
} from "./CONSTANTES.js";

const titulo = document.querySelector("#titulo");
const legend = document.querySelector("#form-legend");
const buttonSalvarEditar = document.querySelector("#button-salvar-editar");

const inserirImagem = document.querySelector("#inserir-imagem").files[0];
const form = document.querySelector("#form");
const formFieldset = document.querySelector("#form-fieldset");
const formSelect = document.querySelector("#selecionar-marca");
const marca = document.querySelector("#selecionar-marca");
const nomePremio = document.querySelector("#nome-premio");
const codigoSku = document.querySelector("#codigo-sku");
const descricaoPremio = document.querySelector("#descricao-premio");
const numeroPremio = document.querySelector("#numero-premio");

const criadoPorLabel = document.querySelector("#criador-label");
const criadoPor = document.querySelector("#criador");
const criadoEmLabel = document.querySelector("#data-criacao-label");
const criadoEm = document.querySelector("#data-criacao");

marca.addEventListener("change", () => {
  console.log(marca.value);
  console.log(marca.querySelector(`option[value="${marca.value}"]`).id);
});

console.log({
  Ação: ACAO,
  "ID do prêmio": PREMIO_ID,
  "Nome da marca": MARCA_NOME,
  TOKEN: TOKEN,
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
  titulo.textContent = "Editar prêmio da semana";
  legend.textContent = "Editar prêmio da semana";

  nomePremio.value = premio.nome;
  codigoSku.value = premio.codigoSku;
  descricaoPremio.value = premio.descricao;
  numeroPremio.value = premio.quantidade;
  criadoPor.value = premio.criadoPor;
  criadoEm.value = premio.criadoEm.split("T")[0];

  buttonSalvarEditar.textContent = "Salvar alterações";
  buttonSalvarEditar.addEventListener("click", (event) => {
    event.preventDefault();
    editarPremio();
  });

  const buttonDeletar = document.createElement("button");
  buttonDeletar.textContent = "Deletar prêmio";
  buttonDeletar.addEventListener("click", (event) => {
    event.preventDefault();
    removerPremio();
    // window.location.replace("./premios-da-semana.html");
  });
  formFieldset.appendChild(buttonDeletar);
};

//VERIFICA A AÇÃO A SER FEITA E MOLDA A PÁGINA A PARTIR DELA
switch (ACAO) {
  case "criar":
    titulo.textContent = "Adicionar novo prêmio da semana";
    legend.textContent = "Adicionar novo prêmio da semana";
    buttonSalvarEditar.textContent = "Adicionar novo prêmio";
    buttonSalvarEditar.addEventListener("click", (event) => {
      event.preventDefault();
      cadastrarPremio();
    });
    criadoEmLabel.remove();
    criadoPorLabel.remove();
    break;

  case "editar":
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

    if (marca.querySelector(`option[value="${MARCA_NOME}"]`)) {
      marca.querySelector(`option[value="${MARCA_NOME}"]`).selected = true;
    }
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
  formData.append("imagem", inserirImagem);
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

const removerPremio = async function () {
  const request = await remove(`premios/${PREMIO_ID}`);
  const response = await request.json();
  console.log(response);
};

window.addEventListener("load", () => {
  obterMarcasSelect();
});

form.addEventListener("submit", (event) => {
  event.preventDefault();
  editarPremio();
});
