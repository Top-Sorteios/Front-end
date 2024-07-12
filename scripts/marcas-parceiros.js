import { get } from "./CONSTANTES.js";

const marcasParceirasDiv = document.querySelector("#logo-marcas-parceiras");

const getMarcasParceiras = async function () {
  const request = await get("marcas/obter", true);
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
          : "https://github.com/Top-Sorteios/Front-end/blob/main/assets/images/placeholder-files/placeholder.png?raw=true"
      );
      marcaLogo.setAttribute("alt", marca.nome);
      marcaLogo.setAttribute("title",`Logo da ${marca.nome}`);
      marcasParceirasDiv.appendChild(figureLogo);
      console.log(marca.logo);

      marcaLogo.addEventListener("error", ()=>{
        marcaLogo.setAttribute("src","https://github.com/Top-Sorteios/Front-end/blob/main/assets/images/placeholder-files/placeholder.png?raw=true")
      })
    });
  }
};


window.addEventListener("DOMContentLoaded",()=>{
    getMarcasParceiras()
})