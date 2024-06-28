const cuisineRadios = document.getElementById("cuisine-radios")
const getRecipeBtn = document.getElementById("get-recipe-btn")
const recipeModalCloseBtn = document.getElementById("recipe-modal-close-btn")
const recipeModal = document.getElementById("recipe-modal")



//Close the modal button
recipeModalCloseBtn.addEventListener("click", closeModal)

function closeModal() {
    recipeModal.style.display = 'none'
}

//Open the modal

getRecipeBtn.addEventListener("click", getRecipe)

function getRecipe() {
    recipeModal.style.display = 'flex'
}



//Highlight the selected radio option
cuisineRadios = cuisineRadios.addEventListener("change", highlightSelectedOption)

function highlightSelectedOption(e) {
    const radios = document.getElementsByClassName("radio")
    for (let radio of radios) {
        radio.classList.remove("highlight")
    }
    document.getElementById(e.target.id).parentElement.classList.add("highlight")
}

