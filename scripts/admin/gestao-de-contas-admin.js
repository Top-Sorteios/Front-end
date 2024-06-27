import { SERVER_NAME } from '../scripts/admin/CONSTANTES.js';

document.addEventListener('DOMContentLoaded', async () => {
    const token = sessionStorage.getItem("token");

    if (!token) {
        alert('Usuário não autenticado');
        window.location.assign('../login.html');
        return;
    }

    async function obterUsuarios() {
        try {
            const url = `${SERVER_NAME}usuarios/obter`;
            const response = await fetch(url, {
                method: "GET",
                headers: {
                    "Authorization": `Bearer ${token}`,
                    "Content-Type": "application/json"
                }
            });

            if (!response.ok) {
                throw new Error('Falha ao obter usuários');
            }

            const usuarios = await response.json();
            const usuariosTbody = document.getElementById('usuarios-tbody');

            usuariosTbody.innerHTML = ''; // Limpa o container antes de adicionar novo conteúdo

            usuarios.forEach(usuario => {
                const usuarioRow = document.createElement('tr');

                usuarioRow.innerHTML = `
                    <td><button class="editar-btn" data-email="${usuario.email}">✏️</button></td>
                    <td>${usuario.nome}</td>
                    <td>${usuario.criadoPor}</td>
                    <td>${usuario.criadoEm}</td>
                `;

                usuariosTbody.appendChild(usuarioRow);
            });

        } catch (error) {
            console.error('Erro ao obter usuários:', error);
        }
    }

    document.getElementById('usuarios-tbody').addEventListener('click', async (event) => {
        if (event.target.classList.contains('editar-btn')) {
            const email = event.target.getAttribute('data-email');

            try {
                const url = `${SERVER_NAME}usuarios/obter/${email}`;
                const response = await fetch(url, {
                    method: "GET",
                    headers: {
                        "Authorization": `Bearer ${token}`,
                        "Content-Type": "application/json"
                    }
                });

                if (!response.ok) {
                    throw new Error('Falha ao obter dados do usuário');
                }

                const usuario = await response.json();
                document.getElementById('nome').value = usuario.nome;
                document.getElementById('data-nascimento').value = usuario.dataNascimento;
                document.getElementById('cpf').value = usuario.cpf;
                document.getElementById('email').value = usuario.email;
                document.getElementById('tipo-usuario').value = usuario.tipoUsuario;

                document.getElementById('editar-usuario-container').style.display = 'block';

            } catch (error) {
                console.error('Erro ao obter dados do usuário:', error);
            }
        }
    });

    document.getElementById('editar-usuario-form').addEventListener('submit', async (event) => {
        event.preventDefault();

        const email = document.getElementById('email').value;
        const tipoUsuario = document.getElementById('tipo-usuario').value;

        try {
            const url = `${SERVER_NAME}usuarios/editar/tipo/${email}`;
            const response = await fetch(url, {
                method: "PUT",
                headers: {
                    "Authorization": `Bearer ${token}`,
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    tipoUsuario: tipoUsuario
                })
            });

            if (!response.ok) {
                throw new Error('Falha ao editar usuário');
            }

            alert('Usuário atualizado com sucesso!');
            document.getElementById('editar-usuario-container').style.display = 'none';
            await obterUsuarios();

        } catch (error) {
            console.error('Erro ao editar usuário:', error);
            alert('Erro ao editar usuário: ' + error.message);
        }
    });

    await obterUsuarios();
});