import SERVER_NAME from "./CONSTANTES.js";

const formLogin = document.querySelector("#form-login");
const inputEmail = document.querySelector("#email");
const inputSenha = document.querySelector("#senha");

const entrar = async function () {
  let url = SERVER_NAME + "usuarios/login";

  try {
    const request = await fetch(url, {
      method: "POST",
      mode: "cors",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: inputEmail.value,
        senha: inputSenha.value,
      }),
    });

    const response = await request.json();
    sessionStorage.setItem("email", response.email);
    sessionStorage.setItem("token", response.token);

    if (response.status) {
      const permissao = await obterPermissao(response.email, response.token);

      switch (permissao.administrador) {
        case false:
          window.location.assign("../home/inicio.html");
          break;
        case true:
          window.location.assign("../home/inicio-admin.html");
        default:
          break;
      }
    }
  } catch (error) {
    console.log("O erro foi:" + error);
  }
};

const obterPermissao = async function (email, token) {
  let url = `${SERVER_NAME}usuarios/obter/${email}`;

  const request = await fetch(url, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });
  const response = await request.json();
  console.log(response)
  return response;
};

//serializar = transformar em texto
//deserializar = transformar json em obj
formLogin.addEventListener("submit", function (event) {
  event.preventDefault();
  entrar();
});

export default obterPermissao;
