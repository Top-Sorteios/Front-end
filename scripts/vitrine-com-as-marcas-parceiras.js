import { EMAIL, SERVER_NAME, TOKEN, mostrarAlert } from "./CONSTANTES.js";

document.addEventListener("DOMContentLoaded", async () => {
  const token = TOKEN;
  const email = EMAIL;

  async function obterMarcasDaVitrine() {
    try {
      const url = `${SERVER_NAME}marcas/vitrine`;
      const response = await fetch(url, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Falha ao obter marcas da vitrine");
      }

      const marcas = await response.json();
      const sorteiosContainer = document.getElementById("sorteios-container");

      sorteiosContainer.innerHTML = ""; // Limpa o container antes de adicionar novo conteúdo

      marcas.forEach((marca) => {
        const sorteioElement = document.createElement("div");
        sorteioElement.className = "sorteios";

        const fotosDiv = document.createElement("div");
        fotosDiv.className = "fotos";

        const img = document.createElement("img");
        img.src = marca.logo
          ? `data:image/png;base64,${marca.logo}`
          : "../../assets/images/placeholder-files/placeholder.png";
        img.alt = "Logo da marca";
        img.addEventListener("error", () => {
          img.src = "../../assets/images/placeholder-files/placeholder.png";
        });
        fotosDiv.appendChild(img);

        const escritaDiv = document.createElement("div");
        escritaDiv.className = "escrita";

        const p1 = document.createElement("p");
        p1.textContent = marca.nome;
        escritaDiv.appendChild(p1);

        const p2 = document.createElement("p");
        p2.textContent = marca.descricao;
        escritaDiv.appendChild(p2);

        sorteioElement.appendChild(fotosDiv);
        sorteioElement.appendChild(escritaDiv);

        sorteiosContainer.appendChild(sorteioElement);
      });
    } catch (error) {
      console.error("Erro ao obter marcas da vitrine:", error);
    }
  }

  document
    .getElementById("participar-btn")
    .addEventListener("click", async () => {
      try {
        const url = `${SERVER_NAME}usuarios/sorteio/participar`;
        const response = await fetch(url, {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "text/plain",
          },
          body: email,
        });

        if (!response.ok) {
          const errorResponse = await response.text();
          console.error("Erro do servidor:", errorResponse);
          throw new Error("Você já está participando do sorteio.");
        }

        const data = await response.text();
        console.log("Resposta do servidor:", data);
        mostrarAlert(
          "Você foi inscrito(a) no sorteio com sucesso!",
          "fas fa-circle-check"
        );
      } catch (error) {
        console.error("Erro ao participar do sorteio:", error);
        mostrarAlert(
          "Não foi possível realizar a ação: " + error.message,
          "fas fa-circle-xmark"
        );
      }
    });

  await obterMarcasDaVitrine();
});
