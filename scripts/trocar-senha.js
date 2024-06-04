const formulario = document.querySelector("form");
const IsenhaAtual = document.querySelector(".senhaAtual");
const InovaSenha = document.querySelector(".novaSenha");

async function logar(email, password) {
    const url = 'https://grupo-top-sorteios.azurewebsites.net/usuarios/login';

    const loginData = {
        email: "testando@gmail.com",
        senha: "teste123"
    };

    try {
        const response = await fetch(url, {
            method: 'POST',
            mode: "cors",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(loginData)
        });

        if (!response.ok) {
            throw new Error('Login failed');
        }

        const data = await response.json();
        const token = data.token;

        localStorage.setItem('authToken', token);

        console.log('Login successful and token stored');
        return token; // Retorna o token para uso posterior
    } catch (error) {
        console.error('Error:', error);
    }
}

async function trocarSenha(email, senhaAtual, novaSenha) {
    const token = localStorage.getItem('authToken');
    const url = `https://grupo-top-sorteios.azurewebsites.net/usuarios/editar/senha/${email}`;

    const senhaData = {
        senhaAtual: senhaAtual,
        senha: novaSenha
    };

    try {
        const response = await fetch(url, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(senhaData)
        });

        if (!response.ok) {
            throw new Error('Password change failed');
        }

        // Verifica se a resposta contém dados JSON
        const contentType = response.headers.get('content-type');
        if (contentType && contentType.includes('application/json')) {
            const data = await response.json();
            console.log('Password change successful:', data);
        } else {
            console.log('Password change successful');
        }
    } catch (error) {
        console.error('erro', error);
    }
}

formulario.addEventListener('submit', async function (event) {
    event.preventDefault();

    const dados = {
        senhaAtual: IsenhaAtual.value,
        senha: InovaSenha.value
    };

    // Primeiro faz o login para obter o token
    const email = 'guilherame@gmail.com';
    const password = 'teste123';
    await logar(email, password);

    // Depois troca a senha usando o token obtido
    await trocarSenha(email, dados.senhaAtual, dados.senha);
});