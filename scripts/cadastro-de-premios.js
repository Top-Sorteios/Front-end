import { SERVER_NAME, TOKEN, get } from "./CONSTANTES.js";
const formSelect = document.querySelector("#selecionar-marca");

const obterMarcasSelect = async function () {
  // let url = `${SERVER_NAME}marcas/obter`;
  // const request = await fetch(url, {
  //   method: "GET",
  //   headers: {
  //     Authorization: `Bearer ${TOKEN}`,
  //   },
  // });

  // if (await request.ok) {
  //   const response = await request.json();
  //   response.forEach((marca) => {
  //     const formOption = document.createElement("option");
  //     formOption.value = marca.nome;
  //     formOption.textContent = marca.nome;
  //     formSelect.appendChild(formOption);
  //   });
  // }

  const request = await get("marcas/obter", true);
  if (request.ok) {
    const response = await request.json();
    response.forEach((marca) => {
      const formOption = document.createElement("option");
      formOption.value = marca.nome;
      formOption.textContent = marca.nome;
      formSelect.appendChild(formOption);
    });
  }
};

const cadastrarPremio = async function () {
  let url = `${SERVER_NAME}premios/registrar`;

  const request = await fetch(url, {
    method: "POST",
  });
};

window.addEventListener("load", () => {
  obterMarcasSelect();
});
