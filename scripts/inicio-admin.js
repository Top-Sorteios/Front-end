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
    mostrarAlert("Não foi possível acessar a página. Você não possui permissão.", 'fas fa-circle-xmark');
      setTimeout(() => {
        window.location.assign("../gestao-de-marcas/marcas-cadastradas.html");
      }, 2500);
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
          : "https://github.com/Top-Sorteios/Front-end/blob/main/assets/images/placeholder-files/placeholder.png?raw=true"
      );
      marcaLogo.setAttribute("alt", marca.nome);
      marcaLogo.setAttribute("title", `Logo da ${marca.nome}`);
      marcaLogo.classList.add("marcas__logo");
      marcasParceirasDiv.appendChild(marcaLogo);
      console.log(marca.logo);

      marcaLogo.addEventListener("error", () => {
        marcaLogo.setAttribute("src", "https://github.com/Top-Sorteios/Front-end/blob/main/assets/images/placeholder-files/placeholder.png?raw=true");
      });
    });
  }
};

const buttonSair = document.getElementById('sair-pagina')
buttonSair.addEventListener('click', () => {
    sessionStorage.clear()
    window.location.replace("https://green-dune-0cd28a70f.5.azurestaticapps.net/")
})

window.addEventListener("load", () => {
  checarPermissao();
  obterMarcasParceiras();
});