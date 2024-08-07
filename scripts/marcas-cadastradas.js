import { SERVER_NAME, SET_ACAO, TOKEN } from "./CONSTANTES.js";

window.addEventListener('load', async () => {
    sessionStorage.setItem("idMarca", 0);
    const url = SERVER_NAME + 'marcas/obter'
    const response = await fetch(url, {
        method: "GET",
        headers: {
            "Authorization": `Bearer ${TOKEN}`,
            "Content-Type": "application/json"
        }
    })
    const dado = await response.json()
    createTable(dado)
})


document.querySelector("#button-nova-marca").addEventListener("click", ()=>{
    SET_ACAO("CRIAR")
    window.location.assign("./marca.html")
})

const createTable = async (item) => {
    let table = document.getElementById('table-marcas')

    item.forEach(marcas => {
        let tr = document.createElement('tr')
        let tdEditar = document.createElement('td')
        let linkEditar = document.createElement('a')
        let tdNome = document.createElement('td')
        let tdCriaroPor = document.createElement('td')
        let tdCriadoEm = document.createElement('td')
        let txtNome = document.createTextNode(marcas.nome)
        let txtCriadoPor = document.createTextNode(marcas.criadoPor)
        let txtCriadoEm = document.createTextNode(`${marcas.criadoEm.replaceAll("-","/")}`)
        let txtEditar = document.createTextNode('Editar')

        tr.setAttribute('class', 'filtrarTr')
        tdNome.setAttribute('class', 'filtrarNome')
        linkEditar.setAttribute('href', '#')
        linkEditar.setAttribute('idmarca', marcas.id)

        table.appendChild(tr)
        tr.appendChild(tdEditar)
        tdEditar.appendChild(linkEditar)
        linkEditar.appendChild(txtEditar)
        tdNome.appendChild(txtNome)
        tr.appendChild(tdNome)
        tdCriaroPor.appendChild(txtCriadoPor)
        tr.appendChild(tdCriaroPor)
        tdCriadoEm.appendChild(txtCriadoEm)
        tr.appendChild(tdCriadoEm)

        linkEditar.addEventListener('click', () => {
            sessionStorage.setItem('idMarca', marcas.id)
            SET_ACAO("EDITAR");
            window.location.assign("../gestao-de-marcas/marca.html");
        })
    });
}

const pesquisar = () => {
    let inputPesquisa = document.getElementById('input-pesquisa').value.toLowerCase()
    const listMarca = document.querySelectorAll('.filtrarTr')
    let listNome = document.querySelectorAll('.filtrarNome')

    for (let i = 0; i < listMarca.length; i++) {
        if (!listNome[i].innerHTML.toLowerCase().includes(inputPesquisa)) {
            listMarca[i].classList.add('none')
        } else {
            listMarca[i].classList.remove('none')
        }
    }
}

const inputPesquisa = document.getElementById('input-pesquisa')
inputPesquisa.addEventListener('keyup', () => {
    pesquisar()
})