import {
  ACAO,
  MARCA_NOME,
  PREMIO_ID,
  SERVER_NAME,
  TOKEN,
  get,
  setMessage,
  post,
  put,
  remove,
} from "./CONSTANTES.js";

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
const containerExcluir = document.querySelector('.container-excluir')
const buttonSim = document.getElementById('button-sim')
const buttonNao = document.getElementById('button-nao')


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

// Função para Remover Mensagens de Erro
const removerError = () => {
  nome.classList.remove("wrong");
  codigoSku.classList.remove("wrong");
  descricao.classList.remove("wrong");
  quantidade.classList.remove("wrong");
  textoError.forEach((texto) => (texto.innerText = ""));
};

// Função para Preencher os Campos do Formulário
const definirCampos = (premio) => {
  titulo.textContent = "Editar prêmio da semana";
  legend.textContent = "Editar prêmio da semana";
  nome.value = premio.nome;
  imagem.setAttribute("base64img", premio.imagem);
  previewPremio.setAttribute(
    "src",
    `data:image/*;base64,${imagem.getAttribute("base64img")}`
  );
  codigoSku.value = premio.codigoSku;
  descricao.value = premio.descricao;
  quantidade.value = premio.quantidade;
  criadoPor.value = premio.criadoPor;
  criadoEm.value = `${premio.criadoEm
    .split("T")[0]
    .split("-")
    .reverse()
    .join("/")} ${premio.criadoEm.split("T")[1].split(".")[0]}`;

  buttonSim.addEventListener("click", (event) => {
    event.preventDefault();
    removerPremio();
  });
};

// Função para Obter Prêmio por ID
const obterPremio = async (id) => {
  const request = await get(`premios/obter/${PREMIO_ID}`, true);
  if (request.ok) {
    const response = await request.json();
    definirCampos(response);
  }
};

// Função para Obter e Preencher Marcas no Select
const obterMarcasSelect = async () => {
  const request = await get("marcas/obter", true);
  if (request.ok) {
    const response = await request.json();
    response.forEach((marca) => {
      const formOption = document.createElement("option");
      formOption.value = marca.nome;
      formOption.textContent = marca.nome;
      formOption.id = marca.id;
      marcaId.appendChild(formOption);
    });

    if (marcaId.querySelector(`option[value="${MARCA_NOME}"]`)) {
      marcaId.querySelector(`option[value="${MARCA_NOME}"]`).selected = true;
    }
  }
};

// Função para Cadastrar Prêmio
const cadastrarPremio = async () => {
  removerError();
  let options = document.querySelectorAll("option");
  if (options[0].selected) {
    textoError[0].innerText = "Selecione a marca";
    marcaId.focus();
  } else if (nome.value == "") {
    nome.classList.add("wrong");
    textoError[1].innerText = "Insira o nome do prêmio";
    nome.focus();
  } else if (codigoSku.value == "") {
    codigoSku.classList.add("wrong");
    textoError[2].innerText = "Insira o código sku";
    codigoSku.focus();
  } else if (descricao.value == "") {
    descricao.classList.add("wrong");
    textoError[3].innerText = "Digite a descrição";
    descricao.focus();
  } else if (quantidade.value == "") {
    quantidade.classList.add("wrong");
    textoError[4].innerText = "Digite a quantidade";
    quantidade.focus();
  } else {
    const formData = new FormData();
    formData.append("nome", nome.value);
    formData.append("codigoSku", codigoSku.value);
    formData.append(
      "imagem",
      imagem.files.length > 0
        ? imagem.files[0]
        : new Blob([""], { type: "application/octet-stream" })
    );
    formData.append("quantidade", quantidade.value);
    formData.append("descricao", descricao.value);
    formData.append(
      "marcaId",
      parseInt(marcaId.querySelector(`option[value="${marcaId.value}"]`).id)
    );
    document.body.style.cursor = "wait";
    const request = await post("premios/registrar", formData, "formData");
    if (request.status === 201) {
      setMessage("Prêmio cadastrado com sucesso! Você será redirecionado para a tela anterior", "ok", "./premios-da-semana.html");
      window.location.assign("#header-premios");
    } else {
      setMessage("Não foi possivel cadastrar o prêmio!","fail");
      window.location.assign("#header-premios");
    }
  }
};

