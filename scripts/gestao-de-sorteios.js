import SERVER_NAME from "./CONSTANTES.js";

document.addEventListener('DOMContentLoaded', async () => {
    const token = sessionStorage.getItem("token");
    const email = sessionStorage.getItem("email");

    if (!token || !email) {
        alert('Usuário não autenticado');
        window.location.assign('../login.html');
        return;
    }

    const premiosSelect = document.getElementById('premios-select');
    const participantesList = document.getElementById('participantes-list');
    const realizarSorteioBtn = document.getElementById('realizar-sorteio-btn');
    const premioSurpresaCheckbox = document.getElementById('premio-surpresa');
    const turmaSorteadaElement = document.getElementById('turma-sorteada');
    const nomeSorteadoElement = document.getElementById('nome-sorteado');

    async function obterPremios() {
        try {
            const response = await fetch(`${SERVER_NAME}premios/obter`, {
                method: "GET",
                headers: {
                    "Authorization": `Bearer ${token}`,
                    "Content-Type": "application/json"
                }
            });

            if (!response.ok) {
                throw new Error('Falha ao obter prêmios');
            }

            const premios = await response.json();
            premios.forEach(premio => {
                const option = document.createElement('option');
                option.value = premio.codigoSku;
                option.textContent = premio.nome;
                premiosSelect.appendChild(option);
            });

        } catch (error) {
            console.error('Erro ao obter prêmios:', error);
        }
    }

    async function obterParticipantes() {
        try {
            const response = await fetch(`${SERVER_NAME}sorteios/participantes-do-sorteio`, {
                method: "GET",
                headers: {
                    "Authorization": `Bearer ${token}`,
                    "Content-Type": "application/json"
                }
            });

            if (!response.ok) {
                throw new Error('Falha ao obter participantes');
            }

            const participantes = await response.json();
            participantesList.innerHTML = '';
            participantes.forEach(participante => {
                const li = document.createElement('li');
                li.textContent = participante.nome;
                participantesList.appendChild(li);
            });

        } catch (error) {
            console.error('Erro ao obter participantes:', error);
        }
    }

    async function realizarSorteio() {
        const premioSelecionado = premiosSelect.value;
        const premioSurpresa = premioSurpresaCheckbox.checked;

        if (!premioSelecionado) {
            alert('Por favor, selecione um prêmio.');
            return;
        }

        try {
            const response = await fetch(`${SERVER_NAME}sorteios/sortear`, {
                method: "POST",
                headers: {
                    "Authorization": `Bearer ${token}`,
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    sorteio_surpresa: premioSurpresa,
                    email_administrador: email,
                    codigo_sku: premioSelecionado
                })
            });

            if (!response.ok) {
                throw new Error('Falha ao realizar sorteio');
            }

            const resultado = await response.json();
            turmaSorteadaElement.textContent = `Turma: ${resultado.turma}`;
            nomeSorteadoElement.textContent = `Aderido: ${resultado.nome}`;

        } catch (error) {
            console.error('Erro ao realizar sorteio:', error);
            alert('Erro ao realizar sorteio: ' + error.message);
        }
    }

    realizarSorteioBtn.addEventListener('click', realizarSorteio);

    await obterPremios();
    await obterParticipantes();
});
