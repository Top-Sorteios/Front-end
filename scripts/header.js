import {
  EMAIL,
  NOME,
  REMOVE_EMAIL,
  REMOVE_NOME,
  REMOVE_TOKEN,
  TOKEN,
} from "./CONSTANTES.js";

if (EMAIL != null && TOKEN != null) {
  console.log(NOME)
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

const sair = document.querySelector("#sair");
sair.addEventListener("click", () => {
  REMOVE_EMAIL();
  REMOVE_TOKEN();
  REMOVE_NOME();
  document.querySelector("#nav-dropdown").classList.add("visible");
  document.querySelector("#nav-dropdown").classList.remove("hidden");
  window.location.assign("/index.html");
});
