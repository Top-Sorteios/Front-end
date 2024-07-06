import { get } from "./CONSTANTES.js";

const getImagensCarrossel = async function () {
  const request = await get("index/obter", false);
  if (request.status === 200) {
    const response = await request.json();
    response.forEach((imagemEmDestaque, i) => {
        criarItemCarrossel(imagemEmDestaque, i)
    });
 
  }
};

const criarItemCarrossel = function(imagensEmDestaque, i){
    const divCarouselItem = document.createElement('div');
    
    divCarouselItem.classList.add('carousel-item');
    if (i == 0) {
        divCarouselItem.classList.add('active');
    }
    

    const img = document.createElement('img');
    img.classList.add('carousel__item-img');
    img.src = `data:image/webp;base64,${imagensEmDestaque.imagem}`
    

    divCarouselItem.appendChild(img);
    

    document.getElementById('carousel-inner').appendChild(divCarouselItem);
}

window.addEventListener("load", () => {
  getImagensCarrossel();
});

// carrossel.forEach(imagemEmDestaque => {
//     imagemEmDestaque.setAttribute("src", )
// })
