import SERVER_NAME from "./CONSTANTES";

const importarUsuarios = async function () {
  const arquivo = document.querySelector("#importar-csv").files[0];
  let url = `${SERVER_NAME}usuarios/importar-usuario/${sessionStorage.getItem(
    "email"
  )}`;

  const request = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "form-data",
      body: new FormData().append("file", arquivo),
    },
  });
};
