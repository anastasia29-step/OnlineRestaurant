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
            <h3><button onclick="increase(${item.quantity}, ${item.product.id}, ${item.price})">+</button> ${item.quantity}  <button onclick="decrease(${item.quantity}, ${item.product.id}, ${item.price})">-</button> </h3>
            <h3> ${item.price} ₾ </h3>
            <h3> ${item.quantity * item.price} ₾ </h3>
            <button onclick="remove(${item.product.id})">X</button>
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
function decrease(quantity, id, price) {
    quantity--
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
function remove(id) {
    fetch(`https://restaurant.stepprojects.ge/api/Baskets/DeleteProduct/${id}`,{
        method:"DELETE",
        headers: {
            accept: "*/*"
        }})
        .then(pasuxi => {
            if(!pasuxi.ok){
                throw new Error("Failed To Remove Product")
            }
        })
        .then(data => {
            console.log("Removed product:", data);
            getAllCart();
            alert("Product Has Been Removed")
        })
        .catch(error => {
            console.error("Error removing product", error)
            alert("Something Went Wrong! Product Was Not Removed")
        })
       
}

let nav = document.getElementById("navbar")
window.addEventListener("scroll", function () {

    if (window.scrollY > 50) {
        nav.classList.add("active")
    } else {
        nav.classList.remove("active")
    }

})
