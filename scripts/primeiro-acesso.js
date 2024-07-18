import { SERVER_NAME, SET_EMAIL, SET_NOME, SET_TOKEN } from "./CONSTANTES.js";

const formPrimeiroAcesso = document.querySelector("#primeiro-acesso-form");

const inputEmail = document.querySelector("#email");
const inputCPF = document.querySelector("#cpf");
const inputDataNascimento = document.querySelector("#data-nascimento");
const inputSenha = document.querySelector("#senha");
const inputConfirmarSenha = document.querySelector("#confirmar-senha");
const textoError = document.querySelectorAll(".wrong-text");

const cadastrar = async function () {
  let url = SERVER_NAME + "usuarios/primeiro-acesso";
  console.log(inputDataNascimento.value);

  const request = await fetch(url, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      email: inputEmail.value.toLowerCase(),
      cpf: inputCPF.value.split(".").join("").split("-").join(""),
      datanascimento: inputDataNascimento.value,
      senha: inputSenha.value,
    }),
  });
 
  if (request.status === 500 || request.status === 400) {
    document.querySelector("#invalido-ou-feito").classList.remove("none");
  }

  if (request.ok) {
    document.querySelector("#invalido-ou-feito").classList.add("none");
    const response = await request.json();
    SET_EMAIL(response.email);
    SET_TOKEN(response.token);
    window.location.replace("/");
  }
};

const limparErros = function () {
  textoError.forEach((error) => {
    error.innerText = "";
  });

  inputEmail.classList.remove("wrong");
  inputCPF.classList.remove("wrong");
  inputDataNascimento.classList.remove("wrong");
  inputSenha.classList.remove("wrong");
  inputConfirmarSenha.classList.remove("wrong");
};

const limparFormulario = function () {
  const listaInputs = document.querySelectorAll("input");
  listaInputs.forEach((input) => {
    input.value = "";
  });
};

const checarErros = function () {
  let hasErrors = false;

  if (!inputEmail.value) {
    inputEmail.classList.add("wrong");
    textoError[0].innerText = "Digite o email";
    hasErrors = true;
  }

  if (!inputCPF.value) {
    inputCPF.classList.add("wrong");
    textoError[1].innerText = "Insira o CPF (apenas números)";
    hasErrors = true;
  } else if (inputCPF.value.length < 11) {
    inputCPF.classList.add("wrong");
    textoError[1].innerText = "CPF inválido";
    hasErrors = true;
  }

  if (!inputDataNascimento.value) {
    inputDataNascimento.classList.add("wrong");
    textoError[2].innerText = "Insira a data de nascimento";
    hasErrors = true;
  }

  if (!inputSenha.value) {
    inputSenha.classList.add("wrong");
    textoError[3].innerText = "Digite a senha";
    hasErrors = true;
  }

  if (!inputConfirmarSenha.value) {
    inputConfirmarSenha.classList.add("wrong");
    textoError[4].innerText = "Digite a senha novamente";
    hasErrors = true;
  }

  if (inputSenha.value && inputConfirmarSenha.value && inputSenha.value !== inputConfirmarSenha.value) {
    inputConfirmarSenha.classList.add("wrong");
    textoError[4].innerText = "As senhas não correspondem.";
    hasErrors = true;
  }

  return hasErrors;
};

formPrimeiroAcesso.addEventListener("submit", (event) => {
  event.preventDefault();
  limparErros();
  const hasErrors = checarErros();
  if (!hasErrors) {
    cadastrar();
  }
});
