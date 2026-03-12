function register(e) {
    e.preventDefault()

    let formInfo = new FormData(e.target)
    let finalForm = Object.fromEntries(formInfo)

    fetch("https://api.everrest.educata.dev/auth/sign_up", {
        method: "POST",
        headers: {
            accept: "application/json",
            "Content-Type": "application/json"
        },
        body: JSON.stringify(finalForm)
    }).then((pasuxi) => pasuxi.json())
        .then((data) => {
            if (data.errorKeys) {
                console.log(data.errorKeys);

            } else {
                alert("წარმატებულია, გაიარეთ ვერიფიკაცია!")
            }
        })

}
function login(e) {
    e.preventDefault()

    let formInfo = new FormData(e.target)
    let finalForm = Object.fromEntries(formInfo)

    fetch("https://api.everrest.educata.dev/auth/sign_in", {
        method: "POST",
        headers: {
            accept: "*/*",
            "Content-Type": "application/json"
        },
        body: JSON.stringify(finalForm)
    }).then((pasuxi) => pasuxi.json())
        .then((data) => {
            if (data.access_token) {
                alert("warmatebuliaaa");
                Cookies.set("user", data.access_token,)
            }
            else {
                alert(data.errorKeys[0]);

            }

           
        })
        .catch((cudi) => {
            console.log(cudi, "cudiiipasuxiiaaa");

        })

}
window.addEventListener("scroll", function () {

    if (window.scrollY > 50) {
        nav.classList.add("active")
    } else {
        nav.classList.remove("active")
    }

})