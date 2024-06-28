import {SERVER_NAME} from "./CONSTANTES.js";

const formPrimeiroAcesso = document.querySelector("#primeiro-acesso-form");

const inputEmail = document.querySelector("#email");
const inputCPF = document.querySelector("#cpf");
const inputDataNascimento = document.querySelector("#data-nascimento");
const inputSenha = document.querySelector("#senha");
const inputConfirmarSenha = document.querySelector("#confirmar-senha");

const cadastrar = async function () {


  let url = SERVER_NAME + "usuarios/primeiro-acesso";


  
  const request = await fetch(url, {
    method: "PUT",
    
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      email: inputEmail.value,
      cpf: inputCPF.value,
      datanascimento: inputDataNascimento.value.replaceAll("-","/"),
      senha: inputSenha.value,
    }),
  });
  const response = await request.json();
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
        cadastrar().then(()=>{
          limparFormulario()
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
