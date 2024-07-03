const headerMobile = document.getElementById('header-mobile')
const buttonAbrirMenu = document.querySelector('.bi-list')
const buttonFecharMenu = document.querySelector('.bi-x')

const arbriMenu = () => {
   headerMobile.style.width = '100%'
   headerMobile.style.height = '100vh'
   headerMobile.style.backgroundColor = 'blue'
   buttonAbrirMenu.classList.add('none')
   buttonFecharMenu.classList.remove('none')
}

const fecharMenu = () => {
    headerMobile.style.width = '10%'
    headerMobile.style.height = '45px'
    headerMobile.style.backgroundColor = 'white'
    buttonAbrirMenu.classList.remove('none')
    buttonFecharMenu.classList.add('none')
}

buttonAbrirMenu.addEventListener('click', () => {
    arbriMenu()
})  

buttonFecharMenu.addEventListener('click', () => {
    fecharMenu()
})

