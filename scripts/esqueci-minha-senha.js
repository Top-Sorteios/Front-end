import { post, mostrarAlert } from "./CONSTANTES.js";

const formEsqueciSenha = document.querySelector("#form-esqueci-senha");
const email = document.querySelector("#email");
const buttonEnviar = document.getElementById('button-enviar')

const requisitarMudancaSenha = async function () {
  buttonEnviar.disabled = true
  document.body.style.cursor = "wait";

  // const request = await fetch(url, {
  //   method: "POST",
  //   mode: "cors",
  //   headers: { "Content-Type": "application/json" },
  //   body: JSON.stringify({
  //       email: email.value,
  //   }),
  // });

  const request = await post(
    "usuarios/esqueci-senha",
    { email: email.value },
    "json"
  );
  if (request.ok) {
    const response = await request.json();
    console.log(response);
    mostrarAlert("As instruções pra recuperar a senha foram enviadas para sua caixa de entrada.", 'fas fa-circle-check')
    setTimeout(() => {
      window.location.assign("../login/index.html");
    }, 2500);
    // document.querySelector("#message").classList.remove("none")
  }
  else{
    buttonEnviar.disabled = false
    mostrarAlert("Erro ao enviar solicitação. Usuário não encontrado.", "fa-solid fa-circle-xmark")
  }
  document.body.style.cursor = "auto";
};

formEsqueciSenha.addEventListener("submit", (event) => {
  event.preventDefault();
  requisitarMudancaSenha();
});

// setMessage("teste");
