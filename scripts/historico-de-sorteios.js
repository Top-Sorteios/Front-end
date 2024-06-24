import { get } from "./CONSTANTES.js";

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
  sectionHistorico.classList.add("section-historico")
  sectionHistoricoSorteios.appendChild(sectionHistorico);

  const premioImagem = document.createElement("img");
  premioImagem.setAttribute(
    "src",
    historico.premioImagem != null
      ? `data:image/png;base64,${historico.premioImagem}`
      : "https://placehold.co/320x240"
  );
  sectionHistorico.appendChild(premioImagem);

  const premioNome = document.createElement("h2");
  premioNome.textContent = historico.premioNome;
  sectionHistorico.appendChild(premioNome);

  const sorteadoEm = document.createElement("p");
  sorteadoEm.textContent = historico.sorteadoEm;
  sectionHistorico.appendChild(sorteadoEm);

  const ganhadorNome = document.createElement("p");
  ganhadorNome.textContent = historico.ganhadorNome;
  sectionHistorico.appendChild(ganhadorNome);

  const turmaNome = document.createElement("p");
  turmaNome.textContent = historico.turmaNome;
  sectionHistorico.appendChild(turmaNome);

  const marcaNome = document.createElement("p");
  marcaNome.textContent = historico.marcaNome;
  sectionHistorico.appendChild(marcaNome);

  const premioSku = document.createElement("p");
  premioSku.textContent = historico.premioSku;
  sectionHistorico.appendChild(premioSku);

  const premioDescricao = document.createElement("p");
  premioDescricao.textContent = historico.premioDescricao;
  sectionHistorico.appendChild(premioDescricao);
};

window.addEventListener("load", () => {
  obterHistorico();
});
