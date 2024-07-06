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
    // window.location.reload();
  }
  document.querySelector("#nav-dropdown").classList.add("visible");
  document.querySelector("#nav-dropdown").classList.remove("hidden");
} else {
  document.querySelector("#nav-dropdown").classList.add("hidden");
}

const checarAdministrador = async function () {
  const request = await get(`usuarios/obter/${EMAIL}`, true);
  if (request.ok) {
    const response = await request.json();
    console.log(response);
    if (response.administrador === true) {
      document.querySelector("#admin-area").classList.remove("hidden");
    } else {
      document.querySelector("#admin-area").classList.add("hidden");
    }
  }
};

const checarAdministradorModal = async function () {
  const request = await get(`usuarios/obter/${EMAIL}`, true);
  if (request.ok) {
    const response = await request.json();
    console.log(response);

    if (response.administrador === true) {
      document.querySelector("#modal-admin-area").classList.remove("hidden");
    } else {
      document.querySelector("#modal-admin-area").classList.add("hidden");
    }
  }
};

const navBar = `<nav class="modal__nav">
                  <span id="exit-icon">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-x" viewBox="0 0 16 16">
                      <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708"/>
                    </svg>
                  </span>
                  <a class="modal__nav-a" href="#">Inicio</a>
                  <a class="modal__nav-a" href="../gestao-de-sorteios/historico-de-sorteios.html">Historico de
                  sorteios</a>
                  <a class="modal__nav-a " href="../gestao-de-marcas/marcas-parceiros.html">Parceiros</a>
                  <a class="modal__nav-a " href="">
                  <button id="login" class="b md  bold"> Participar dos sorteios</button></a>
                  <span class="modal__nav-a" id="modal-username">Fazer login</span>
                  <a id="modal-admin-area" class="modal__nav-a hidden" href="../home/inicio-admin.html">Administrador</a>
                  <a class="modal__nav-a" href="../gestao-de-usuarios/alterar-senha.html" id="modal-alterar-senha">Alterar Senha</a>
                  <a class="modal__nav-a" href="" id="modal-sair">Sair</a>
                </nav>`;

document.querySelector("#modal-nav-icon").addEventListener("click", () => {
  const navMobileMenu = document.createElement("div");
  navMobileMenu.id = "nav-mobile-menu";
  navMobileMenu.innerHTML = navBar;
  document.querySelector("body").appendChild(navMobileMenu);

  if (NOME) {
    document.querySelector("#modal-username").textContent = NOME;
  } else {
    // window.location.reload();
    document.querySelector("#modal-alterar-senha").classList.add("hidden");
    document.querySelector("#modal-sair").classList.add("hidden");
    document.querySelector("#modal-username").addEventListener("click", () => {
      window.location.assign("/html/login/index.html");
    });
  }

  if (EMAIL != null && TOKEN != null) {
    checarAdministradorModal();
  }
  document.querySelector("#modal-sair").addEventListener("click", () => {
    sair();
  });

  document.querySelector("#exit-icon").addEventListener("click", () => {
    document.querySelector("#nav-mobile-menu").remove();
  });
});

document.querySelector("#sair").addEventListener("click", () => {
  sair();
});

const sair = function () {
  REMOVE_EMAIL();
  REMOVE_TOKEN();
  REMOVE_NOME();
  document.querySelector("#nav-dropdown").classList.add("visible");
  document.querySelector("#nav-dropdown").classList.remove("hidden");
  window.location.assign("/index.html");
};

window.addEventListener("load", () => {
  if (EMAIL != null && TOKEN != null) {
    checarAdministrador();
  }
});
