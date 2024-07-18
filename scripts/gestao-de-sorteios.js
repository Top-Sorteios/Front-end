import { EMAIL, SERVER_NAME, TOKEN, mostrarAlert } from "./CONSTANTES.js";

document.addEventListener("DOMContentLoaded", async () => {
  const token = TOKEN;
  const email = EMAIL;

  if (!token) {
    console.error("Token de autenticação não encontrado.");
    mostrarAlert(
      "Erro de autenticação. Por favor, faça login novamente.",
      "fas fa-circle-xmark"
    );
    return;
  }

  const obterPremios = async () => {
    try {
      const premiosResponse = await fetch(`${SERVER_NAME}premios/obter`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      if (!premiosResponse.ok) {
        throw new Error("Falha ao obter prêmios");
      }

      const premios = await premiosResponse.json();
      const premiosSelect = document.getElementById("premios-select");

      premios.forEach((premio) => {
        const option = document.createElement("option");
        option.value = premio.codigoSku;
        option.textContent = premio.nome;
        premiosSelect.appendChild(option);
      });
    } catch (error) {
      console.error("Erro ao carregar prêmios:", error);
    }
  };

  const obterNumeroParticipantes = async () => {
    try {
      const premioSurpresa = document.getElementById("premio-surpresa").checked;

      const participantesResponse = await fetch(
        `${SERVER_NAME}sorteios/participantes-do-sorteio`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ sorteio_surpresa: premioSurpresa }),
        }
      );

      if (!participantesResponse.ok) {
        throw new Error("Falha ao obter número de participantes");
      }

      const participantesData = await participantesResponse.json();
      const numeroParticipantes = participantesData.total_participando;

      const participantesCount = document.getElementById(
        "numero-participantes"
      );
      participantesCount.textContent = `Total de participantes: ${numeroParticipantes}`;
    } catch (error) {
      console.error("Erro ao carregar número de participantes:", error);
    }
  };

  await obterPremios();
  await obterNumeroParticipantes();

  document
    .getElementById("premio-surpresa")
    .addEventListener("change", obterNumeroParticipantes);
  document
    .getElementById("premios-select")
    .addEventListener("change", obterNumeroParticipantes);

  document
    .getElementById("realizar-sorteio-btn")
    .addEventListener("click", async () => {
      mostrarAlert("Sorteio sendo realizado. Aguarde!", "fas fa-circle-check");
      const selectedPremioSku = document.getElementById("premios-select").value;
      const premioSurpresa = document.getElementById("premio-surpresa").checked;

      if (!selectedPremioSku) {
        mostrarAlert(
          "Não foi possível realizar o sorteio. Selecione um prêmio para continuar.",
          "fas fa-circle-xmark"
        );
        return;
      }

      const requestBody = {
        sorteio_surpresa: premioSurpresa,
        codigo_sku: selectedPremioSku,
        email_autenticado: email,
      };

      try {
        document.getElementById("realizar-sorteio-btn").disabled = true;
        document.body.style.cursor = "wait";
        console.log("Dados enviados para o sorteio:", requestBody);
        const sortearResponse = await fetch(`${SERVER_NAME}sorteios/sortear`, {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(requestBody),
        });

        if (!sortearResponse.ok) {
          let errorData;
          try {
            errorData = await sortearResponse.json();
          } catch (jsonError) {
            const textError = await sortearResponse.text();
            console.error("Erro detalhado:", textError);
            mostrarAlert(`Erro: ${textError}`, "fas fa-circle-xmark");
            throw new Error("Falha ao realizar sorteio");
          }

          if (errorData.errorCode === 400) {
            mostrarAlert(`Erro: ${errorData.mensagem}`, "fas fa-circle-xmark");
          } else {
            mostrarAlert("Falha ao realizar sorteio", "fas fa-circle-xmark");
          }
          throw new Error("Falha ao realizar sorteio");
        }

        const resultadoSorteio = await sortearResponse.json();
        document.getElementById(
          "turma-sorteada"
        ).textContent = `Turma: ${resultadoSorteio.turma}`;
        document.getElementById(
          "nome-sorteado"
        ).textContent = `Aderido: ${resultadoSorteio.nome}`;

        await obterNumeroParticipantes();
      } catch (error) {
        console.error("Erro ao realizar sorteio:", error);
      } finally {
        document.body.style.cursor = "auto";
        document.getElementById("realizar-sorteio-btn").disabled = false;
      }
    });
});
