import SERVER_NAME from "./CONSTANTES.js";

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

checarPermissao();
