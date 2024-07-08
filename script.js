//Import data file
import { recipeData } from "./data.js"

const cuisineRadios = document.getElementById("cuisine-radios")
const getRecipeBtn = document.getElementById("get-recipe-btn")
const recipeModalCloseBtn = document.getElementById("recipe-modal-close-btn")
const recipeModal = document.getElementById("recipe-modal")
const recipeInnerModal = document.getElementById("recipe-modal-inner")


//Close the modal button 
recipeModalCloseBtn.addEventListener("click", closeModal)
document.addEventListener("keydown", function (e) {
    if (e.key === "Escape") {
        closeModal()
    }
})

function closeModal() {
    recipeModal.style.display = 'none'
}

//Open the modal

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

//Create elements instead of innerHtml for recipe

function makeImage(src, alt, className) {
    const image = document.createElement('img')
    image.src = src
    image.alt = alt
    image.classList.add(className)
    return image
}

function makeRecipeElement(recipeTitle, recipeDesc, recipeUrl) {

    const name = document.createElement('h3')
    name.textContent = recipeTitle

    const description = document.createElement('p')
    description.textContent = recipeDesc

    const linkText = "Get the recipe"
    const link = document.createElement('a')
    link.textContent = linkText
    link.href = recipeUrl
    link.target = "_blank"
    link.rel = "nopener noreferrer nofollow"

    return [name, description, link]

}

function renderRecipe() {
    const recipeObject = getSingleRecipeObject()
    if (recipeObject === undefined) {
        return
    }

    const recipeImage = makeImage(recipeObject.image, recipeObject.alt, "recipe-img")
    const [name, description, link] = makeRecipeElement(recipeObject.recipeName, recipeObject.recipeDescription, recipeObject.recipeLink)

    recipeInnerModal.appendChild(recipeImage)
    recipeInnerModal.appendChild(name)
    recipeInnerModal.appendChild(description)
    recipeInnerModal.appendChild(link)

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

//Creat elements instead of innerhtml for radio 

function createRadioButton(cuisineType) {

    const radioLabel = document.createElement('label')
    radioLabel.textContent = cuisineType
    radioLabel.htmlFor = cuisineType

    const radioInput = document.createElement('input')
    radioInput.type = "radio"
    radioInput.id = cuisineType
    radioInput.value = cuisineType
    radioInput.name = "cuisine-choices"

    const radioInputContainer = document.createElement('div')
    radioInputContainer.classList.add('radio')
    radioInputContainer.appendChild(radioLabel)
    radioInputContainer.appendChild(radioInput)

    return radioInputContainer
}


//Render the radio list from the data file
function renderCuisinesRadios(recipes) {
    let radioItems = []
    const cuisines = getCuisinesArray(recipes)

    for (let cuisine of cuisines) {
        const radioContainer = createRadioButton(cuisine)
        radioItems.push(radioContainer)
    }
    cuisineRadios.append(...radioItems)
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