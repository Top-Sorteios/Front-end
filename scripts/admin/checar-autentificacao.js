import SERVER_NAME from "../CONSTANTES.js";

const checarAutentificacaoAdmin = async function (email, token) {
  if (!email || !token) {
    alert("Você não pode acessar essa página sem fazer a autentificação");
    window.location.replace("");
  } else {
    let url = `${SERVER_NAME}usuarios/obter/${email}`;

    const request = await fetch(url, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
    const response = await request.json();
    console.log(response);
  }

  if (!response.administrador || response.administrador != true) {
    alert("você não tem permisssão pra acessar essa página");
    window.location.replace("");
  }
};

window.addEventListener("load", () => {
  console.log("working");
  checarAutentificacaoAdmin(
    sessionStorage.getItem("email"),
    sessionStorage.getItem("token")
  );
});