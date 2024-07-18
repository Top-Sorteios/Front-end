import { SERVER_NAME, mostrarAlert, TOKEN } from "./CONSTANTES.js";

const error = document.querySelectorAll('.wrong-text')
const inputNome = document.getElementById('nome-destaque')
const inputTitulo = document.getElementById('titulo-destaque')
const inputDestaque = document.getElementById('upload-destaque')
const idDestaque = sessionStorage.getItem('idDestaques')
const previewDestaque = document.getElementById('preview-destaque')
const divImgs = document.querySelector('.div-imgs')
const buttonSave = document.getElementById('button-salvar')

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

// Função para Converter Base64 para Blob
const base64ToBlob = (base64String, contentType) => {
    const byteCharacters = atob(base64String);
    const byteNumbers = new Array(byteCharacters.length);
    for (let i = 0; i < byteCharacters.length; i++) {
        byteNumbers[i] = byteCharacters.charCodeAt(i);
    }
    const byteArray = new Uint8Array(byteNumbers);
    return new Blob([byteArray], { type: contentType });
};

// Função que cadastra a marca
const cadastrarDestaque = async () => {
    
    const url = `${SERVER_NAME}index/registrar`

    clearError()
    if (inputNome.value == '') {
        error[0].innerText = 'Digite o nome do destaque'
        inputNome.classList.add('wrong')
        inputNome.focus()
    } else if (inputTitulo.value == '') {
        error[1].innerText = 'Digite o título do destaque'
        inputTitulo.classList.add('wrong')
        inputTitulo.focus()
    } else if (inputDestaque.files[0] == null) {
        divImgs.classList.add('wrong')
        error[2].innerText = 'Adicione uma imagem'
    } else {
        buttonSave.disabled = true
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
            mostrarAlert("Destaque cadastrado com sucesso!", 'fas fa-circle-check');
            setTimeout(() => {
                window.location.assign("../gestao-dos-destaques/destaques-cadastradas.html");
            }, 2500);
        } else {
            buttonSave.disabled = false
            mostrarAlert("Não foi possível cadastrar o destaque", 'fas fa-circle-xmark');
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
        error[1].innerText = 'Digite o título do destaque'
        inputTitulo.classList.add('wrong')
        inputTitulo.focus()
    } else {
        buttonSave.disabled = true
        const formData = new FormData();
        formData.append("nome", inputNome.value);
        formData.append("titulo", inputTitulo.value);
        if (inputDestaque.files.length > 0) {
            formData.append("imagem", inputDestaque.files[0]);
        } else {
            const base64String = inputDestaque.getAttribute("base64img");
            const blob = base64ToBlob(base64String, "image/png");
            formData.append("imagem", blob, "image.png");
        }

        let url = `${SERVER_NAME}index/editar/${idDestaque}`
        const response = await fetch(url, {
            method: "PUT",
            headers: {
                "Authorization": `Bearer ${TOKEN}`,
            },
            body: formData
        });

        if (response.status == 200) {
            mostrarAlert("Destaque editado com sucesso!", 'fas fa-circle-check');
            setTimeout(() => {
                window.location.assign("../gestao-dos-destaques/destaques-cadastradas.html");
            }, 2500);
        } else {
            buttonSave.disabled = false
            mostrarAlert("Não foi possível editar destaque", 'fas fa-circle-xmark');
        }
    }
}


const deleteDestaque = async () => {
    buttonSim.disabled = true
    let url = `${SERVER_NAME}index/deletar/${idDestaque}`

    let response = await fetch(url, {
        method: 'DELETE',
        headers: {
            "Authorization": `Bearer ${TOKEN}`,
        },
        mode: 'cors'
    })

    if (response.status == 200) {
        mostrarAlert("Destaque excluído com sucesso!", 'fas fa-circle-check');
        setTimeout(() => {
            window.location.assign("../gestao-dos-destaques/destaques-cadastradas.html");
        }, 2500);
    } else {
        buttonSim.disabled = false
        mostrarAlert("Não foi possível excluir o destaque", 'fas fa-circle-xmark')
    }
}

const clearError = () => {
    error[0].innerText = ''
    error[1].innerText = ''
    error[2].innerText = ''
    inputNome.classList.remove('wrong')
    inputTitulo.classList.remove('wrong')
    divImgs.classList.remove('wrong')
}

const buttonDelete = document.getElementById('button-excluir')
buttonDelete.addEventListener('click', () => {
    let container = document.querySelector('.container')
    let containerExcluir = document.querySelector('.container-excluir')
    container.classList.add('none')
    containerExcluir.classList.remove('none')
    window.location.assign("#header-destaques");
})

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