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
                console.log('Usuário:', usuario); // Adicione este log
                const usuarioRow = document.createElement('tr');

                usuarioRow.innerHTML = `
                    <td class="tdcriado"><button class="editar-btn" data-email="${usuario.email}">✏️</button></td>
                    <td>${usuario.nome}</td>
                    <td>${usuario.turma ? usuario.turma.nome : 'Nome do criador não especificado'}</td>
                    <td class="tdcriado">${usuario.turma ? new Date(usuario.turma.criadoem).toLocaleDateString() : 'Data de criação não especificada'}</td>
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
            console.log('Email do usuário selecionado:', email);

            if (!email) {
                console.error('Email do usuário não encontrado');
                return;
            }

            try {
                const url = `${SERVER_NAME}usuarios/obter/${email}`;
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
                console.log('Dados do usuário:', usuario); // Adicione este log
                document.getElementById('nome').value = usuario.nome;
                document.getElementById('data-nascimento').value = usuario.datanascimento;
                document.getElementById('cpf').value = usuario.cpf;
                document.getElementById('email').value = usuario.email;
                document.getElementById('tipo-usuario').value = usuario.administrador ? 'ADMIN' : 'USER';

                // Mostrar modal
                document.getElementById('user-modal').classList.remove('hidden');

            } catch (error) {
                console.error('Erro ao obter dados do usuário:', error);
            }
        }
    });

    document.getElementById('editar-usuario-form').addEventListener('submit', async (event) => {
        event.preventDefault();

        const email = document.getElementById('email').value;
        console.log('Email do usuário para edição:', email);
        const tipoUsuario = document.getElementById('tipo-usuario').value;
        const administrador = tipoUsuario === 'ADMIN';

        try {
            const url = `${SERVER_NAME}usuarios/editar/tipo/${email}`;
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
            document.getElementById('user-modal').classList.add('hidden');
            await obterUsuarios();

        } catch (error) {
            console.error('Erro ao editar usuário:', error);
            alert('Erro ao editar usuário: ' + error.message);
        }
    });

    await obterUsuarios();

    // Fechar modal ao clicar fora dele
    window.addEventListener('click', (event) => {
        const modal = document.getElementById('user-modal');
        if (event.target === modal) {
            modal.classList.add('hidden');
        }
    });
});
