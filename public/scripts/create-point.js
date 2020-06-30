function populateUFs(){
        const ufSelect = document.querySelector("select[name=uf]")

        fetch("https://servicodados.ibge.gov.br/api/v1/localidades/estados")
        // Função anônima que retorna res.json.
        .then ( res => res.json() )     
        .then ( states => {

            for ( const state of states){
                ufSelect.innerHTML += `<option value="${state.id}">${state.nome}</option>`

            }

        })
    }

populateUFs()

function getCities(event) {
    const citySelect = document.querySelector("select[name=city]")
    const stateInput = document.querySelector("input[name=state]")  // será usado para substituir o código do estado pelo nome do estado

    const ufValue = event.target.value              //armazena o valor de select[name=uf] quando o event sofre mudança

    const indexOfSelectedState = event.target.selectedIndex     //armazena o numero do estado
    stateInput.value = event.target.options[indexOfSelectedState].text 


    const url = `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${ufValue}/municipios` // faz a consulta conforme o ufValue

    citySelect.innerHTML = "<option value>Selecione a Cidade</option>"  // Esvazia a lista de cidades quando altera o estado 

    citySelect.disabled = true         //bloqueia o campo após limpar a lista

    fetch(url)
    .then ( res => res.json() )     // Função anônima que retorna res.json
    .then ( cities => {

        for ( const city of cities){
            citySelect.innerHTML += `<option value="${city.nome}">${city.nome}</option>`
        }

        citySelect.disabled = false
    })

}

document

    .querySelector("select[name=uf]")       // seleciona o campo com nome "uf" 
    .addEventListener("change", getCities)  /* cria um ouvidor de eventos que vai detectar alterações no campo "uf", e 
                                            passa getCities por referência */


const itemsToCollect = document.querySelectorAll(".items-grid li")

for (const item of itemsToCollect){
    item.addEventListener("click", handleSelectedItem)  /* detecta o "click" */

}

const collectedItems = document.querySelector ("input[name=items]")

let selectedItems = []                  /* let pode ser alterada, const não */

function handleSelectedItem(event){
    const itemLi = event.target

    itemLi.classList.toggle("selected")     /* adiciona e remove uma classe (no caso, "selected") com JS, alternadamente conforme o click */

    const itemId = itemLi.dataset.id

    /* verificar se existem items selecionados e capturá-los. */

    const alreadySelected = selectedItems.findIndex( item => {  
                                                                    
        const itemFound = item == itemId                   
        return itemFound
    })

    /*Se já estiver selecionado, tirar da seleção. Senão, adicionar à seleção */
    if (alreadySelected >= 0){
        const filteredItems = selectedItems.filter ( item => {
            const itemIsDifferent = item != itemId
            return itemIsDifferent
        })

        selectedItems = filteredItems
    } else {
        selectedItems.push(itemId)
    }

    /*Por fim, atualizar o campo hidden com os item selecionados */

    collectedItems.value = selectedItems

}

//    .querySelector("select[name=uf]")       /* seleciona o campo com nome "uf" */
//    .addEventListener("change", () => {     /* cria o ouvidor de eventos e uma função anônima, ou arrow function */
//        console.log("mudei")                /* imprime "mudei" sempre que detectar mudança */
//    })   