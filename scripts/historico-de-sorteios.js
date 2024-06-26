import { get, post } from "./CONSTANTES.js";


const sectionHistoricoSorteios = document.querySelector("#historico-sorteios");

const containerTurmas = document.querySelector("#container-turmas");


const obterHistorico = async function () {
  const request = await get("sorteios/historico-sorteio", true);
  const response = await request.json();

  response.forEach((sorteio) => {
    console.log(sorteio);
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
    historico.premioImagem != null
      ? `data:image/png;base64,${historico.premioImagem}`
      : "https://placehold.co/320x240"
  );
  premioImagem.classList.add("historico__image");
  sectionHistorico.appendChild(premioImagem);

  const historicoTexto = document.createElement("div");
  historicoTexto.classList.add("section-historico-info");
  sectionHistorico.append(historicoTexto);

  const premioNome = document.createElement("h2");
  premioNome.textContent = historico.premioNome;
  historicoTexto.appendChild(premioNome);

  const sorteadoEm = document.createElement("p");
  sorteadoEm.textContent = historico.sorteadoEm;
  historicoTexto.appendChild(sorteadoEm);

  const ganhadorNome = document.createElement("p");
  ganhadorNome.textContent = historico.ganhadorNome;
  historicoTexto.appendChild(ganhadorNome);

  const turmaNome = document.createElement("p");
  turmaNome.textContent = historico.turmaNome;
  historicoTexto.appendChild(turmaNome);

  const marcaNome = document.createElement("p");
  marcaNome.textContent = historico.marcaNome;
  historicoTexto.appendChild(marcaNome);

  const premioSku = document.createElement("p");
  premioSku.textContent = historico.premioSku;
  historicoTexto.appendChild(premioSku);

  const premioDescricao = document.createElement("p");
  premioDescricao.textContent = historico.premioDescricao;
  historicoTexto.appendChild(premioDescricao);
};


const obterFiltroTurmas = async function () {
  const request = await get("turmas/obter", true);
  const response = await request.json();

  response.forEach((turma) => {
    console.log(turma);
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
  inputTurma.id = "check-turma"
  inputTurma.classList.add("checkbox-turma")
  sectionTurmas.appendChild(inputTurma)
  
  const h4Text = document.createElement("label");
  h4Text.htmlFor = "checkbox-turma"
  h4Text.textContent = turma.nome;
  sectionTurmas.appendChild(h4Text);
};

const buscarTurma = async function () {
 
  if (request.status == 200) {
    const response = await request.json();
    sectionHistoricoSorteios.innerHTML = "";
    response.forEach((sorteio) => {
      criarCardHistorico(sorteio);
    });
  } else {
    sectionHistoricoSorteios.innerHTML = "";
    sectionHistoricoSorteios.innerHTML = "<h2>Parece que essa turma não existe :(</h2>";

  }
};


window.addEventListener("load", () => {
  obterHistorico();
  obterFiltroTurmas();
});

checkbox.addEventListener("click", (event) => {
  event.preventDefault();
  buscarTurma();
});

