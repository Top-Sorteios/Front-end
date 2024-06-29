import { SERVER_NAME } from "./CONSTANTES.js";

const formPrimeiroAcesso = document.querySelector("#primeiro-acesso-form");

const inputEmail = document.querySelector("#email");
const inputCPF = document.querySelector("#cpf");
const inputDataNascimento = document.querySelector("#data-nascimento");
const inputSenha = document.querySelector("#senha");
const inputConfirmarSenha = document.querySelector("#confirmar-senha");
const textoError = document.querySelectorAll('.wrong-text')
console.log(inputSenha)
const cadastrar = async function () {
  limparFormulario()
  if (inputEmail.value == '') {
    inputEmail.classList.add('wrong')
    textoError[0].innerText = 'Digite o email'
    inputEmail.focus()
  } else if (inputCPF.value == '') {
    inputCPF.classList.add('wrong')
    textoError[1].innerText = 'Digite o CPF'
    inputCPF.focus()
  } else {

    let url = SERVER_NAME + "usuarios/primeiro-acesso";



    const request = await fetch(url, {
      method: "PUT",

      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: inputEmail.value,
        cpf: inputCPF.value,
        datanascimento: inputDataNascimento.value.replaceAll("-", "/"),
        senha: inputSenha.value,
      }),
    });
    const response = await request.json();
    console.log(response);
  }
};

const limparFormulario = function() {
  inputEmail.classList.remove('wrong')
  inputCPF.classList.remove('wrong')
  inputSenha.classList.remove('wrong')
  inputConfirmarSenha.classList.remove('wrong')
  textoError[0].innerText = ''
  textoError[1].innerText = ''
  textoError[2].innerText = ''
  textoError[3].innerText = ''
}
// const limparFormulario = function () {
//   const listaInputs = document.querySelectorAll("input");
//   listaInputs.forEach(input => {
//     input.value = "";
//   })
// }

formPrimeiroAcesso.addEventListener("submit", (event) => {
  event.preventDefault();
  if (inputSenha.value == inputConfirmarSenha.value) {
    cadastrar().then(() => {
    });

  }

});

document.getElementById('cpf').addEventListener('input', function (e) {
  let value = e.target.value.replace(/\D/g, '');
  value = value.replace(/(\d{3})(\d)/, '$1.$2');
  value = value.replace(/(\d{3})(\d)/, '$1.$2');
  value = value.replace(/(\d{3})(\d{1,2})$/, '$1-$2');
  e.target.value = value;
});
