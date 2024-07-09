import { SERVER_NAME, EMAIL, get } from "./CONSTANTES.js";

const formImportarUsuarios = document.querySelector("#form-importar-usuarios");
const resultadosSection = document.querySelector("#resultados");
const resultadosTexto = document.querySelector("#resultados-texto");

const formFieldset = document.querySelector('.form__fieldset')

const textoError = document.querySelector('.wrong-text')

const importarUsuarios = async function () {
  limarError()
  let url = `${SERVER_NAME}usuarios/importar-usuario`;
  const arquivo = document.querySelector("#importar-csv").files[0];
  const formData = new FormData();
  formData.append("file", arquivo);
  formData.append("email_autenticado", EMAIL);

  if (arquivo == null) {
    formFieldset.classList.add('wrong')
    textoError.innerText = 'Insira um arquivo CSV'
  } else {

  const request = await fetch(url, {
    method: "POST",
    body: formData,
    headers: {
      Authorization: `Bearer ${sessionStorage.getItem("token")}`,
    },
  });
  
  if (request.status == 201) {
    resultadosSection.classList.add("right");
    resultadosTexto.textContent = "Usuários importados com sucesso.";
  } else if (request.status === 400){
    resultadosSection.classList.remove("right");
    resultadosSection.classList.add("wrong");
    resultadosTexto.textContent = "Seu arquivo não segue o padrão necessário para importação."
  } else if (request.status === 500){
      resultadosSection.classList.remove("right");
      resultadosSection.classList.add("wrong");
      resultadosTexto.textContent = "O servidor pode estar indisponível. Entre em contato com o suporte ou tente novamente mais tarde."
    } else {
      resultadosSection.classList.remove("right");
      resultadosSection.classList.add("wrong");
    resultadosTexto.textContent = "Erro desconhecido. Entre em contato com o suporte."
    }
  }

  // const response = await request.json();
};

const limarError = function () {
  textoError.innerText = ''
  formFieldset.classList.remove('wrong')
}

formImportarUsuarios.addEventListener("submit", (event) => {
  event.preventDefault();
  importarUsuarios();
});
