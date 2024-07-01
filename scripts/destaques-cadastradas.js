import { SERVER_NAME, TOKEN } from "./CONSTANTES.js";

window.addEventListener('load', async () => {
    const url = SERVER_NAME + 'index/obter'
    const response = await fetch(url, {
        method: "GET",
        headers: {
            "Authorization": `Bearer ${TOKEN}`,
            "Content-Type": "application/json"
        }
    })
    const dadosDestaque = await response.json()
    console.log(dadosDestaque)
    createTableDestaque(dadosDestaque)
})

const createTableDestaque = async (destaque) => {
    let table = document.getElementById('table-marcas')

    destaque.forEach(itensDestaque => {
        let tr = document.createElement('tr')
        let tdEditar = document.createElement('td')
        let linkEditar = document.createElement('a')
        let tdNome = document.createElement('td')
        let tdCriaroPor = document.createElement('td')
        let tdCriadoEm = document.createElement('td')
        let img = document.createElement('img')
        let txtNome = document.createTextNode(itensDestaque.nome)
        let txtCriadoPor = document.createTextNode(itensDestaque.titulo)
        let txtEditar = document.createTextNode('Editar')

        tr.setAttribute('class', 'filtrarTr')
        img.setAttribute('src', `data:image/webp;base64,${itensDestaque.imagem}`)
        tdNome.setAttribute('class', 'filtrarNome')
        linkEditar.setAttribute('href', '#')
        linkEditar.setAttribute('idmarca', itensDestaque.id)

        table.appendChild(tr)
        tr.appendChild(tdEditar)
        tdEditar.appendChild(linkEditar)
        linkEditar.appendChild(txtEditar)
        tdNome.appendChild(txtNome)
        tr.appendChild(tdNome)
        tdCriaroPor.appendChild(txtCriadoPor)
        tr.appendChild(tdCriaroPor)
        tdCriadoEm.appendChild(img)
        tr.appendChild(tdCriadoEm)

        linkEditar.addEventListener('click', () => {
            sessionStorage.setItem('idDestaques', itensDestaque.id)
            window.location.assign("../gestao-dos-destaques/gerenciamento-destaques.html");
        })
    });
}