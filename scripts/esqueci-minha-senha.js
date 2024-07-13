import { post } from "./CONSTANTES.js";
import { mostrarAlert } from "./alerts.js";

const formEsqueciSenha = document.querySelector("#form-esqueci-senha");
const email = document.querySelector("#email");

const requisitarMudancaSenha = async function () {
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
    mostrarAlert("As instruções pra recuperar a senha foram enviadas para sua caixa de entrada!", 'fas fa-circle-check')
    // document.querySelector("#message").classList.remove("none")
  }
  document.body.style.cursor = "auto";
};

formEsqueciSenha.addEventListener("submit", (event) => {
  event.preventDefault();
  requisitarMudancaSenha();
});

// setMessage("teste");
