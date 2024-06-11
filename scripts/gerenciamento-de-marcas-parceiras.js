import SERVER_NAME from "./CONSTANTES.js";

const coletandoCadastro = async () => {
    const conexao = await fetch(`${SERVER_NAME}usuarios/login`, {
        method: "POST",
        headers: {
            "Content-type": "application/json"
        },
        body: JSON.stringify({
            'email': 'guilherame@gmail.com',
            'senha': 'teste123' 
        })
    });

    if (conexao.status === 404) {
        alert('Acesso negado!')
    }

    const conexaoConvertida = await conexao.json();

    if (conexao.status === 200) {
        console.log(conexaoConvertida)
        alert('Acesso permitido')
    }
}

window.addEventListener('load', () => {
    coletandoCadastro()
})