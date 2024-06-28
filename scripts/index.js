import { SERVER_NAME, get } from "./CONSTANTES.js";

const marcasParceirasContainer = document.querySelector("#logo-marcas-parceiras");
const botaoEntrar = document.querySelector("#login");

botaoEntrar.addEventListener("click", (event)=>{
    console.log("Foi clickado");
    event.preventDefault()
    window.location.assign("./html/login/index.html")
})


const getMarcasParceiras = async function(){
    const request = await get("marcas/obter", true);
    // if (request.status === 200){
        const response = await request.json();
        // console.log(result)
        // for (let i = result.length; i > 5 ; i--){
            console.log(response)
        // }
    // }
}


window.addEventListener("load", ()=>{
    getMarcasParceiras()
})