// Função para Editar Prêmio
const editarPremio = async () => {
  removerError();
  if (nome.value == "") {
    nome.classList.add("wrong");
    textoError[1].innerText = "Insira o nome do prêmio";
    nome.focus();
  } else if (codigoSku.value == "") {
    codigoSku.classList.add("wrong");
    textoError[2].innerText = "Insira o código sku";
    codigoSku.focus();
  } else if (descricao.value == "") {
    descricao.classList.add("wrong");
    textoError[3].innerText = "Digite a descrição";
    descricao.focus();
  } else if (quantidade.value == "") {
    quantidade.classList.add("wrong");
    textoError[4].innerText = "Digite a quantidade";
    quantidade.focus();
  } else {
    const formData = new FormData();
    formData.append("nome", nome.value);
    formData.append("codigoSku", codigoSku.value);

    if (imagem.files.length > 0) {
      formData.append("imagem", imagem.files[0]);
    } else {
      const base64String = imagem.getAttribute("base64img");
      const blob = base64ToBlob(base64String, "image/png");
      formData.append("imagem", blob, "image.png");
    }

    formData.append("quantidade", quantidade.value);
    formData.append("descricao", descricao.value);
    formData.append(
      "marcaId",
      parseInt(marcaId.querySelector(`option[value="${marcaId.value}"]`).id)
    );
    const request = await put(`premios/editar/${PREMIO_ID}`, formData);

    if (request.status === 200) {
      setMessage("Prêmio editado com sucesso! Você será redirecionado para a tela anterior", "ok", "./premios-da-semana.html");
      window.location.assign("#header-premios");
    } else {
      setMessage("Não foi possivel editar o prêmio!","fail");
      window.location.assign("#header-premios");
    }
  }
};

// Função para Remover Prêmio
const removerPremio = async () => {
  const request = await remove(`premios/${PREMIO_ID}`);
  if (request.status === 200) {
    setMessage("Prêmio excluido com sucesso! Você será redirecionado para a tela anterior", "ok", "./premios-da-semana.html");
    window.location.assign("#header-premios");
  } else {
    setMessage("Não foi possivel excluir o prêmio!","fail");
    window.location.assign("#header-premios");
  }
};

// Adiciona as Marcas Disponíveis no Select
window.addEventListener("load", () => {
  obterMarcasSelect();
});

// Verifica a Ação a Ser Feita e Molde a Página a Partir Dela
switch (ACAO) {
  case "criar":
    buttonDeletar.classList.add("hidden");
    titulo.textContent = "Adicionar novo prêmio da semana";
    legend.textContent = "Adicionar novo prêmio da semana";
    criadoEmLabel.remove();
    criadoPorLabel.remove();
    break;

  case "editar":
    obterPremio(PREMIO_ID);
    break;

  default:
    break;
}

// Event Listener para Carregar a Imagem no Preview
imagem.addEventListener("change", () => {
  const reader = new FileReader();
  const file = imagem.files[0];
  reader.onloadend = () => {
    const base64String = reader.result;
    previewPremio.setAttribute("src", `${base64String}`);
    reader.abort();
  };
  reader.readAsDataURL(file);
});

// Adiciona o Evento de Submit ao Formulário
form.addEventListener("submit", (event) => {
  event.preventDefault();
  if (ACAO === "criar") {
    cadastrarPremio();
  } else if (ACAO === "editar") {
    editarPremio();
  }
});

buttonDeletar.addEventListener('click', () => {
  formFieldset.classList.add('hidden')
  containerExcluir.classList.remove('hidden')
  window.location.assign("#header-premios");
})

buttonNao.addEventListener('click', () => {
  formFieldset.classList.remove('hidden')
  containerExcluir.classList.add('hidden')
  window.location.assign("#header-premios");
})