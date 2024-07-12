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
      email: inputEmail.value,
      cpf: inputCPF.value,
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
    SET_NOME(response.nome);
    window.location.replace("/");
  }
};

const limparErros = function () {
  if (inputEmail.value) {
    inputEmail.classList.remove("wrong");
    textoError[0].innerText = "";
  }

  if (inputCPF.value && inputCPF.value.length === 11) {
    inputCPF.classList.remove("wrong");
    textoError[1].innerText = "";
  }
  if (inputSenha.value) {
    inputSenha.classList.remove("wrong");
    textoError[2].innerText = "";
  }
  if (inputConfirmarSenha.value) {
    inputConfirmarSenha.classList.remove("wrong");
    textoError[3].innerText = "";
  }
  if (inputSenha.value === inputConfirmarSenha.value) {
    inputConfirmarSenha.classList.remove("wrong");
    textoError[4].innerText = "";
  }
};
const limparFormulario = function () {
  const listaInputs = document.querySelectorAll("input");
  listaInputs.forEach((input) => {
    input.value = "";
  });
};

const checarErros = function () {
  if (!inputEmail.value) {
    inputEmail.classList.add("wrong");
    textoError[0].innerText = "Digite o email";
    inputEmail.focus();
  }
  if (!inputCPF.value) {
    inputCPF.classList.add("wrong");
    textoError[1].innerText = "Insira o CPF. Sem traços ou pontos.";
    inputCPF.focus();
  } else if (inputCPF.value.length < 11) {
    inputCPF.classList.add("wrong");
    textoError[1].innerText = "CPF inválido";
    inputCPF.focus();
  }

  if (!inputDataNascimento.value) {
    textoError[2].innerText = "Insira a data de nascimento";
    inputDataNascimento.classList.add("wrong");
    inputDataNascimento.focus();
  }
  if (!inputSenha.value) {
    inputSenha.classList.add("wrong");
    textoError[3].innerText = "Digite a senha";
    inputSenha.focus();
  }

  if (!inputConfirmarSenha.value) {
    inputConfirmarSenha.classList.add("wrong");
    textoError[4].innerText = "Digite a senha";
    inputConfirmarSenha.focus();
  }

  if (inputSenha.value != inputConfirmarSenha.value) {
    inputConfirmarSenha.classList.add("wrong");
    textoError[4].innerText = "As senhas não são iguais.";
    inputConfirmarSenha.focus();
  }
};

formPrimeiroAcesso.addEventListener("submit", (event) => {
  event.preventDefault();
  limparErros();
  checarErros();
  if (
    inputEmail.value &&
    inputCPF.value &&
    inputDataNascimento.value &&
    inputSenha.value &&
    inputConfirmarSenha.value
  ) {
    cadastrar();
  }
});

// document.getElementById('cpf').addEventListener('input', function (e) {
//   let value = e.target.value.replace(/\D/g, '');
//   value = value.replace(/(\d{3})(\d)/, '$1.$2');
//   value = value.replace(/(\d{3})(\d)/, '$1.$2');
//   value = value.replace(/(\d{3})(\d{1,2})$/, '$1-$2');
//   e.target.value = value;
// });
