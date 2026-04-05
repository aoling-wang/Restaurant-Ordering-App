import {menuArray} from "./data.js"
const itemContainer = document.querySelector(".item-container")
const summaryContainer = document.querySelector(".summary-container")
const modal = document.querySelector(".modal")
const totalPrice = document.querySelector(".total-price")
let orderArray = []
let feedbackArray = []

function renderMenu() {
    const menu = menuArray.map(function(item){
        return `<div class="menu-item">
                    <div class="item-image" role="img">${item.emoji}</div>
                    <div class="details-btn-container">
                        <div class="item-details">
                            <h4 class="name">${item.name}${item.restrictions.join("")}</h4>
                            <p class="ingredients">Made with ${item.ingredients.join(", ")}</p>
                            <p class="price">$${item.price}</p>
                        </div>
                        <button class="add-btn" data-add="${item.id}">+</button>
                    </div>
                </div>`
    }).join("")
    itemContainer.innerHTML = menu
}

renderMenu()

function renderOrder(){
    if (orderArray.length > 0){
        summaryContainer.innerHTML = orderArray.map(function(item){
            return `<div class="order-item">
                        <div class="item">
                            <p>${item.name}</p>
                            <p>$${item.price}</p>
                        </div>
                        <button class="remove-btn" data-remove="${item.id}">X</button>
                    </div>`
        }).join("")
        document.querySelector(".line-break").style.display = "block"
        document.querySelector(".total-container").style.display = "flex"
    } else {
        summaryContainer.innerHTML = `<p>Your cart is empty.</p>`
        document.querySelector(".line-break").style.display = "none"
        document.querySelector(".total-container").style.display = "none"

    }
}

document.addEventListener("click", function(e){
    if(e.target.dataset.add){
        handleAddBtnClick(e.target.dataset.add)
    }
    if(e.target.dataset.remove){
        handleRemoveBtnClick(e.target.dataset.remove)
    }
    if(e.target.id === "checkout-btn"){
        handleCheckoutBtnClick()
    }
    if(e.target.id === "pay-btn"){
        e.preventDefault()
        handlePayBtnClick()
    }
    if(e.target.id === "feedback-submit-btn"){
        handleFeedbackSubmitBtnClick()
        modal.style.display = "none"
    }
    if(e.target.id === "close-btn"){
        modal.style.display = "none"
    }
})

function handleAddBtnClick(itemId){
    orderArray.push(menuArray[itemId])
    totalPrice.textContent = `$${orderArray.reduce((total, item) => total + item.price, 0)} + (Tax)`
    renderOrder()
}

function handleRemoveBtnClick(itemId){
    orderArray = orderArray.filter(item => item.id !== Number(itemId))
    renderOrder()
}

function handleCheckoutBtnClick(){
    if (orderArray.length > 0){
        modal.style.display = "flex"
    }
}

function handlePayBtnClick(){
    modal.innerHTML =  `<h2 class="modal-title">Order Confirmation</h2>
                        <p>Thank you for your order! Your delicious food will be with you shortly.</p>
                        <form class="feedback-form">
                            <p>Let us know how we did!</p>
                            <textarea class="feedback" placeholder="Leave your feedback here..."></textarea>
                            <button id="feedback-submit-btn" type="submit">Submit</button>
                        </form>`    
}

function handleFeedbackSubmitBtnClick(){
    feedbackArray.push(document.getElementById("feedback").value)
    document.getElementById("feedback").value = ""
}