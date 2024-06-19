import SERVER_NAME from "./CONSTANTES.js";

const formImportarUsuarios = document.querySelector("#form-importar-usuarios");

const importarUsuarios = async function () {
  let url = `${SERVER_NAME}usuarios/importar-usuario/${sessionStorage.getItem(
    "email"
  )}`;
  const arquivo = document.querySelector("#importar-csv").files[0];
  const formData = new FormData();
  formData.append("file", arquivo);
  formData.append("email_autenticado", arquivo);

  const request = await fetch(url, {
    method: "POST",
    body: formData,
      headers: {
      Authorization: `Bearer ${sessionStorage.getItem("token")}`}
  });

  const response = await request.json();
  console.log(response);
};

formImportarUsuarios.addEventListener("submit", (event) => {
  event.preventDefault();
  importarUsuarios();
});
