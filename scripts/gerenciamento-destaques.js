import { SERVER_NAME, TOKEN } from "./CONSTANTES.js";

const error = document.querySelectorAll('.wrong-text')
const inputNome = document.getElementById('nome-destaque')
const inputTitulo = document.getElementById('titulo-destaque')
const inputDestaque = document.getElementById('upload-destaque')
const idDestaque = sessionStorage.getItem('idDestaques')
const previewDestaque = document.getElementById('preview-destaque')

// Recebe os dados da marca
const getDados = async () => {
    let url = `${SERVER_NAME}/index/obter/${idDestaque}`
    const response = await fetch(url, {
        method: "GET",
        headers: {
            "Authorization": `Bearer ${TOKEN}`,
            "Content-Type": "application/json"
        }
    })
    const dado = await response.json()

    // adiciona as informações da marca a ser editada no input
    inputNome.value = dado.nome;
    inputTitulo.value = dado.titulo;
    inputDestaque.setAttribute('base64img', dado.imagem);
    previewDestaque.src = `data:image/png;base64,${dado.imagem}`;
}

// Função que cadastra a marca
const cadastrarDestaque = async () => {
    const url = `${SERVER_NAME}index/registrar`

    clearError()
    if (inputNome.value == '') {
        error[0].innerText = 'Digite o nome do destaque'
        inputNome.classList.add('wrong')
        inputNome.focus()
    } else if (inputTitulo.value == '') {
        error[1].innerText = 'Digite o titulo do destaque'
        inputTitulo.classList.add('wrong')
        inputTitulo.focus()
    } else if (inputDestaque.files[0] == null) {
        error[2].innerText = 'Adicione uma imagem'
    } else {

        const formData = new FormData();
        formData.append("nome", inputNome.value);
        formData.append("titulo", inputTitulo.value);
        formData.append('imagem', inputDestaque.files[0])

        const response = await fetch(url, {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${TOKEN}`
            },
            body: formData
        });
        if (response.status == 201) {
            alert('Destaque cadastrada com sucesso')
            window.location.assign("../gestao-dos-destaques/destaques-cadastradas.html");
        } else {
            alert('Não foi possível cadastrar o destaque')
        }
    }
}


const editarDestaque = async () => {
    clearError()
    if (inputNome.value == '') {
        error[0].innerText = 'Digite o nome do destaque'
        inputNome.classList.add('wrong')
        inputNome.focus()
    } else if (inputTitulo.value == '') {
        error[1].innerText = 'Digite o titulo do destaque'
        inputTitulo.classList.add('wrong')
        inputTitulo.focus()
    } else if (inputDestaque.files[0] == null) {
        error[2].innerText = 'Adicione uma imagem'
    } else {

        const formData = new FormData();
        formData.append("nome", inputNome.value);
        formData.append("titulo", inputTitulo.value);
        formData.append(
            "imagem",
            inputDestaque.files.length > 0
                ? inputDestaque.files[0]
                : new Blob([inputDestaque.getAttribute("base64img")], { type: "image/*" })
        );

        let url = `${SERVER_NAME}index/editar/${idDestaque}`
        const response = await fetch(url, {
            method: "PUT",
            headers: {
                "Authorization": `Bearer ${TOKEN}`,
            },
            body: formData
        });

        if (response.status == 200) {
            alert('Destaque alterado com sucesso')
            window.location.assign("../gestao-dos-destaques/destaques-cadastradas.html");
        } else {
            alert('Não foi possível alterar o destaque')
        }
    }
}


const deleteDestaque = async () => {
    let url = `${SERVER_NAME}index/deletar/${idDestaque}`

    let response = await fetch(url, {
        method: 'DELETE',
        headers: {
            "Authorization": `Bearer ${TOKEN}`,
        },
        mode: 'cors'
    })

    if (response.status == 200) {
        alert('Destaque excluido com sucesso')
        window.location.assign("../gestao-dos-destaques/destaques-cadastradas.html");
    } else {
        alert('Não foi possível excluir o Destaque')
    }
}

const clearError = () => {
    error[0].innerText = ''
    error[1].innerText = ''
    error[2].innerText = ''
    inputNome.classList.remove('wrong')
    inputTitulo.classList.remove('wrong')
}

const buttonDelete = document.getElementById('button-excluir')
buttonDelete.addEventListener('click', () => {
    let container = document.querySelector('.container')
    let containerExcluir = document.querySelector('.container-excluir')
    container.classList.add('none')
    containerExcluir.classList.remove('none')
})

const buttonSave = document.getElementById('button-salvar')
buttonSave.addEventListener('click', () => {
    if (idDestaque == null || idDestaque == 0) {
        cadastrarDestaque()
    } else {
        editarDestaque()
    }
})

const buttonSim = document.getElementById('button-sim')
buttonSim.addEventListener('click', () => {
    deleteDestaque()
})

const buttonNao = document.getElementById('button-nao')
buttonNao.addEventListener('click', () => {
    let container = document.querySelector('.container')
    let containerExcluir = document.querySelector('.container-excluir')
    container.classList.remove('none')
    containerExcluir.classList.add('none')
})

window.addEventListener('load', () => {
    if (idDestaque == null || idDestaque == 0) {
        newDestaque()
    } else {
        openDestaque()
    }
})

const newDestaque = () => {
    let txtEditar = document.querySelector('.txt-editar')
    buttonDelete.style.display = 'none'
    txtEditar.classList.add('none')
}

const openDestaque = () => {
    let txtCadastrar = document.querySelector('.txt-cadastrar')
    txtCadastrar.classList.add('none')
    getDados()
    sessionStorage.setItem('idDestaques', 0)
}

function previewImage(input, previewId) {
    const preview = document.getElementById(previewId);
    const file = input.files[0];
    const reader = new FileReader();

    reader.onload = function (e) {
        preview.src = e.target.result;
    }

    if (file) {
        reader.readAsDataURL(file);
    }
}

inputDestaque.addEventListener('change', function () {
    previewImage(this, 'preview-destaque');
});