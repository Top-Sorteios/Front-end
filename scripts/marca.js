import { SERVER_NAME, TOKEN } from "./CONSTANTES.js";

const error = document.querySelectorAll('.wrong-text')
const inputNome = document.getElementById('nome-marca')
const inputTitulo = document.getElementById('titulo-marca')
const inputOrdemExibicao = document.getElementById('ordem-exibicao')
const inputLogo = document.getElementById('upload-logo')
const inputBanner = document.getElementById('upload-banner')
const idMarca = sessionStorage.getItem('idMarca')


// var inputLogoFile = inputLogo.files[0];
// // var inputBannerFile = inputBanner.files[0];

// if (inputLogoFile) {
//     var fileReaderLogo = new FileReader();

//     ReadableStream.onload = function(e) {
//         var arrayBuffer = e.target.result;
//         var bytes = new Uint8Array(arrayBuffer);
//         console.log(bytes)
//     }
// }



const getDados = async () => {
    let url = `${SERVER_NAME}/marcas/obter/${idMarca}`
    const response = await fetch(url, {
        method: "GET",
        headers: {
            "Authorization": `Bearer ${TOKEN}`,
            "Content-Type": "application/json"
        }
    })
    const dado = await response.json()

    inputNome.value = dado.nome
    inputTitulo.value = dado.titulo
    inputOrdemExibicao.value = dado.ordemExibicao
}


const cadastrarMarca = async () => {
    const url = `${SERVER_NAME}marcas/registrar`

    clearError()
    if (inputNome.value == '') {
        error[0].innerText = 'Preencha o campo nome'
        inputNome.classList.add('wrong')
        inputNome.focus()
    } else if (inputTitulo.value == '') {
        error[1].innerText = 'Preencha o campo titulo'
        inputTitulo.classList.add('wrong')
        inputTitulo.focus()
    } else if (inputOrdemExibicao.value == '') {
        error[2].innerText = 'Preencha o campo ordem de exibição'
        inputOrdemExibicao.classList.add('wrong')
        inputOrdemExibicao.focus()
    } else {
        const response = await fetch(url, {
            method: "POST",
            mode: "cors",
            headers: {
                "Authorization": `Bearer ${TOKEN}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                nome: inputNome.value,
                titulo: inputTitulo.value,
                ordemExibicao: inputOrdemExibicao.value,
                logo: null,
                banner: null,
                criadoPor: 781
            }),
        });
        if (response.status == 201) {
            alert('Marca cadastrada com sucesso')
            window.location.assign("../gestao-de-marcas/marcas-cadastradas.html");
        } else {
            alert('Não foi possível cadastrar a marca')
        }
    }
}


const editarMarca = async () => {
    clearError()
    if (inputNome.value == '') {
        error[0].innerText = 'Preencha o campo nome'
        inputNome.style.classList.add('wrong')
        inputNome.focus()
    } else if (inputTitulo.value == '') {
        error[1].innerText = 'Preencha o campo titulo'
        inputTitulo.classList.add('wrong')
        inputTitulo.focus()
    } else if (inputOrdemExibicao.value == '') {
        error[2].innerText = 'Preencha o campo ordem de exibição'
        inputOrdemExibicao.classList.add('wrong')
        inputOrdemExibicao.focus()
    } else {

        let url = `${SERVER_NAME}marcas/editar/${idMarca}`
        const response = await fetch(url, {
            method: "PUT",
            headers: {
                "Authorization": `Bearer ${TOKEN}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                nome: inputNome.value,
                titulo: inputTitulo.value,
                // logo: inputLogo.value,
                // banner: inputBanner.value,
                ordemExibicao: inputOrdemExibicao.value,
            }),
        });
        if (response.status == 200) {
            alert('Registro alterado com sucesso')
            window.location.assign("../gestao-de-marcas/marcas-cadastradas.html");
        } else {
            alert('Não foi possível alterar o registro')
        }
    }
}


const deleteMarca = async () => {
    let url = `${SERVER_NAME}marcas/${idMarca}`

    let response = await fetch(url, {
        method: 'DELETE',
        headers: {
            "Authorization": `Bearer ${TOKEN}`,
            "Content-Type": "application/json"
        },
        mode: 'cors'
    })

    if (response.status == 200) {
        alert('Registro excluido com sucesso')
        window.location.assign("../gestao-de-marcas/marcas-cadastradas.html");
    } else {
        alert('Não foi possível excluir o registro')
    }
}


const clearError = () => {
    error[0].innerText = ''
    error[1].innerText = ''
    error[2].innerText = ''
    inputNome.classList.remove('wrong')
    inputTitulo.classList.remove('wrong')
    inputOrdemExibicao.classList.remove('wrong')
}


const buttonDelete = document.getElementById('button-remover')
buttonDelete.addEventListener('click', () => {
    let container = document.querySelector('.container')
    let confirm = document.querySelector('.confirm')
    container.classList.add('none')
    confirm.classList.remove('none')
})

const buttonSave = document.getElementById('button-salvar')
buttonSave.addEventListener('click', () => {
    if (idMarca == null || idMarca == 0) {
        cadastrarMarca()
    } else {
        editarMarca()
    }

})

const buttonSim = document.getElementById('button-sim')
buttonSim.addEventListener('click', () => {
    deleteMarca()
})

const buttonNao = document.getElementById('button-nao')
buttonNao.addEventListener('click', () => {
    let container = document.querySelector('.container')
    let confirm = document.querySelector('.confirm')
    container.classList.remove('none')
    confirm.classList.add('none')
})

window.addEventListener('load', () => {
    if (idMarca == null || idMarca == 0) {
        newMarca()
    } else {
        openMarca()
    }
})

const newMarca = () => {
    // buttonDelete.classList.add('invisible')
    buttonDelete.style.display = 'none'
}

const openMarca = () => {
    getDados()
    sessionStorage.setItem('idMarca', 0)
}