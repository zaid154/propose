let yesBtn = document.querySelector(".yes-btn");
let noBtn = document.querySelector(".no-btn");
let form = document.querySelector("#reply");
let answer = document.querySelector("#answer");
let successMsg = document.querySelector("#successMsg");
let data=document.querySelector(".select_date")

yesBtn.addEventListener("click", function () {

    document.querySelector(".question").innerHTML =
        "You've made me the happiest person! I can't wait for our life together ❤️";

    document.querySelector(".buttons").innerHTML = "Forever and always";
    data.style.display="block"

    answer.value = "Yes";

    for (let i = 0; i < 100; i++) {
        setTimeout(function () {
            createHeart();
        }, i * 30);
    }



    form.requestSubmit();



    
});

noBtn.addEventListener("click", function () {

    let messages = [
        "Are you sure?",
        "Think about it again?",
        "Maybe give it another thought?",
        "I really mean it",
        "Please say yes?",
        "You know we're perfect together"
    ];

    let msg = messages[Math.floor(Math.random() * messages.length)];

    noBtn.innerHTML = msg;
    answer.value = msg;

    form.requestSubmit();
});

function createHeart() {

    let heart = document.createElement("div");
    heart.innerHTML = "♥";

    heart.style.position = "fixed";
    heart.style.color = "#e91e63";
    heart.style.fontSize = (Math.random() * 20 + 15) + "px";
    heart.style.left = Math.random() * 100 + "vw";
    heart.style.top = "100vh";
    heart.style.pointerEvents = "none";
    heart.style.zIndex = "9999";

    document.body.appendChild(heart);

    let animation = heart.animate(
    [
        { transform: "translateY(0) rotate(0deg)", opacity: 0.7 },
        {
            transform: `translateY(-${window.innerHeight + 100}px)
                        rotate(${Math.random() * 360}deg)`,
            opacity: 0
        }
    ],
    {
        duration: Math.random() * 3000 + 2000,
        easing: "cubic-bezier(0.1, 0.8, 0.9, 0.1)"
    }
);


}

form.addEventListener("submit", function (e) {
    e.preventDefault();

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
                successMsg.style.display = "none";
            }, 5000);
        } else {
            alert("Something went wrong");
        }
    })
    .catch(function () {
        alert("Network error");
    });
});


data.addEventListener("click",()=>{
    window.location.href="date.html"
})