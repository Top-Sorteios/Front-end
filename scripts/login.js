import SERVER_NAME from "./CONSTANTES.js";

const formLogin = document.querySelector("#form-login");

const inputEmail = document.querySelector("#email");
const inputSenha = document.querySelector("#senha");

const entrar = async function () {
  let url = SERVER_NAME + "usuarios/login";

  try {
    const request = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: inputEmail.value,
        senha: inputSenha.value,
      }),
    });

    const response = await request.json();

    if (response.status) {
      sessionStorage.setItem("email", response.email);
      sessionStorage.setItem("token", response.token);
      window.location.assign("../home/inicio.html")
    }

    console.log(response);
  } catch (error) {
    console.log(error);
  }
};

//serializar = transformar em texto
//deserializar = transformar json em obj
formLogin.addEventListener("submit", function (event) {
  event.preventDefault();
  entrar();
});
