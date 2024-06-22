import { SERVER_NAME, get } from "./CONSTANTES.js";

const formImportarUsuarios = document.querySelector("#form-importar-usuarios");
const resultadosSection = document.querySelector("#resultados");
const resultadosTexto = document.querySelector("#resultados-texto");

const importarUsuarios = async function () {
  let url = `${SERVER_NAME}usuarios/importar-usuario`;
  const arquivo = document.querySelector("#importar-csv").files[0];
  const formData = new FormData();
  formData.append("file", arquivo);
  formData.append("email_autenticado", sessionStorage.getItem("email"));

  const request = await fetch(url, {
    method: "POST",
    body: formData,
    headers: {
      Authorization: `Bearer ${sessionStorage.getItem("token")}`,
    },
  });

  const response = await request.json();
  console.log(response);
  resultadosTexto.textContent = response.mensagem;
};

formImportarUsuarios.addEventListener("submit", (event) => {
  event.preventDefault();
  importarUsuarios();
});
