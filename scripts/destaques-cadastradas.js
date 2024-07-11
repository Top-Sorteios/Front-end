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
    let table = document.getElementById('table-destaques')

    destaque.forEach(itensDestaque => {
        let tr = document.createElement('tr')
        let tdEditar = document.createElement('td')
        let linkEditar = document.createElement('a')
        let tdNome = document.createElement('td')
        let tdTitulo = document.createElement('td')
        let tdImagem = document.createElement('td')
        let tdCriadoPor = document.createElement('td')
        let tdCriadoEm = document.createElement('td')
        let img = document.createElement('img')
        let txtNome = document.createTextNode(itensDestaque.nome)
        let txtTitulo = document.createTextNode(itensDestaque.titulo)
        let txtEditar = document.createTextNode('Editar')
        let txtCriadoPor = document.createTextNode(itensDestaque.criadoPor)
        let txtCriadoEm = document.createTextNode(`${itensDestaque.criadoEm.split("T")[0].split("-").reverse().join("/")} ${itensDestaque.criadoEm.split("T")[1].split(".")[0]}`)

        tr.setAttribute('class', 'hover-cor')
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
        tdTitulo.appendChild(txtTitulo)
        tr.appendChild(tdTitulo)
        tdImagem.appendChild(img)
        tr.appendChild(tdImagem)
        tr.appendChild(tdCriadoPor)
        tdCriadoPor.appendChild(txtCriadoPor)
        tr.appendChild(tdCriadoEm)
        tdCriadoEm.appendChild(txtCriadoEm)

        linkEditar.addEventListener('click', () => {
            sessionStorage.setItem('idDestaques', itensDestaque.id)
            window.location.assign("../gestao-dos-destaques/gerenciamento-destaques.html");
        })
    });
}