import SERVER_NAME from "./CONSTANTES";

const formImportarUsuarios = document.querySelector("#form-importar-usuarios");

const importarUsuarios = async function () {
  let url = `${SERVER_NAME}usuarios/importar-usuario/${sessionStorage.getItem(
    "email"
  )}`;
  const arquivo = document.querySelector("#importar-csv").files[0];
  const formData = new FormData();
  formData.append("file", arquivo);

  const request = await fetch(url, {
    method: "POST",
    body: formData,
  });

  const response = await request.json();
  console.log(response);
};

formImportarUsuarios.addEventListener("submit", (event) => {
  event.preventDefault();
  importarUsuarios();
});
