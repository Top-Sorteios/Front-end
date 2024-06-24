import { SERVER_NAME, get } from "./CONSTANTES.js";

const marcasParceirasDiv = document.querySelector("#logo-marcas-parceiras");

const checarPermissao = async function () {
  let url = `${SERVER_NAME}usuarios/obter/${sessionStorage.getItem("email")}`;

  const request = await fetch(url, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${sessionStorage.getItem("token")}`,
      "Content-Type": "application/json",
    },
  });
  const response = await request.json();

  if (!response.administrador || response.administrador != true) {
    alert("você não tem permisssão pra acessar essa página");
    window.location.replace("../home/");
  }
};

const obterMarcasParceiras = async function () {
  const request = await get("marcas/obter", true);
  if (request.ok) {
    const response = await request.json();

    response.forEach((marca) => {
      const marcaLogo = document.createElement("img");
      marcaLogo.setAttribute(
        "src",
        marca.logo != null
          ? `data:image/png;base64,${marca.logo}`
          : "https://placehold.co/320x240"
      );
      marcaLogo.setAttribute("alt", marca.nome);
      marcaLogo.setAttribute("title", `Logo da ${marca.nome}`);
      marcaLogo.classList.add("marcas__logo");
      marcasParceirasDiv.appendChild(marcaLogo);
      console.log(marca.logo);

      marcaLogo.addEventListener("error", () => {
        marcaLogo.setAttribute("src", "https://placehold.co/320x240");
      });
    });
  }
};

window.addEventListener("load", () => {
  checarPermissao();
  obterMarcasParceiras();
});
