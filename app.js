let ul = document.querySelector("ul")
let right = document.querySelector(".rightSide")
let nav = document.getElementById("navbar")

fetch("https://restaurant.stepprojects.ge/api/Categories/GetAll")
    .then((pasuxi) => pasuxi.json())
    .then((data) => {
        console.log(data);
        data.forEach((item) => ul.innerHTML += `<li onclick="changeCategory(${item.id})">${item.name}</li>`)
    })
function showAll() {
    fetch("https://restaurant.stepprojects.ge/api/Products/GetAll")
        .then(pasuxi => pasuxi.json())
        .then(data => {
            right.innerHTML = ""
            data.forEach(item => right.innerHTML += card(item))
        })
        .catch(() => body.innerHTML = `<h1>Oops, something went Wrong...</h1>`)
}
function changeCategory(id) {
    right.innerHTML = ""
    fetch(`https://restaurant.stepprojects.ge/api/Categories/GetCategory/${id}`)
        .then(pasuxi => pasuxi.json())
        .then(data => {
            data.products.forEach((item) => right.innerHTML += card(item))
        })
}
let sectionCard = document.querySelector(".sectionCard")
let left = document.querySelector(".leftSide")
let range = document.querySelector(".range")
let checks = document.querySelectorAll(".check")
let filter = document.querySelector(".filteredCard")
let spiceValue = document.querySelector(".spiceValue")



range.addEventListener("input", function () {
    if (range.value == 0) {
        spiceValue.textContent = "Not Chosen"
    } else {
        spiceValue.textContent = range.value
    }
})
let body = document.querySelector("body")
fetch("https://restaurant.stepprojects.ge/api/Products/GetAll")
    .then(pasuxi => pasuxi.json())
    .then((data) => {
        console.log(data);

        data.forEach((item) => right.innerHTML += card(item))
    })
    .catch(() => body.innerHTML += `<h1> Error 404...</h1>`)

function apply() {
    let spiciness = range.value
    let checks = document.querySelectorAll(".check")
    let nuts = checks[0].checked
    let vegeterian = checks[1].checked
    fetch(`https://restaurant.stepprojects.ge/api/Products/GetFiltered?vegeterian=${vegeterian}&nuts=${nuts}&spiciness=${spiciness}`)
        .then(pasuxi => pasuxi.json())
        .then((data) => {
            right.innerHTML = ""
            data.forEach(item => {
                right.innerHTML += card(item)
            })
        })

}
function reset() {
    range.value = 0
    spiceValue.textContent = "Not Chosen"
    let checks = document.querySelectorAll(".check")
    checks[0].checked = false
    checks[1].checked = false

    fetch("https://restaurant.stepprojects.ge/api/Products/GetFiltered")
        .then(pasuxi => pasuxi.json())
        .then(data => {
            right.innerHTML = ""
            data.forEach(item => {
                right.innerHTML += card(item)
            })
        })
}
function card(item) {
    return ` <div class="card">
                <img src="${item.image}" alt="">
                <h1>${item.name}</h1>
                <p>Spiciness: ${item.spiciness}</p>
                <div class="sides">
                    <div class="checks">
                        <input type="checkbox" ${item.nuts ? "checked" : ""}>
                        <p>Nuts</p>
                    </div>
                    <div class="checks">
                        <input type="checkbox" ${item.vegeterian ? "checked" : ""}>
                        <p>Vegeterian</p>
                    </div>
                </div>
                <div class="bottom">
                    <h1 style="font-size: 24px">$ ${item.price} </h1>
                    <button onclick="addToCart(${item.id}, ${item.price})">Add to cart</button>
                </div>
            </div>`
}
function addToCart(id, price) {
    let info = {
        quantity: 1,
        price: price,
        productId: id
    }
    fetch("https://restaurant.stepprojects.ge/api/Baskets/AddToBasket", {
        method: "POST",
        headers: {
            accept: "text/plain",
            "Content-Type": "application/json"
        },
        body: JSON.stringify(info)
    }).then((pasuxi) => pasuxi.json())
        .then(() => {
            let existing = item.product.id
            if (existing) {
                fetch("https://restaurant.stepprojects.ge/api/Baskets/UpdateBasket", {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        id: existing.id,
                        quantity: existing.quantity + 1
                    })
                })
            }
        })
}
window.addEventListener("scroll", function () {

    if (window.scrollY > 50) {
        nav.classList.add("active")
    } else {
        nav.classList.remove("active")
    }

})

