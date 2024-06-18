import SERVER_NAME from "./CONSTANTES.js";

const formCadastrarMarca = document.getElementById('form-cadastrar-marca')
const inputNome = document.getElementById('nome-marca')
const inputTitulo = document.getElementById('titulo-marca')
const inputOrdemExibicao = document.getElementById('ordem-exibicao')
const inputLogo = document.getElementById('upload-logo')
const inputBanner = document.getElementById('upload-logo')

const registrarMarca = async () => {
    const url = SERVER_NAME + 'marcas/registrar'

    const response = await fetch(url, {
        method: "POST",
        mode: "cors",
        headers: { "Content-Type": "application/json" },
        headers: {
            Authorization: `Bearer ${sessionStorage.getItem("token")}`
        },
        body: JSON.stringify({
            nome: inputNome.value,
            titulo: inputTitulo.value,
            // logo: inputLogo.value,
            // banner: inputBanner.value,
            ordemExibicao: inputOrdemExibicao.value,
        }),
    });
}

formCadastrarMarca.addEventListener("submit", (event) => {
    event.preventDefault();
    registrarMarca()
});