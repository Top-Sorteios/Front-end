import { EMAIL, SERVER_NAME, TOKEN, get } from "./CONSTANTES.js";

const marcasParceirasContainer = document.querySelector(
  "#logo-marcas-parceiras"
);
const botaoEntrar = document.querySelector("#login");

botaoEntrar.addEventListener("click", (event) => {
  event.preventDefault();
  window.location.assign("./html/login/index.html");
});

const getMarcasParceiras = async function () {
  const request = await get("marcas/obter", true);
  if (request.status === 200) {
    const response = await request.json();

    console.log(response);
  }
};

const redirecionar = async function (email, token) {
  console.log(email, token);
  if (email === null || token === null) {
    console.log("Visitante");
  }

  if (email != null && token != null) {
    const request = await get(`usuarios/obter/${email}`, true);

    if (request.status == 200) {
      const response = await request.json();
      switch (response.administrador) {
        case true:
          window.location.replace("./html/home/inicio-admin.html");
          break;
        case false:
          window.location.replace("./html/home/inicio.html");
          break;

        default:
          console.log("Erro inesperado");
          break;
      }
    }
  }
};

window.addEventListener("load", () => {
  redirecionar(EMAIL, TOKEN);
  //   getMarcasParceiras();
});
