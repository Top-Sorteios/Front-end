import {
  ACAO,
  MARCA_NOME,
  PREMIO_ID,
  SERVER_NAME,
  TOKEN,
  get,
  post,
  put,
  remove,
  mostrarAlert
} from "./CONSTANTES.js";

const MAX_FILE_SIZE = 1 * 1024 * 1024; // 1 MB

// Seletores de Elementos
const titulo = document.querySelector("#titulo");
const divButton = document.getElementById("div-button");
const legend = document.querySelector("#form-legend");
const buttonSalvarEditar = document.querySelector("#enviar");
const buttonDeletar = document.getElementById("buttonDeletar");
const textoError = document.querySelectorAll(".wrong-text");
const form = document.querySelector("#form");
const formFieldset = document.querySelector("#form-fieldset");
const imagem = document.querySelector("#imagem");
const previewPremio = document.querySelector("#preview-premio");
const marcaId = document.querySelector("#marcaId");
const nome = document.querySelector("#nome");
const codigoSku = document.querySelector("#codigoSku");
const descricao = document.querySelector("#descricao");
const quantidade = document.querySelector("#quantidade");
const criadoPorLabel = document.querySelector("#criadoPorLabel");
const criadoPor = document.querySelector("#criadoPor");
const criadoEmLabel = document.querySelector("#criadoEmLabel");
const criadoEm = document.querySelector("#criadoEm");
const containerExcluir = document.querySelector('.container-excluir');
const buttonSim = document.getElementById('button-sim');
const buttonNao = document.getElementById('button-nao');

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

// Função para lidar com o input de arquivos
const handleFileInput = (input, preview, errorIndex) => {
  const file = input.files[0];
  if (file && file.size > MAX_FILE_SIZE) {
    if (textoError[errorIndex]) {
      textoError[errorIndex].innerText = "O tamanho do arquivo não pode exceder 1 MB";
    }
    input.classList.add("wrong");
    preview.src = "https://github.com/Top-Sorteios/Front-end/blob/main/assets/images/placeholder-files/placeholder.png?raw=true";
    if (buttonSalvarEditar) {
      buttonSalvarEditar.disabled = true;
    }
  } else {
    if (textoError[errorIndex]) {
      textoError[errorIndex].innerText = "";
    }
    input.classList.remove("wrong");
    const reader = new FileReader();
    reader.onloadend = () => {
      preview.src = `${reader.result}`;
    };
    reader.readAsDataURL(file);
    if (buttonSalvarEditar) {
      buttonSalvarEditar.disabled = false;
    }
  }
};

// Manipulador de eventos para o input de imagem
if (imagem) {
  imagem.addEventListener("change", () => handleFileInput(imagem, previewPremio, 5));
}

// Função para remover mensagens de erro
const removerError = () => {
  if (imagem) imagem.classList.remove("wrong");
  if (nome) nome.classList.remove("wrong");
  if (codigoSku) codigoSku.classList.remove("wrong");
  if (descricao) descricao.classList.remove("wrong");
  if (quantidade) quantidade.classList.remove("wrong");
  textoError.forEach((texto) => {
    if (texto) texto.innerText = "";
  });
};

// Função para preencher os campos do formulário
const definirCampos = (premio) => {
  if (titulo) titulo.textContent = "Editar prêmio da semana";
  if (legend) legend.textContent = "Editar prêmio da semana";
  if (nome) nome.value = premio.nome;
  if (imagem) imagem.setAttribute("base64img", premio.imagem);
  if (previewPremio) previewPremio.setAttribute(
    "src",
    `data:image/*;base64,${imagem ? imagem.getAttribute("base64img") : ''}`
  );
  if (codigoSku) codigoSku.value = premio.codigoSku;
  if (descricao) descricao.value = premio.descricao;
  if (quantidade) quantidade.value = premio.quantidade;
  if (criadoPor) criadoPor.value = premio.criadoPor;
  if (criadoEm) criadoEm.value = `${premio.criadoEm
    .split("T")[0]
    .split("-")
    .reverse()
    .join("/")} ${premio.criadoEm.split("T")[1].split(".")[0]}`;

  if (buttonSim) {
    buttonSim.addEventListener("click", (event) => {
      event.preventDefault();
      removerPremio();
    });
  }
};

// Função para obter prêmio por ID
const obterPremio = async (id) => {
  const request = await get(`premios/obter/${PREMIO_ID}`, true);
  if (request.ok) {
    const response = await request.json();
    definirCampos(response);
  }
};

// Função para obter e preencher marcas no select
const obterMarcasSelect = async () => {
  const request = await get("marcas/obter", true);
  if (request.ok) {
    const response = await request.json();
    response.forEach((marca) => {
      const formOption = document.createElement("option");
      formOption.value = marca.nome;
      formOption.textContent = marca.nome;
      formOption.id = marca.id;
      if (marcaId) marcaId.appendChild(formOption);
    });

    if (marcaId && marcaId.querySelector(`option[value="${MARCA_NOME}"]`)) {
      marcaId.querySelector(`option[value="${MARCA_NOME}"]`).selected = true;
    }
  }
};

