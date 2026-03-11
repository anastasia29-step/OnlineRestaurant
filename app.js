let ul = document.querySelector("ul")
let right = document.querySelector(".rightSide")
let nav = document.getElementById("navbar")

fetch("https://restaurant.stepprojects.ge/api/Categories/GetAll")
    .then((pasuxi) => pasuxi.json())
    .then((data) => {
        console.log(data);
        data.forEach((item) => ul.innerHTML += `<li onclick="changeCategory(${item.id})">${item.name}</li>`)
    })

let sectionCard = document.querySelector(".sectionCard")
let left = document.querySelector(".leftSide")
let range = document.querySelector(".range")
let checks = document.querySelector(".check")
let filter = document.querySelector(".filteredCard")
let spiceValue = document.querySelector(".spiceValue")
function apply(e) {
    e.preventDefault()
    let spiciness = range.value
    let nuts = checks[0].checked
    let vegeterian = checks[1].checked
    fetch(`https://restaurant.stepprojects.ge/api/Products/GetFiltered?vegeterian=${vegeterian}&nuts=${nuts}&spiciness=${spiciness}&categoryId=${categoryId}`)
        .then(pasuxi => pasuxi.json())
        .then(data => {
            right.innerHTML = ""
            data.forEach(item => {
                right.innerHTML += card(item)
            })
        })
}
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
                    <button>Add to cart</button>
                </div>
            </div>`
}

window.addEventListener("scroll", function () {

    if (window.scrollY > 50) {
        nav.classList.add("active")
    } else {
        nav.classList.remove("active")
    }

})

