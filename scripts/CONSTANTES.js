export const SERVER_NAME = "https://modulo-sorteios.azurewebsites.net/";
export const EMAIL = sessionStorage.getItem("email");
export const SET_EMAIL = (email) => {
  sessionStorage.setItem("email", email);
};
export const SET_TOKEN = (token) => {
  sessionStorage.setItem("token", token);
};
export const TOKEN = sessionStorage.getItem("token");

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
      Authorization: `${auth == true ? "Bearer " + TOKEN : undefined}`,
    },
  });
  if (request.ok) {
    const response = await request.json();
    return response;
  }
};
