import { get } from "./CONSTANTES.js";
const marcasParceirasDiv = document.querySelector("#logo-marcas-parceiras");


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
      marcaLogo.setAttribute("title",`Logo da ${marca.nome}`);
      marcasParceirasDiv.appendChild(marcaLogo);
      console.log(marca.logo);

      marcaLogo.addEventListener("error", ()=>{
        marcaLogo.setAttribute("src","https://placehold.co/320x240")
      })
    });
  }
};

window.addEventListener("DOMContentLoaded", () => {
  obterMarcasParceiras();
});
