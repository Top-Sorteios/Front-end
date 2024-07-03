import {
  EMAIL,
  NOME,
  REMOVE_EMAIL,
  REMOVE_NOME,
  REMOVE_TOKEN,
  TOKEN,
  get,
} from "./CONSTANTES.js";

if (EMAIL != null && TOKEN != null) {
  console.log(NOME);
  if (NOME) {
    document.querySelector("#username").textContent = NOME;
  } else {
    window.location.reload();
  }
  document.querySelector("#nav-dropdown").classList.add("visible");
  document.querySelector("#nav-dropdown").classList.remove("hidden");
} else {
  document.querySelector("#nav-dropdown").classList.add("hidden");
}

const checarAdministrador = async function () {
  const request = await get(`usuarios/obter/${EMAIL}`, true);
  const response = await request.json();
  console.log(response);

  if (response.administrador === true) {
    document.querySelector("#admin-area").classList.remove("hidden");
  } else {
    document.querySelector("#admin-area").classList.add("hidden");
  }
};

const sair = document.querySelector("#sair");
sair.addEventListener("click", () => {
  REMOVE_EMAIL();
  REMOVE_TOKEN();
  REMOVE_NOME();
  document.querySelector("#nav-dropdown").classList.add("visible");
  document.querySelector("#nav-dropdown").classList.remove("hidden");
  window.location.assign("/index.html");
});

window.addEventListener("load", () => {
  checarAdministrador();
});
