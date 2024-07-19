import { SERVER_NAME, mostrarAlert, TOKEN } from "./CONSTANTES.js";

const MAX_FILE_SIZE = 1 * 1024 * 1024; // 1 MB

const error = document.querySelectorAll('.wrong-text');
const inputNome = document.getElementById('nome-destaque');
const inputTitulo = document.getElementById('titulo-destaque');
const inputDestaque = document.getElementById('upload-destaque');
const idDestaque = sessionStorage.getItem('idDestaques');
const previewDestaque = document.getElementById('preview-destaque');
const divImgs = document.querySelector('.div-imgs');
const buttonSave = document.getElementById('button-salvar');

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

// Função para validar o tamanho do arquivo e exibir erros
const validateFile = (file) => {
    if (file.size > MAX_FILE_SIZE) {
        error[2].innerText = "O tamanho da imagem não pode exceder 1 MB";
        inputDestaque.classList.add('wrong');
        buttonSave.disabled = true;
        return false;
    } else {
        error[2].innerText = '';
        inputDestaque.classList.remove('wrong');
        buttonSave.disabled = false;
        return true;
    }
};

// Função para lidar com a seleção de arquivos
const handleFileInput = () => {
    const file = inputDestaque.files[0];
    if (file) {
        if (validateFile(file)) {
            const reader = new FileReader();
            reader.onloadend = () => {
                previewDestaque.src = reader.result;
            };
            reader.readAsDataURL(file);
        } else {
            previewDestaque.src = "https://github.com/Top-Sorteios/Front-end/blob/main/assets/images/placeholder-files/placeholder.png?raw=true";
        }
    }
};

inputDestaque.addEventListener('change', handleFileInput);

// Recebe os dados da marca
const getDados = async () => {
    let url = `${SERVER_NAME}/index/obter/${idDestaque}`;
    const response = await fetch(url, {
        method: "GET",
        headers: {
            "Authorization": `Bearer ${TOKEN}`,
            "Content-Type": "application/json"
        }
    });
    const dado = await response.json();

    // adiciona as informações da marca a ser editada no input
    inputNome.value = dado.nome;
    inputTitulo.value = dado.titulo;
    inputDestaque.setAttribute('base64img', dado.imagem);
    previewDestaque.src = `data:image/png;base64,${dado.imagem}`;
}

// Função que cadastra a marca
const cadastrarDestaque = async () => {
    const url = `${SERVER_NAME}/index/registrar`;

    clearError();
    if (inputNome.value == '') {
        error[0].innerText = 'Digite o nome do destaque';
        inputNome.classList.add('wrong');
        inputNome.focus();
    } else if (inputTitulo.value == '') {
        error[1].innerText = 'Digite o título do destaque';
        inputTitulo.classList.add('wrong');
        inputTitulo.focus();
    } else if (inputDestaque.files[0] == null) {
        divImgs.classList.add('wrong');
        error[2].innerText = 'Adicione uma imagem';
    } else if (!validateFile(inputDestaque.files[0])) {
        // Validar o tamanho do arquivo e exibir erro
        return;
    } else {
        buttonSave.disabled = true;
        const formData = new FormData();
        formData.append("nome", inputNome.value);
        formData.append("titulo", inputTitulo.value);
        formData.append('imagem', inputDestaque.files[0]);

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
            buttonSave.disabled = false;
            mostrarAlert("Não foi possível cadastrar o destaque", 'fas fa-circle-xmark');
        }
    }
}

const editarDestaque = async () => {
    clearError();
    if (inputNome.value == '') {
        error[0].innerText = 'Digite o nome do destaque';
        inputNome.classList.add('wrong');
        inputNome.focus();
    } else if (inputTitulo.value == '') {
        error[1].innerText = 'Digite o título do destaque';
        inputTitulo.classList.add('wrong');
        inputTitulo.focus();
    } else {
        buttonSave.disabled = true;
        const formData = new FormData();
        formData.append("nome", inputNome.value);
        formData.append("titulo", inputTitulo.value);
        if (inputDestaque.files.length > 0) {
            if (!validateFile(inputDestaque.files[0])) {
                // Validar o tamanho do arquivo e exibir erro
                return;
            }
            formData.append("imagem", inputDestaque.files[0]);
        } else {
            const base64String = inputDestaque.getAttribute("base64img");
            const blob = base64ToBlob(base64String, "image/png");
            formData.append("imagem", blob, "image.png");
        }

        let url = `${SERVER_NAME}/index/editar/${idDestaque}`;
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
            buttonSave.disabled = false;
            mostrarAlert("Não foi possível editar destaque", 'fas fa-circle-xmark');
        }
    }
}

const deleteDestaque = async () => {
    buttonSim.disabled = true;
    let url = `${SERVER_NAME}/index/deletar/${idDestaque}`;

    let response = await fetch(url, {
        method: 'DELETE',
        headers: {
            "Authorization": `Bearer ${TOKEN}`,
        },
        mode: 'cors'
    });

    if (response.status == 200) {
        mostrarAlert("Destaque excluído com sucesso!", 'fas fa-circle-check');
        setTimeout(() => {
            window.location.assign("../gestao-dos-destaques/destaques-cadastradas.html");
        }, 2500);
    } else {
        buttonSim.disabled = false;
        mostrarAlert("Não foi possível excluir o destaque", 'fas fa-circle-xmark');
    }
}

const clearError = () => {
    error.forEach(el => el.innerText = '');
    inputNome.classList.remove('wrong');
    inputTitulo.classList.remove('wrong');
    divImgs.classList.remove('wrong');
}

const buttonDelete = document.getElementById('button-excluir');
buttonDelete.addEventListener('click', () => {
    let container = document.querySelector('.container');
    let containerExcluir = document.querySelector('.container-excluir');
    container.classList.add('none');
    containerExcluir.classList.remove('none');
    window.location.assign("#header-destaques");
});

buttonSave.addEventListener('click', () => {
    if (idDestaque == null || idDestaque == 0) {
        cadastrarDestaque();
    } else {
        editarDestaque();
    }
});

const buttonSim = document.getElementById('button-sim');
buttonSim.addEventListener('click', () => {
    deleteDestaque();
});

const buttonNao = document.getElementById('button-nao');
buttonNao.addEventListener('click', () => {
    let container = document.querySelector('.container');
    let containerExcluir = document.querySelector('.container-excluir');
    container.classList.remove('none');
    containerExcluir.classList.add('none');
});

window.addEventListener('load', () => {
    if (idDestaque != null && idDestaque != 0) {
        openDestaque();
    } else {
        newDestaque();
    }
});

const newDestaque = () => {
    const txtEditar = document.querySelector('.txt-editar');
    buttonDelete.style.display = 'none';
    txtEditar.classList.add('none');
    buttonSave.addEventListener('click', () => cadastrarDestaque());
};

const openDestaque = () => {
    const txtCadastrar = document.querySelector('.txt-cadastrar');
    txtCadastrar.classList.add('none');
    getDados();
    buttonSave.addEventListener('click', () => editarDestaque());
};
