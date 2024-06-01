import SERVER_NAME from "./CONSTANTES.js";

const formPrimeiroAcesso = document.querySelector("#primeiro-acesso-form");

const inputEmail = document.querySelector("#email");
const inputCPF = document.querySelector("#cpf");
const inputDataNascimento = document.querySelector("#data-nascimento");
const inputSenha = document.querySelector("#senha");
const inputConfirmarSenha = document.querySelector("#confirmar-senha");

const cadastrar = async function () {


  let url = SERVER_NAME + "primeiro-acesso";

  const request = await fetch(url, {
    method: "PUT",
    mode: "cors",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      email: inputEmail.value,
      cpf: inputCPF.value,
      datanascimento: inputDataNascimento.value,
      senha: inputSenha.value,
    }),
  });
  const response = request.json();
  console.log(response);
};

const limparFormulario= function(){ 
    const listaInputs = document.querySelectorAll("input");
    listaInputs.forEach(input => {
        input.value = "";
    })
}

formPrimeiroAcesso.addEventListener("submit", (event) => {
  event.preventDefault();
    if(inputSenha.value == inputConfirmarSenha.value){
        cadastrar();
        limparFormulario()
    }

});
