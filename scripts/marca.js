import {
  ACAO,
  get,
  remove,
  SERVER_NAME,
  TOKEN,
  mostrarAlert,
} from "./CONSTANTES.js";

const MAX_FILE_SIZE = 1 * 1024 * 1024;

const error = document.querySelectorAll(".wrong-text");
const inputNome = document.getElementById("nome-marca");
const inputTitulo = document.getElementById("titulo-marca");
const inputOrdemExibicao = document.getElementById("ordem-exibicao");
const inputLogo = document.getElementById("upload-logo");
const inputBanner = document.getElementById("upload-banner");
const idMarca = sessionStorage.getItem("idMarca");
const previewBanner = document.getElementById("preview-banner");
const previewLogo = document.getElementById("preview-logo");

const divImgs = document.querySelectorAll(".div-imgs");
const buttonDelete = document.getElementById("button-remover");
const buttonSave = document.getElementById("button-salvar");

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

const handleFileInput = (input, preview, errorIndex) => {
  const file = input.files[0];
  if (file.size > MAX_FILE_SIZE) {
    error[errorIndex].innerText = "O tamanho da imagem não pode exceder 1 MB";
    input.classList.add("wrong");
    preview.src = "https://github.com/Top-Sorteios/Front-end/blob/main/assets/images/placeholder-files/placeholder.png?raw=true";
    buttonSave.disabled = true;
    return false;
  } else {
    error[errorIndex].innerText = "";
    input.classList.remove("wrong");
    const reader = new FileReader();
    reader.onloadend = () => {
      const base64String = reader.result;
      preview.setAttribute("src", `${base64String}`);
      reader.abort();
    };
    reader.readAsDataURL(file);
    buttonSave.disabled = false;
    return true;
  }
};

inputBanner.addEventListener("change", () => handleFileInput(inputBanner, previewBanner, 3));
inputLogo.addEventListener("change", () => handleFileInput(inputLogo, previewLogo, 4));

// Recebe os dados da marca
const getDados = async () => {
  const request = await get(`/marcas/obter/${idMarca}`, true);
  const dado = await request.json();

  // adiciona as informações da marca a ser editada no input
  inputNome.value = dado.nome;
  inputTitulo.value = dado.titulo;
  inputOrdemExibicao.value = dado.ordemExibicao;
  inputBanner.setAttribute("base64img", dado.banner);
  inputLogo.setAttribute("base64img", dado.logo);
  previewLogo.src = dado.logo
    ? `data:image/png;base64,${dado.logo}`
    : "https://github.com/Top-Sorteios/Front-end/blob/main/assets/images/placeholder-files/placeholder.png?raw=true";

  previewBanner.src = dado.banner
    ? `data:image/png;base64,${dado.banner}`
    : "https://github.com/Top-Sorteios/Front-end/blob/main/assets/images/placeholder-files/placeholder.png?raw=true";
};

switch (ACAO) {
  case "EDITAR":
    const txtCadastrar = document.querySelector(".txt-cadastrar");
    txtCadastrar.classList.add("none");
    getDados();
    buttonSave.addEventListener("click", () => editarMarca());
    break;
  case "CRIAR":
    const txtEditar = document.querySelector(".txt-editar");
    buttonDelete.style.display = "none";
    txtEditar.classList.add("none");
    buttonSave.addEventListener("click", () => cadastrarMarca());
    break;
  default:
    window.location.replace("./marcas-cadastradas.html");
    break;
}

