let kalataList = document.querySelector(".kalataList")
let totalPrice = document.querySelector(".last")
function getAllCart() {
    kalataList.innerHTML = ""
    fetch("https://restaurant.stepprojects.ge/api/Baskets/GetAll")
        .then(pasuxi => pasuxi.json())
        .then(data => {
            let total = 0
            data.forEach((item) => {
                kalataList.innerHTML += list(item)
                total += item.price * item.quantity
            })
            totalPrice.innerHTML = `Total: ${total}$`
        })
      
}
getAllCart()
function list(item) {
    return `<li>
            <button class="remove" onclick="remove(${item.product.id})">X</button>
            <img src="${item.product.image}" alt="">
            <h3>${item.product.name}</h3>
            <h3 class="increase"><button onclick="increase(${item.quantity}, ${item.product.id}, ${item.price})">+</button> ${item.quantity}  <button onclick="decrease(${item.quantity}, ${item.product.id}, ${item.price})">-</button> </h3>
            <h3> ${item.price} $ </h3>
            <h3> ${item.quantity * item.price} $ </h3>
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
    if(quantity == 1){
        alert("If You Want To Remove It, You Can Use <X> Button!")
        return
    }
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
    fetch(`https://restaurant.stepprojects.ge/api/Baskets/DeleteProduct/${id}`, {
        method: "DELETE",
        headers: {
            accept: "*/*"
        }
    })
        .then(pasuxi => {
            if (!pasuxi.ok) {
                throw new Error("Failed To Remove Product")
            }
        })
        .then(data => {
            console.log("Removed product:", data);
            getAllCart();
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
