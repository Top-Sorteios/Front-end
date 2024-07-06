import { SERVER_NAME } from "./CONSTANTES.js";

document.addEventListener('DOMContentLoaded', async () => {
    const token = sessionStorage.getItem("token");
    const email = sessionStorage.getItem("email");

    async function obterMarcasDaVitrine() {
        try {
            const url = `${SERVER_NAME}marcas/vitrine`;
            const response = await fetch(url, {
                method: "GET",
                headers: {
                    "Authorization": `Bearer ${token}`,
                    "Content-Type": "application/json"
                }
            });

            if (!response.ok) {
                throw new Error('Falha ao obter marcas da vitrine');
            }

            const marcas = await response.json();
            const sorteiosContainer = document.getElementById('sorteios-container');

            sorteiosContainer.innerHTML = ''; // Limpa o container antes de adicionar novo conteúdo

            marcas.forEach(marca => {
                const sorteioElement = document.createElement('div');
                sorteioElement.classList.add('sorteios');

                sorteioElement.innerHTML = `
                    <div class="fotos">
                        <img src="${('data:image/png;base64,' + marca.logo) || '../../assets/images/logo/LOGO-TESTE.png'}" alt="Logo da marca">
                    </div>
                    <div class="escrita">
                        <p>${marca.nome}</p>
                        <p>${marca.descricao}</p>
                    </div>
                `;

                sorteiosContainer.appendChild(sorteioElement);
            });

        } catch (error) {
            console.error('Erro ao obter marcas da vitrine:', error);
        }
    }

    document.getElementById('participar-btn').addEventListener('click', async () => {
        try {
            const url = "https://modulo-sorteios.azurewebsites.net/usuarios/sorteio/participar";
            const response = await fetch(url, {
                method: "POST",
                headers: {
                    "Authorization": `Bearer ${token}`,
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    email: email // Enviando o e-mail do usuário como parâmetro
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
    });

    await obterMarcasDaVitrine();
});
