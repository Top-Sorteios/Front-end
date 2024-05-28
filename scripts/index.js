const inputEnviar = document.querySelector("#submit");

const entrar = async function () {
  let url = SERVER_NAME + "operacoes/testeAPI";

  let inputLogin = document.querySelector("#email");
  let inputPassword = document.querySelector("#password");
  let loginJson = {};

  loginJson.email = inputLogin.value;
  loginJson.password = inputPassword.value;
  
  const request = await fetch(url, {
    method: "POST",
    mode: "cors",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(loginJson),
  })
    .then((response) => {
      response.json();
    })
    .then((json) => {
      console.log(json);
    });
};

//serializar = transformar em texto
//deserializar = transformar json em obj
inputEnviar.addEventListener("click", function () {
  entrar();
});
