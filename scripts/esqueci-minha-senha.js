const formEsqueciSenha = document.querySelector("#form-esqueci-senha");
const email = document.querySelector("#email");

const requisitarMudancaSenha = async function () {
  let url =
    "https://grupo-top-sorteios.azurewebsites.net/usuarios/esqueci-senha";

  const response = await fetch(url, {
    method: "POST",
    mode: "cors",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
        email: email.value,
    }),
  });

  const data = await response.json();
  console.log(data);
};

formEsqueciSenha.addEventListener("submit", (event) => {
  event.preventDefault();
  requisitarMudancaSenha();
});
