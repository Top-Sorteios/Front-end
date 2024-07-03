import { SERVER_NAME } from '../CONSTANTES.js';

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
                    <td><button class="editar-btn" data-id="${usuario.id}">✏️</button></td>
                    <td>${usuario.nome}</td>
                    <td>${new Date(usuario.turma.criadoem).toLocaleDateString()}</td>
                `;

                usuariosTbody.appendChild(usuarioRow);
            });

        } catch (error) {
            console.error('Erro ao obter usuários:', error);
        }
    }

    document.getElementById('usuarios-tbody').addEventListener('click', async (event) => {
        if (event.target.classList.contains('editar-btn')) {
            const id = event.target.getAttribute('data-id');
            console.log('ID do usuário selecionado:', id);

            try {
                const url = `${SERVER_NAME}usuarios/obter/${id}`;
                console.log('URL para obter dados do usuário:', url);
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
                document.getElementById('data-nascimento').value = usuario.datanascimento;
                document.getElementById('cpf').value = usuario.cpf;
                document.getElementById('email').value = usuario.email;
                document.getElementById('tipo-usuario').value = usuario.administrador ? 'ADMIN' : 'USER';

                document.getElementById('editar-usuario-container').style.display = 'block';
                document.getElementById('editar-usuario-container').setAttribute('data-id', id);

            } catch (error) {
                console.error('Erro ao obter dados do usuário:', error);
            }
        }
    });

    document.getElementById('editar-usuario-form').addEventListener('submit', async (event) => {
        event.preventDefault();

        const id = document.getElementById('editar-usuario-container').getAttribute('data-id');
        console.log('ID do usuário para edição:', id);
        const tipoUsuario = document.getElementById('tipo-usuario').value;
        const administrador = tipoUsuario === 'ADMIN';

        try {
            const url = `${SERVER_NAME}usuarios/editar/tipo/${id}`;
            console.log('URL para editar tipo de usuário:', url);
            const response = await fetch(url, {
                method: "PUT",
                headers: {
                    "Authorization": `Bearer ${token}`,
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    adm: administrador
                })
            });

            if (!response.ok) {
                const errorText = await response.text();
                throw new Error(`Falha ao editar usuário: ${errorText}`);
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
