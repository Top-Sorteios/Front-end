import { EMAIL, TOKEN, get } from "./CONSTANTES.js";

const marcasParceirasContainer = document.querySelector(
  "#logo-marcas-parceiras"
);

const getMarcasParceiras = async function () {
  if (request.ok) {
    const response = await request.json();

    response.forEach((marca) => {
      const figureLogo = document.createElement("figure");
      const marcaLogo = document.createElement("img");
      figureLogo.appendChild(marcaLogo);
      marcaLogo.setAttribute(
        "src",
        marca.logo != null
          ? `data:image/png;base64,${marca.logo}`
          : "https://placehold.co/320x240"
      );
      marcaLogo.setAttribute("alt", marca.nome);
      marcaLogo.setAttribute("title",`Logo da ${marca.nome}`);
      marcasParceirasDiv.appendChild(figureLogo);
      console.log(marca.logo);

      marcaLogo.addEventListener("error", ()=>{
        marcaLogo.setAttribute("src","https://placehold.co/320x240")
      })
    });
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
          window.location.replace("./html/home/inicio.html");
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

window.addEventListener("DOMContentLoaded", () => {
  redirecionar(EMAIL, TOKEN);
  getMarcasParceiras();
});