// Função para cadastrar prêmio
const cadastrarPremio = async () => {
  removerError();
  let options = document.querySelectorAll("option");
  if (options[0]?.selected) {
    if (textoError[0]) textoError[0].innerText = "Selecione a marca";
    if (marcaId) marcaId.focus();
  } else if (nome?.value === "") {
    if (nome) nome.classList.add("wrong");
    if (textoError[1]) textoError[1].innerText = "Insira o nome do prêmio";
    if (nome) nome.focus();
  } else if (codigoSku?.value === "") {
    if (codigoSku) codigoSku.classList.add("wrong");
    if (textoError[2]) textoError[2].innerText = "Insira o código sku";
    if (codigoSku) codigoSku.focus();
  } else if (descricao?.value === "") {
    if (descricao) descricao.classList.add("wrong");
    if (textoError[3]) textoError[3].innerText = "Digite a descrição";
    if (descricao) descricao.focus();
  } else if (quantidade?.value === "") {
    if (quantidade) quantidade.classList.add("wrong");
    if (textoError[4]) textoError[4].innerText = "Digite a quantidade";
    if (quantidade) quantidade.focus();
  } else {
    if (buttonSalvarEditar) buttonSalvarEditar.disabled = true;
    const formData = new FormData();
    formData.append("nome", nome?.value || '');
    formData.append("codigoSku", codigoSku?.value || '');
    formData.append(
      "imagem",
      imagem?.files.length > 0
        ? imagem.files[0]
        : new Blob([""], { type: "application/octet-stream" })
    );
    formData.append("quantidade", quantidade?.value || '');
    formData.append("descricao", descricao?.value || '');
    formData.append(
      "marcaId",
      parseInt(marcaId?.querySelector(`option[value="${marcaId?.value}"]`)?.id) || 0
    );
    document.body.style.cursor = "wait";
    const request = await post("premios/registrar", formData, "formData");
    if (request.status === 201) {
      mostrarAlert("Prêmio cadastrado com sucesso!", 'fas fa-circle-check');
      setTimeout(() => {
        window.location.assign("./premios-da-semana.html");
      }, 2500);
    } else {
      if (buttonSalvarEditar) buttonSalvarEditar.disabled = false;
      mostrarAlert("Não foi possível cadastrar o prêmio.", 'fas fa-circle-xmark');
    }
  }
};

// Função para editar prêmio
const editarPremio = async () => {
  removerError();
  if (nome?.value === "") {
    if (nome) nome.classList.add("wrong");
    if (textoError[1]) textoError[1].innerText = "Insira o nome do prêmio";
    if (nome) nome.focus();
  } else if (codigoSku?.value === "") {
    if (codigoSku) codigoSku.classList.add("wrong");
    if (textoError[2]) textoError[2].innerText = "Insira o código sku";
    if (codigoSku) codigoSku.focus();
  } else if (descricao?.value === "") {
    if (descricao) descricao.classList.add("wrong");
    if (textoError[3]) textoError[3].innerText = "Digite a descrição";
    if (descricao) descricao.focus();
  } else if (quantidade?.value === "") {
    if (quantidade) quantidade.classList.add("wrong");
    if (textoError[4]) textoError[4].innerText = "Digite a quantidade";
    if (quantidade) quantidade.focus();
  } else {
    if (buttonSalvarEditar) buttonSalvarEditar.disabled = true;
    const formData = new FormData();
    formData.append("nome", nome?.value || '');
    formData.append("codigoSku", codigoSku?.value || '');
    if (imagem?.files.length > 0) {
      const blob = await new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onloadend = () => resolve(new Blob([reader.result], { type: "image/jpeg" }));
        reader.onerror = reject;
        reader.readAsArrayBuffer(imagem.files[0]);
      });
      formData.append("imagem", blob);
    } else if (imagem?.getAttribute("base64img")) {
      const base64String = imagem.getAttribute("base64img");
      const blob = base64ToBlob(base64String, "image/jpeg");
      formData.append("imagem", blob);
    }
    formData.append("quantidade", quantidade?.value || '');
    formData.append("descricao", descricao?.value || '');
    formData.append(
      "marcaId",
      parseInt(marcaId?.querySelector(`option[value="${marcaId?.value}"]`)?.id) || 0
    );
    document.body.style.cursor = "wait";
    const request = await put(`premios/editar/${PREMIO_ID}`, formData, "formData");
    if (request.ok) {
      mostrarAlert("Prêmio editado com sucesso!", 'fas fa-circle-check');
      setTimeout(() => {
        window.location.assign("./premios-da-semana.html");
      }, 2500);
    } else {
      if (buttonSalvarEditar) buttonSalvarEditar.disabled = false;
      mostrarAlert("Não foi possível editar o prêmio.", 'fas fa-circle-xmark');
    }
  }
};

// Função para deletar prêmio
const removerPremio = async () => {
  document.body.style.cursor = "wait";
  const request = await remove(`premios/remover/${PREMIO_ID}`);
  if (request.ok) {
    mostrarAlert("Prêmio excluído com sucesso!", 'fas fa-circle-check');
    setTimeout(() => {
      window.location.assign("./premios-da-semana.html");
    }, 2500);
  } else {
    mostrarAlert("Não foi possível excluir o prêmio.", 'fas fa-circle-xmark');
  }
};

// Função para inicializar o formulário
const inicializarFormulario = async () => {
  await obterMarcasSelect();
  if (PREMIO_ID !== undefined) {
    document.body.style.cursor = "wait";
    await obterPremio(PREMIO_ID);
    if (buttonSalvarEditar) buttonSalvarEditar.addEventListener("click", editarPremio);
    if (buttonDeletar) buttonDeletar.addEventListener("click", (event) => {
      event.preventDefault();
      if (containerExcluir) containerExcluir.classList.add("show");
    });
  } else {
    if (buttonSalvarEditar) buttonSalvarEditar.addEventListener("click", cadastrarPremio);
  }
};

// Inicializar
inicializarFormulario();

// Manipulador de eventos para o input de imagem
if (imagem) {
  imagem.addEventListener("change", () => handleFileInput(imagem, previewPremio, 5));
}
