import { get, post } from "./CONSTANTES.js";

const inputBuscarTurma = document.querySelector("#buscar-turma");
const buttonBuscarTurma = document.querySelector("#botao-buscar-turma");

const sectionHistoricoSorteios = document.querySelector("#historico-sorteios");

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

const buscarTurma = async function () {
  const turmaNome = { turmaNome: inputBuscarTurma.value };
  const request = await post(
    "sorteios/historico-sorteio/turma",
    { turmaNome: inputBuscarTurma.value },
    "json"
  );
  

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
});

buttonBuscarTurma.addEventListener("click", (event) => {
  event.preventDefault();
  buscarTurma();
});
