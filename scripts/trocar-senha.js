import { SERVER_NAME } from "./CONSTANTES.js";

document.addEventListener("DOMContentLoaded", async () => {
  const token = sessionStorage.getItem("token");
  const email = sessionStorage.getItem("email");



  try {
    const url = `${SERVER_NAME}usuarios/obter/${email}`;
    const response = await fetch(url, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error("Falha ao obter informações do usuário");
    }

    const userData = await response.json();
    document.getElementById("nome").value = userData.nome;
    document.getElementById("data-nascimento").value = userData.datanascimento;
    document.getElementById("cpf").value = userData.cpf;
    document.getElementById("email").value = userData.email;
    document.getElementById("turma").value = userData.turma.nome;

    // Adicionar lógica para o botão "Cancelar"
    const cancelarButton = document.getElementById("cancel");
    cancelarButton.addEventListener("click", (event) => {
      event.preventDefault();
      if (userData.administrador) {
        window.location.assign("../home/inicio-admin.html");
      } else {
        window.location.assign("../home/inicio.html");
      }
    });
  } catch (error) {
    console.error("Erro ao obter informações do usuário:", error);
  }
});

const formulario = document.querySelector("#form-troca-senha");
const inputSenhaAtual = document.querySelector("#senha-atual");
const inputNovaSenha = document.querySelector("#nova-senha");

async function trocarSenha() {
  const token = sessionStorage.getItem("token");
  const email = sessionStorage.getItem("email");
  const senhaAtual = inputSenhaAtual.value;
  const novaSenha = inputNovaSenha.value;

  const url = `${SERVER_NAME}usuarios/editar/senha/${email}`;
  const senhaData = {
    senhaAtual: senhaAtual,
    senha: novaSenha,
  };

  try {
    const response = await fetch(url, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(senhaData),
    });

    if (!response.ok) {
      throw new Error("Falha ao alterar a senha");
    }

    const contentType = response.headers.get("content-type");
    if (contentType && contentType.includes("application/json")) {
      const data = await response.json();
      console.log("Senha alterada com sucesso:", data);
      alert("Senha alterada com sucesso!");
    } else {
      console.log("Senha alterada com sucesso");
      alert("Senha alterada com sucesso!");
    }
  } catch (error) {
    console.error("Erro ao alterar a senha:", error);
    alert("Erro ao alterar a senha: " + error.message);
  }
}

formulario.addEventListener("submit", function (event) {
  event.preventDefault();
  trocarSenha();
});
