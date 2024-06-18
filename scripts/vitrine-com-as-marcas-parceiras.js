import SERVER_NAME from "./CONSTANTES.js";

document.addEventListener('DOMContentLoaded', async () => {
    const token = sessionStorage.getItem("token");
    const email = sessionStorage.getItem("email");

    if (!token || !email) {
        alert('Usuário não autenticado');
        window.location.assign('../login.html');
        return;
    }

    async function obterSorteiosDaSemana() {
        try {
            const url = `${SERVER_NAME}sorteios/sorteios-da-semana`;
            const response = await fetch(url, {
                method: "GET",
                headers: {
                    "Authorization": `Bearer ${token}`,
                    "Content-Type": "application/json"
                }
            });

            if (!response.ok) {
                throw new Error('Falha ao obter sorteios da semana');
            }

            const sorteios = await response.json();
            const sorteiosContainer = document.getElementById('sorteios-container');

            sorteios.forEach(sorteio => {
                const sorteioElement = document.createElement('div');
                sorteioElement.classList.add('sorteios');

                sorteioElement.innerHTML = `
                    <div class="fotos">
                        <img src="${sorteio.imagem}" alt="Imagem do sorteio">
                    </div>
                    <div class="escrita">
                        <p>${sorteio.nome}</p>
                        <p>${sorteio.descricao}</p>
                    </div>
                `;

                sorteiosContainer.appendChild(sorteioElement);
            });

        } catch (error) {
            console.error('Erro ao obter sorteios da semana:', error);
        }
    }

    async function participarDoSorteio() {
        try {
            const url = `${SERVER_NAME}sorteios/participantes-do-sorteio`;
            const response = await fetch(url, {
                method: "POST",
                headers: {
                    "Authorization": `Bearer ${token}`,
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    sorteio_surpresa: false
                })
            });

            if (!response.ok) {
                throw new Error('Falha ao participar do sorteio');
            }

            const data = await response.json();
            alert('Participação no sorteio realizada com sucesso!');

        } catch (error) {
            console.error('Erro ao participar do sorteio:', error);
            alert('Erro ao participar do sorteio: ' + error.message);
        }
    }

    document.getElementById('participar-btn').addEventListener('click', participarDoSorteio);

    await obterSorteiosDaSemana();
});