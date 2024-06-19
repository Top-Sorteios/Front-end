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

    if (request.ok) {
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
            break;
          default:
            break;
        }
      }
    } else if (request.status === 400) {
      document.location.replace("./primeiro-acesso.html");
    } else if (request.status === 404) {
      inputEmail.classList.add("wrong");
      inputSenha.classList.add("wrong");
    }
  } catch (error) { 
    console.log("O erro foi:" + error.status);
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
  if (request.ok) {
    const response = await request.json();
    console.log(response);
    return response;
  }
};

//serializar = transformar em texto
//deserializar = transformar json em obj
formLogin.addEventListener("submit", function (event) {
  event.preventDefault();
  entrar();
});

export default obterPermissao;
