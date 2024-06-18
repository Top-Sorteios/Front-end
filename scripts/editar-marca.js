import SERVER_NAME from "./CONSTANTES.js";

const inputNome = document.getElementById('nome-marca')
const inputTitulo = document.getElementById('titulo-marca')
const inputOrdemExibicao = document.getElementById('ordem-exibicao')
const inputLogo = document.getElementById('upload-logo')
const inputBanner = document.getElementById('upload-banner')

const editarMarca = async (id) => {
    const url = `${SERVER_NAME}marcas/editar/${id}`

    const response = await fetch(url, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            nome: inputNome.value,
            titulo: inputTitulo.value,
            logo: inputLogo.value,
            banner: inputBanner.value,
            ordemExibicao: inputOrdemExibicao.value,
        }),
    });
}

const deleteMarca = async (id) => {
    const url = `${SERVER_NAME}marcas/${id}`

    let response = await fetch(url, {
        method: 'DELETE',
        mode: 'cors'
    })

    if (response.status == 200) {
        alert('Registro excluido com sucesso')
        location.reload()
    } else {
        alert('Não foi possível excluir o registro')
    }
}

const buttonDelete = document.getElementById('button-remover')
buttonDelete.addEventListener('click', () => {
    deleteMarca()
})

const buttonSave = document.getElementById('button-salvar')
buttonSave.addEventListener('click', () => {
    editarMarca()
})