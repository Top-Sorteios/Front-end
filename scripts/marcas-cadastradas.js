import SERVER_NAME from "./CONSTANTES.js";

const getDados = async () => {
    const url = SERVER_NAME + 'marcas/obter'
    const response = await fetch(url)
    const dado = await response.json()

    console.log(dado)
}

window.addEventListener('load', () => {
    getDados()
})