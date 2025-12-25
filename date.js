let form = document.querySelector("#data")
let names = document.querySelector(".name")
let date = document.querySelector(".data")
let time = document.querySelector(".time")
let place = document.querySelector(".place")
let message = document.querySelector(".message")
let successMsg = document.querySelector("#successMsg")
let today = new Date().toISOString().split("T")[0];
date.setAttribute("min", today)


form.addEventListener("submit", function (e) {
    e.preventDefault();

    if (
        names.value.trim() === "" ||date.value === "" ||time.value === "" ||place.value === "" ||message.value.trim() === "") {
        alert("All fields are compulsory");
        return;
    }
    if (date.value < today) {
    alert("Please select a valid future date");
    return;
}


    fetch(form.action, {
        method: "POST",
        body: new FormData(form),
        headers: {
            "Accept": "application/json"
        }
    })
    .then(function (res) {
        if (res.ok) {
            form.reset();
            successMsg.style.display = "block";

            setTimeout(function () {
                successMsg.style.display = "none"
            },5000);
        } else {
            alert("Something went wrong");
        }
    })
    .catch(function () {
        alert("Network error");
    });
});