// Função que cadastra a marca
const cadastrarMarca = async () => {
  const url = `${SERVER_NAME}marcas/registrar`;

  clearError();
  if (inputNome.value == "") {
    error[0].innerText = "Preencha o campo nome";
    inputNome.classList.add("wrong");
    inputNome.focus();
  } else if (inputTitulo.value == "") {
    error[1].innerText = "Preencha o campo título";
    inputTitulo.classList.add("wrong");
    inputTitulo.focus();
  } else if (inputOrdemExibicao.value == "") {
    error[2].innerText = "Preencha o campo ordem de exibição";
    inputOrdemExibicao.classList.add("wrong");
    inputOrdemExibicao.focus();
  } else if (inputBanner.files[0] == null) {
    error[3].innerText = "Adicione uma imagem";
    inputBanner.classList.add("wrong");
  } else if (inputLogo.files[0] == null) {
    error[4].innerText = "Adicione uma imagem";
    inputLogo.classList.add("wrong");
  } else {
    buttonSave.disabled = true;
    const formData = new FormData();
    formData.append("nome", inputNome.value);
    formData.append("titulo", inputTitulo.value);
    formData.append("logo", inputLogo.files[0]);
    formData.append("banner", inputBanner.files[0]);
    formData.append("ordemExibicao", inputOrdemExibicao.value);
    formData.append("criadoPor", 1561);

    const response = await fetch(url, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${TOKEN}`,
      },
      body: formData,
    });
    if (response.status == 201) {
      mostrarAlert("Marca cadastrada com sucesso", "fas fa-circle-check");
      setTimeout(() => {
        window.location.assign("../gestao-de-marcas/marcas-cadastradas.html");
      }, 2500);
    } else {
      buttonSave.disabled = false;
      mostrarAlert(
        "Não foi possível cadastrar a marca",
        "fa-solid fa-circle-xmark"
      );
    }
  }
};

const editarMarca = async () => {
  clearError();
  if (inputNome.value == "") {
    error[0].innerText = "Preencha o campo nome";
    inputNome.classList.add("wrong");
    inputNome.focus();
  } else if (inputTitulo.value == "") {
    error[1].innerText = "Preencha o campo título";
    inputTitulo.classList.add("wrong");
    inputTitulo.focus();
  } else if (inputOrdemExibicao.value == "") {
    error[2].innerText = "Preencha o campo ordem de exibição";
    inputOrdemExibicao.classList.add("wrong");
    inputOrdemExibicao.focus();
  } else {
    buttonSave.disabled = true;
    const formData = new FormData();
    formData.append("nome", inputNome.value);
    formData.append("titulo", inputTitulo.value);
    if (inputBanner.files.length > 0) {
      formData.append("banner", inputBanner.files[0]);
    } else {
      const base64String = inputBanner.getAttribute("base64img");
      const blob = base64ToBlob(base64String, "image/png");
      formData.append("banner", blob, "image.png");
    }
    if (inputLogo.files.length > 0) {
      formData.append("logo", inputLogo.files[0]);
    } else {
      const base64String = inputLogo.getAttribute("base64img");
      const blob = base64ToBlob(base64String, "image/png");
      formData.append("logo", blob, "image.png");
    }
    formData.append("ordemExibicao", inputOrdemExibicao.value);
    formData.append("criadoPor", 1561);

    let url = `${SERVER_NAME}marcas/editar/${idMarca}`;
    const response = await fetch(url, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${TOKEN}`,
      },
      body: formData,
    });

    if (response.status == 200) {
      mostrarAlert("Marca editada com sucesso", "fas fa-circle-check");
      setTimeout(() => {
        window.location.assign("../gestao-de-marcas/marcas-cadastradas.html");
      }, 2500);
    } else {
      buttonSave.disabled = false;
      mostrarAlert(
        "Não foi possível editar a marca",
        "fa-solid fa-circle-xmark"
      );
    }
  }
};

// Função para limpar erros
const clearError = () => {
  error.forEach((el) => (el.innerText = ""));
  inputNome.classList.remove("wrong");
  inputTitulo.classList.remove("wrong");
  inputOrdemExibicao.classList.remove("wrong");
  inputBanner.classList.remove("wrong");
  inputLogo.classList.remove("wrong");
};

// Remove marca cadastrada
buttonDelete.addEventListener("click", async () => {
  const idMarca = sessionStorage.getItem("idMarca");
  const url = `${SERVER_NAME}marcas/deletar/${idMarca}`;
  const response = await remove(url);
  if (response.status == 200) {
    mostrarAlert("Marca removida com sucesso", "fas fa-circle-check");
    setTimeout(() => {
      window.location.assign("../gestao-de-marcas/marcas-cadastradas.html");
    }, 2500);
  } else {
    mostrarAlert(
      "Não foi possível remover a marca",
      "fa-solid fa-circle-xmark"
    );
  }
});
