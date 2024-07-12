export const SERVER_NAME = "https://modulo-sorteios.azurewebsites.net/";
export const EMAIL = sessionStorage.getItem("email");
export const ACAO = sessionStorage.getItem("acao");
export const PREMIO_ID = sessionStorage.getItem("marca-id");
export const NOME = sessionStorage.getItem("nome");
export const MARCA_NOME = sessionStorage.getItem("marca-nome");

export const SET_ACAO = (acao) => {
  sessionStorage.setItem("acao", acao);
};

export const SET_PREMIO_ID = (id) => {
  sessionStorage.setItem("marca-id", id);
};
export const SET_MARCA_NOME = (nome) => {
  sessionStorage.setItem("marca-nome", nome);
};
export const SET_EMAIL = (email) => {
  sessionStorage.setItem("email", email);
};
export const SET_TOKEN = (token) => {
  sessionStorage.setItem("token", token);
};

export const SET_NOME = (nome) => {
  sessionStorage.setItem("nome", nome);
};
export const TOKEN = sessionStorage.getItem("token");

export const REMOVE_NOME = () => {
  sessionStorage.removeItem("nome");
};
export const REMOVE_EMAIL = () => {
  sessionStorage.removeItem("email");
};
export const REMOVE_TOKEN = () => {
  sessionStorage.removeItem("token");
};

/*
Esse método precisa estar dentro de uma função assincrona. Exemplo:

const funcao = async function(){
    const obter = await get("caminho", false);
    console.log(obter);
}

*/

export const get = async function (endpoint, auth) {
  const request = await fetch(SERVER_NAME + endpoint, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `${auth == true ? "Bearer " + TOKEN : undefined}`,
    },
  });
  return request;
};

export const put = async function (endpoint, body) {
  const request = await fetch(SERVER_NAME + endpoint, {
    method: "PUT",
    mode: "cors",
    headers: {
      Authorization: `Bearer ${TOKEN}`,
    },
    body: body,
  });
  return request;
};

export const remove = async function (endpoint) {
  const request = await fetch(SERVER_NAME + endpoint, {
    method: "DELETE",
    mode: "cors",
    headers: {
      Authorization: `Bearer ${TOKEN}`,
    },
  });
  return request;
};

export const post = async function (endpoint, body, contentType) {
  const settings = {
    method: "POST",
    mode: "cors",
    headers: {},
  };

  if (contentType == "json") {
    settings.headers["Content-Type"] = "application/json";
    settings.body = JSON.stringify(body);
  } else if (contentType == "formData") {
    // settings.headers["Content-Type"] = "multipart/form-data";
    settings.body = body;
  } else {
    settings.body = body;
  }
  settings.headers.Authorization = `Bearer ${TOKEN}`;

  console.log(settings);

  const request = await fetch(SERVER_NAME + endpoint, settings);
  return request;
};

export const setMessage = (message, type = "ok", redirect = "#") => {
  const divMessage = document.createElement("div");
  divMessage.classList.add(
    "modal__message",
    type ? `modal__message-${type}` : ""
  );
  const pMessage = document.createElement("p");
  pMessage.innerText = message;
  divMessage.appendChild(pMessage);
  document.body.appendChild(divMessage);
  setTimeout(() => {
    divMessage.remove();
    window.location.replace(redirect);
  }, 4000);
};
