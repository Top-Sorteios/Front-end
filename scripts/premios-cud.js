import {
  ACAO,
  MARCA_NOME,
  PREMIO_ID,
  SERVER_NAME,
  TOKEN,
  get,
  post,
  post,
  put,
  remove,
} from "./CONSTANTES.js";

const titulo = document.querySelector("#titulo");
const legend = document.querySelector("#form-legend");
const buttonSalvarEditar = document.querySelector("#enviar");

const form = document.querySelector("#form");
const formFieldset = document.querySelector("#form-fieldset");

const imagem = document.querySelector("#imagem");
const marcaId = document.querySelector("#marcaId");
const nome = document.querySelector("#nome");
const codigoSku = document.querySelector("#codigoSku");
const descricao = document.querySelector("#descricao");
const quantidade = document.querySelector("#quantidade");

const criadoPorLabel = document.querySelector("#criadoPorLabel");
const criadoPor = document.querySelector("#criadoPor");
const criadoEmLabel = document.querySelector("#criadoEmLabel");
const criadoEm = document.querySelector("#criadoEm");

marcaId.addEventListener("change", () => {
  console.log("MARCA VALUE " + marcaId.value);
  console.log(
    "MARCA ID " + marcaId.querySelector(`option[value="${marcaId.value}"]`).id
  );
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

  nome.value = premio.nome;
  imagem.setAttribute("base64img", premio.imagem);
  codigoSku.value = premio.codigoSku;
  descricao.value = premio.descricao;
  quantidade.value = premio.quantidade;
  criadoPor.value = premio.criadoPor;
  criadoEm.value = premio.criadoEm.split("T")[0];

  buttonSalvarEditar.textContent = "Salvar alterações";

  const buttonDeletar = document.createElement("button");
  buttonDeletar.textContent = "Deletar prêmio";
  buttonDeletar.addEventListener("click", (event) => {
    event.preventDefault();
    removerPremio();
    window.location.replace("./premios-da-semana.html");
  });
  formFieldset.appendChild(buttonDeletar);
};

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
      marcaId.appendChild(formOption);
    });

    if (marcaId.querySelector(`option[value="${MARCA_NOME}"]`)) {
      marcaId.querySelector(`option[value="${MARCA_NOME}"]`).selected = true;
    }
  }
};

const cadastrarPremio = async function () {
  let url = `${SERVER_NAME}premios/registrar`;
  const formData = new FormData();
  formData.append("nome", nome.value);
  formData.append("codigoSku", codigoSku.value);
  formData.append(
    "imagem",
    imagem.files.length > 0
      ? imagem.files[0]
      : new Blob([""], { type: "application/octet-stream" })
  );
  formData.append("quantidade", quantidade.value);
  formData.append("descricao", descricao.value);
  formData.append(
    "marcaId",
    parseInt(marcaId.querySelector(`option[value="${marcaId.value}"]`).id)
  );

  const request = await post("premios/registrar", formData, "formData");
  if (request.status === 201) {
    // const response = await request.json();
    // console.log(response);
    window.location.replace("./premios-da-semana.html");
  }
};

const editarPremio = async function () {
  const formData = new FormData();
  formData.append("nome", nome.value);
  formData.append("codigoSku", codigoSku.value);
  formData.append(
    "imagem",
    imagem.files.length > 0
      ? imagem.files[0]
      : new Blob([imagem.getAttribute("base64img")], { type: "image/*" })
  );

  formData.append("quantidade", quantidade.value);
  formData.append("descricao", descricao.value);
  formData.append(
    "marcaId",
    parseInt(marcaId.querySelector(`option[value="${marcaId.value}"]`).id)
  );
  const request = await put(`premios/editar/${PREMIO_ID}`, formData);

  if (request.status === 200) {
    // const response = await request.json();
    // console.log(response);
    window.location.replace("./premios-da-semana.html");
  }
};

const removerPremio = async function () {
  const request = await remove(`premios/${PREMIO_ID}`);
  if (request.status === 200) {
    window.location.replace("./premios-da-semana.html");
  }
};

//Adiciona as marcas disponiveis no select
window.addEventListener("load", () => {
  obterMarcasSelect();
});

//VERIFICA A AÇÃO A SER FEITA E MOLDA A PÁGINA A PARTIR DELA
switch (ACAO) {
  case "criar":
    titulo.textContent = "Adicionar novo prêmio da semana";
    legend.textContent = "Adicionar novo prêmio da semana";
    buttonSalvarEditar.textContent = "Adicionar novo prêmio";

    criadoEmLabel.remove();
    criadoPorLabel.remove();
    break;

  case "editar":
    obterPremio(PREMIO_ID);
    break;

  default:
    break;
}

form.addEventListener("submit", (event) => {
  event.preventDefault();
  switch (ACAO) {
    case "criar":
      cadastrarPremio();
      break;
    case "editar":
      editarPremio();
      break;
    default:
      window.location.replace("./premios-da-semana.html");
      break;
  }
});
