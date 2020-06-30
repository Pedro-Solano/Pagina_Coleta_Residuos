/* Obs.: querySelector retorna um elemento, enquanto querySelectorAll retorna uma lista, não sendo compatível com EventListener */


const buttonSearch = document.querySelector("#page-home main a") 
const modal = document.querySelector("#modal")              /* captura o modal */
const close = document.querySelector("#modal .header a")    /* captura o click no botão close */


buttonSearch.addEventListener("click", () => {  // após localizar o botão de search, passa a ouvir o click. Quando ocorre o click, chama
    modal.classList.remove("hide")              // a função anônima que remove a classe "hide"
}) 

close.addEventListener("click", () => {         // Quando ocorre o click no close, chama a função anônima que adiciona a classe "hide"
    modal.classList.add("hide")    
})