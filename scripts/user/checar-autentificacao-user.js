import {SERVER_NAME} from "../CONSTANTES.js";
//TODO Fix redirect
const checarAutentificacaoUser = async function (email, token) {
  if (!email || !token) {
    alert("Você não pode acessar essa página sem fazer a autentificação");
    window.location.replace(
      "https://green-dune-0cd28a70f.5.azurestaticapps.net/"
    );
  } else {
    try {
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
      } else {
        alert("Sessão inválida");
        window.location.replace(
          "https://green-dune-0cd28a70f.5.azurestaticapps.net/"
        );
      }
    } catch (error) {
      console.log("meu erro:" + error);
    }
  }
};

window.addEventListener("load", () => {
  console.log("working");
  checarAutentificacaoUser(
    sessionStorage.getItem("email"),
    sessionStorage.getItem("token")
  );
});
