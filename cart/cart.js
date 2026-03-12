let kalataList = document.querySelector(".kalataList")
function getAllCart() {
    kalataList.innerHTML = ""
    fetch("https://restaurant.stepprojects.ge/api/Baskets/GetAll")
        .then(pasuxi => pasuxi.json())
        .then(data => data.forEach((item) => kalataList.innerHTML += list(item)))
}
getAllCart()
function list(item) {
    return `<li>
            <img src="${item.product.image}" alt="">
            <h3>${item.product.name}</h3>
            <h3><button onclick="increase(${item.quantity}, ${item.product.id}, ${item.price})">+</button> ${item.quantity}  <button>-</button> </h3>
            <h3> ${item.price} ₾ </h3>
            <h3> ${item.quantity * item.price} ₾ </h3>
            <button>X</button>
        </li>`
}
function increase(quantity, id, price) {
    quantity++
    let info = {
        quantity: quantity,
        price: price,
        productId: id
    }
    kalataList.innerHTML = ""
    fetch("https://restaurant.stepprojects.ge/api/Baskets/UpdateBasket", {
        method: "PUT",
        headers: {
            accept: "*/*",
            "Content-Type": "application/json"
        },
        body: JSON.stringify(info)
    }).then(pasuxi => pasuxi.text())
        .then(() => getAllCart())

}

let nav = document.getElementById("navbar")
window.addEventListener("scroll", function () {

    if (window.scrollY > 50) {
        nav.classList.add("active")
    } else {
        nav.classList.remove("active")
    }

})
