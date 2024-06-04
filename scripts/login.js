import SERVER_NAME from "./CONSTANTES.js";

const formLogin = document.querySelector("#form-login");

const inputEmail = document.querySelector("#email");
const inputSenha = document.querySelector("#senha");

const entrar = async function () {
  let url = SERVER_NAME + "usuarios/login";

  const request = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      email: inputEmail.value,
      senha: inputSenha.value,
    }),
  });

  const response = await request.json();
  console.log(response);
};

//serializar = transformar em texto
//deserializar = transformar json em obj
formLogin.addEventListener("submit", function (event) {
  event.preventDefault();
  entrar();
});
