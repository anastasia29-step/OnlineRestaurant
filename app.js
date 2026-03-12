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
    let checks = document.querySelectorAll(".check")
    let noNuts = checks[0].checked
    let vegeterian = checks[1].checked
    let spiciness = range.value
    let url = "https://restaurant.stepprojects.ge/api/Products/GetFiltered?"
    if (vegeterian) {
        url += "vegeterian=true&"
    }
    if (noNuts) {
        url += "nuts=false&"
    }
    if (spiciness != 0) {
        url += `spiciness=${spiciness}&`
    }
    console.log(url);
    fetch(url)
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
    let user = localStorage.getItem("user");
    if (!user) {
        right.innerHTML = "";
        left.innerHTML = "";
        right.innerHTML += `<div class="suggestion">
                <img src="./photo/oops.png" alt="">
                <h1>I see you're not signed in yet! <br> Let's go sign in or <br> if you're not registered, <br> let's register now!</h1>
                <button onclick="auth()">Sign In Now!</button>
            </div>`;
        return;
    }
    fetch("https://restaurant.stepprojects.ge/api/Baskets/GetAll")
        .then(pasuxi => pasuxi.json())
        .then(cartItems => {
            let existingItem = cartItems.find(item => item.product.id === id);

            if (existingItem) {
                let updatedInfo = {
                    productId: id,
                    quantity: existingItem.quantity + 1
                };

                fetch(`https://restaurant.stepprojects.ge/api/Baskets/UpdateBasket/${existingItem.id}`, {
                    method: "PUT",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(updatedInfo)
                }).then(() => refreshCart());

            } else {
                let info = {
                    quantity: 1,
                    price: price,
                    productId: id
                };

                fetch("https://restaurant.stepprojects.ge/api/Baskets/AddToBasket", {
                    method: "POST",
                    headers: {
                        accept: "text/plain",
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(info)
                }).then(() => refreshCart()); 
            }
        });
}

function refreshCart() {
    let kalataList = document.querySelector(".kalataList");
    kalataList.innerHTML = "";
    fetch("https://restaurant.stepprojects.ge/api/Baskets/GetAll")
        .then(res => res.json())
        .then(cartItems => {
            cartItems.forEach(item => {
                kalataList.innerHTML += `
                    <li>
                        <h3>${item.product.name}</h3>
                        <p>Quantity: ${item.quantity}</p>
                        <p>Price: ${item.price} ₾</p>
                    </li>
                `;
            });
        });
}
function auth() {
    window.location.href = "./auth/auth.html"
}
window.addEventListener("scroll", function () {

    if (window.scrollY > 50) {
        nav.classList.add("active")
    } else {
        nav.classList.remove("active")
    }

})

