import { SET_ACAO, SET_MARCA_NOME, SET_PREMIO_ID, get } from "./CONSTANTES.js";

const tableBody = document.querySelector("#table-body");

const obterPremios = async function () {
  const request = await get("premios/obter", true);
  const response = await request.json();
  console.log(response);
  response.reverse().forEach((premio) => {
    criarLinha(premio);
  });
};

const criarLinha = function (premio) {
  const tableRow = document.createElement("tr");
  tableRow.setAttribute('class', 'hover-cor')
  tableBody.appendChild(tableRow);

  const tableCellEditar = document.createElement("td");
  tableCellEditar.textContent = "Editar";
  tableCellEditar.classList.add("tce__td");
  tableCellEditar.addEventListener("click", () => {
    SET_ACAO("editar");
    SET_PREMIO_ID(premio.id);
    SET_MARCA_NOME(premio.marcaNome);
    window.location.assign("./premios-cud.html");
  });
  tableRow.appendChild(tableCellEditar);

  const tableCellMarca = document.createElement("td");
  tableCellMarca.textContent = premio.marcaNome;
  tableRow.appendChild(tableCellMarca);

  const tableCellNomePremio = document.createElement("td");
  tableCellNomePremio.textContent = premio.nome;
  tableRow.appendChild(tableCellNomePremio);

  const tableCellCriadoPor = document.createElement("td");
  tableCellCriadoPor.textContent = premio.criadoPor;
  tableRow.appendChild(tableCellCriadoPor);

  const tableCellCriadoEm = document.createElement("td");
  tableCellCriadoEm.textContent = premio.criadoEm;
  tableRow.appendChild(tableCellCriadoEm);
};

window.addEventListener("load", () => {
  SET_ACAO(null);
  SET_PREMIO_ID(null);
  SET_MARCA_NOME(null);
  obterPremios();
});

const buttonNovoPremio = document.querySelector("#novo-premio");
buttonNovoPremio.addEventListener("click", () => {
  SET_ACAO("criar");
  window.location.assign("./premios-cud.html");
});

const buttonSair = document.getElementById('sair-pagina')
buttonSair.addEventListener('click', () => {
    sessionStorage.clear()
    window.location.replace("https://green-dune-0cd28a70f.5.azurestaticapps.net/")
})