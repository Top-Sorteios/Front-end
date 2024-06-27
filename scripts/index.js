import { SERVER_NAME, get } from "./CONSTANTES.js";

const marcasParceirasContainer = document.querySelector("#logo-marcas-parceiras");

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