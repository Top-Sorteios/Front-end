
import { EMAIL, SERVER_NAME, TOKEN, mostrarAlert } from "./CONSTANTES.js";

document.addEventListener("DOMContentLoaded", async () => {
  const token = TOKEN;
  const email = EMAIL;

  // Carregar prêmios
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

  // Carregar número de participantes
  try {
    const premioSurpresa = document.getElementById("premio-surpresa").checked
      ? 1
      : 0;

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

    const participantesCount = document.getElementById("numero-participantes");
    participantesCount.textContent = `Total de participantes: ${numeroParticipantes}`;
  } catch (error) {
    console.error("Erro ao carregar número de participantes:", error);
  }

  // Realizar sorteio
  document
    .getElementById("realizar-sorteio-btn")
    .addEventListener("click", async () => {
      const selectedPremioSku = document.getElementById("premios-select").value;
      const premioSurpresa = document.getElementById("premio-surpresa").checked
        ? 1
        : 0;

      if (!selectedPremioSku) {
        mostrarAlert("Não foi possível realizar o sorteio. Selecione um prêmio para continuar.", 'fas fa-circle-xmark');
        return;
      }

      try {
        const sortearResponse = await fetch(`${SERVER_NAME}sorteios/sortear`, {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            sorteio_surpresa: premioSurpresa,
            email_autenticado: email,
            codigo_sku: selectedPremioSku,
          }),
        });

        if (!sortearResponse.ok) {
          throw new Error("Falha ao realizar sorteio");
        }

        const resultadoSorteio = await sortearResponse.json();
        document.getElementById(
          "turma-sorteada"
        ).textContent = `Turma: ${resultadoSorteio.turma}`;
        document.getElementById(
          "nome-sorteado"
        ).textContent = `Aderido: ${resultadoSorteio.nome}`;
      } catch (error) {
        console.error("Erro ao realizar sorteio:", error);
        mostrarAlert("Erro ao realizar sorteio", 'fas fa-circle-xmark')
      }
    });
});
