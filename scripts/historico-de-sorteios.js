import { get, post } from "./CONSTANTES.js";

const sectionHistoricoSorteios = document.querySelector("#historico-sorteios");
const containerTurmas = document.querySelector("#container-turmas");
let turmasSelecionadas = new Array();

const obterHistorico = async function () {
  const request = await get("sorteios/historico-sorteio", true);
  const response = await request.json();

  response.forEach((sorteio) => {
    criarCardHistorico(sorteio);
  });
};

const criarCardHistorico = function (historico) {
  const sectionHistorico = document.createElement("div");
  sectionHistorico.classList.add("section-historico");
  sectionHistoricoSorteios.appendChild(sectionHistorico);

  const premioImagem = document.createElement("img");
  premioImagem.setAttribute(
    "src",
    historico.premioImagem
      ? `data:image/png;base64,${historico.premioImagem}`
      : "https://placehold.co/320x240"
  );
  premioImagem.addEventListener("error", ()=>{
    premioImagem.setAttribute("src", "https://placehold.co/320x240")
  })
  premioImagem.classList.add("historico__image");
  sectionHistorico.appendChild(premioImagem);

  const historicoTexto = document.createElement("div");
  historicoTexto.classList.add("section-historico-info");
  sectionHistorico.append(historicoTexto);

  const premioNome = document.createElement("h2");
  premioNome.textContent = historico.premioNome;
  premioNome.classList.add("txt-size-medium-small");
  historicoTexto.appendChild(premioNome);

  const sorteadoEm = document.createElement("p");
  sorteadoEm.innerHTML = `<span class="bold txt-size-normal">Data: </span>${historico.sorteadoEm.split("T")[0].split("-").reverse().join("/")}`;
  sorteadoEm.classList.add("txt-size-small");
  historicoTexto.appendChild(sorteadoEm);

  const ganhadorNome = document.createElement("p");
  ganhadorNome.innerHTML = `<span class="bold txt-size-normal">Nome: </span>${historico.ganhadorNome}`;
  ganhadorNome.classList.add("txt-size-small");
  historicoTexto.appendChild(ganhadorNome);

  const turmaNome = document.createElement("p");
  turmaNome.innerHTML = `<span class="bold txt-size-normal">Turma: </span>${historico.turmaNome}`;
  turmaNome.classList.add("txt-size-small");
  historicoTexto.appendChild(turmaNome);

  const marcaNome = document.createElement("p");
  marcaNome.innerHTML = `<span class="bold txt-size-normal">Marca: </span>${historico.marcaNome}`;
  marcaNome.classList.add("txt-size-small");
  historicoTexto.appendChild(marcaNome);

  const premioSku = document.createElement("p");
  premioSku.innerHTML = `<span class="bold txt-size-normal">SKU: </span>${historico.premioSku}`;
  premioSku.classList.add("txt-size-small");
  historicoTexto.appendChild(premioSku);

  const premioDescricao = document.createElement("p");
  premioDescricao.innerHTML = `<span class="bold txt-size-normal">Descrição: </span>${historico.premioDescricao}`;
  premioDescricao.classList.add("txt-size-small");
  historicoTexto.appendChild(premioDescricao);
};

const obterFiltroTurmas = async function () {
  const request = await get("turmas/obter", true);
  const response = await request.json();

  response.forEach((turma) => {
    criarFiltroDeTurmas(turma);
  });
};

const criarFiltroDeTurmas = function (turma) {
  const sectionTurmas = document.createElement("div");
  sectionTurmas.classList.add("lines-turmas");
  sectionTurmas.title = turma.nome;
  containerTurmas.appendChild(sectionTurmas);

  const inputTurma = document.createElement("input");
  inputTurma.type = "checkbox";
  inputTurma.id = turma.nome;
  inputTurma.name = "turmas";
  inputTurma.value = turma.nome;
  inputTurma.classList.add("checkbox-turma");
  inputTurma.addEventListener("click", () => {
    buscarTurma();
  });
  sectionTurmas.appendChild(inputTurma);

  const h4Text = document.createElement("label");
  h4Text.htmlFor = turma.nome;
  h4Text.textContent = turma.nome;
  sectionTurmas.appendChild(h4Text);
};

const buscarTurma = async function () {
  await testando();

  const request = await post(
    "/sorteios/historico-sorteio/obter/lista-de-turmas",
    { turmas: turmasSelecionadas },
    "json"
  );

  const response = await request.json();

  if (request.json == null) {
    sectionHistoricoSorteios.innerHTML = "";
    sectionHistoricoSorteios.innerHTML =
      "<h2>Parece que essa turma não existe :(</h2>";
  }

  if (request.status == 200) {
    sectionHistoricoSorteios.innerHTML = "";

    response.forEach((sorteio) => {
      criarCardHistorico(sorteio);
    });
  } else {
    sectionHistoricoSorteios.innerHTML = "";
    sectionHistoricoSorteios.innerHTML =
      "<h2>Parece que essa turma não existe :(</h2>";
  }
};

document.querySelector("#filtrar-icon").addEventListener("click", () => {
  document.querySelector("#filtrar").style.display = "block";
  document.querySelector("#fechar-filtrar-icon svg").style.display = "block";
});

document.querySelector("#fechar-filtrar-icon").addEventListener("click", () => {
  document.querySelector("#filtrar").style.display = "none";
});

const testando = async function () {
  let turmas = document.getElementsByName("turmas");

  const checkedValues = Array.from(turmas)
    .filter((checkbox) => checkbox.checked)
    .map((checkbox) => checkbox.value);

  if (checkedValues.length === 0) {
    obterHistorico();
    return;
  }

  if (checkedValues.length > 0) {
    turmasSelecionadas = checkedValues;
  }
};

window.addEventListener("load", () => {
  obterHistorico();
  obterFiltroTurmas();
});
