//Import data file
import { recipeData } from "./data.js"

const cuisineRadios = document.getElementById("cuisine-radios")
const getRecipeBtn = document.getElementById("get-recipe-btn")
const recipeModalCloseBtn = document.getElementById("recipe-modal-close-btn")
const recipeModal = document.getElementById("recipe-modal")
const recipeInnerModal = document.getElementById("recipe-modal-inner")


//Close the modal button -- TO ADD - Modal closes when you click anywhere on the page
recipeModalCloseBtn.addEventListener("click", closeModal)
document.addEventListener("keydown", function (e) {
    if (e.key === "Escape") {
        closeModal()
    }
})

function closeModal() {
    recipeModal.style.display = 'none'
}

//Open the modal-- TO ADD -- Modal only opens when the radio is selected

getRecipeBtn.addEventListener("click", renderRecipe)

function getMatchingRecipesArray() {

    //selectedCuisine is the one with radio input selected
    if (document.querySelector('input[type="radio"]:checked')) {
        const selectedCuisine = document.querySelector('input[type="radio"]:checked').value


        //get recipes with selected Cuisines

        const matchingRecipesArray = recipeData.filter(function (matchingRecipe) {
            return matchingRecipe.recipeTags.includes(selectedCuisine)
        })
        return matchingRecipesArray
    }
    return []
}

function getSingleRecipeObject() {
    const recipesArray = getMatchingRecipesArray()
    if (recipesArray.length === 1) {
        return recipesArray[0]
    }

    else {
        const randomNumber = Math.floor(Math.random() * recipesArray.length)
        return recipesArray[randomNumber]
    }

}

function renderRecipe() {
    const recipeObject = getSingleRecipeObject()
    if (recipeObject === undefined) {
        return
    }
    recipeInnerModal.innerHTML = `<img class="recipe-img" src=${recipeObject.image} >
            <h3>${recipeObject.recipeName}</h3>
            <p> ${recipeObject.recipeDescription} </p>
            <a href=${recipeObject.recipeLink}>Get the recipe</a>`

    recipeModal.style.display = 'flex'

}





//Get the recipe tags in an array
function getCuisinesArray(recipes) {
    const cuisineArray = []

    for (let recipe of recipes) {

        for (let cuisine of recipe.recipeTags) {
            if (!cuisineArray.includes(cuisine)) {
                cuisineArray.push(cuisine)
            }
        }
    }
    return cuisineArray
}



//Render the radio list from the data file
function renderCuisinesRadios(recipes) {
    let radioItems = ""
    const cuisines = getCuisinesArray(recipes)

    for (let cuisine of cuisines) {
        radioItems += `<div class="radio">
        <label for=${cuisine}> ${cuisine} </label>
                    <input type="radio" id=${cuisine} value=${cuisine} name="cuisine-choices">
                    </div>`
    }
    cuisineRadios.innerHTML = radioItems
}




//Highlight the selected radio option
cuisineRadios.addEventListener("change", highlightSelectedOption)

function highlightSelectedOption(e) {
    const radios = document.getElementsByClassName("radio")
    for (let radio of radios) {
        radio.classList.remove("highlight")
    }
    document.getElementById(e.target.id).parentElement.classList.add("highlight")
}



renderCuisinesRadios(recipeData)