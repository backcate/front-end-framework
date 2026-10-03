// live time
function liveTime() {
    let now = new Date();
    let localFormate = now.toLocaleString();
    let showMessage = document.getElementById("time");

    showMessage.innerHTML = localFormate;
}

liveTime();
setInterval(liveTime, 1000);


// Plant Matchmaker quiz
let quizBtn = document.getElementById("quiz_btn");

window.addEventListener("load", function () {
    document.getElementById("sun_light").value = "";
    document.getElementById("care_level").value = "";
    document.getElementById("pets").value = "";
});

if (quizBtn) {
    quizBtn.addEventListener("click", function (){
        let sunLight = document.getElementById("sun_light").value;
        let careLevel = document.getElementById("care_level").value;
        let pets = document.getElementById("pets").value;
        let quizResult = document.getElementById("quiz_result");

        if (sunLight === "" || careLevel === "" || pets === "") {
            quizResult.innerText = "Please answer all questions.";
            quizResult.classList.remove("hidden");
            return;
        }

        if (pets === "yes") {
            quizResult.innerText = "Recommended plant: Spider Plant. This recommendation is based on the preferences you selected.";
        } else if (sunLight === "low" && careLevel === "easy") {
            quizResult.innerText = "Recommended plant: Snake Plant. This plant may be a good match for your preferences.";
        } else if (sunLight === "bright" && careLevel === "medium") {
            quizResult.innerText = "Recommended plant: Monstera Plant. This recommendation is based on the preferences you selected.";
        } else {
            quizResult.innerText = "Recommended plant: Peace Lily. It is a beautiful indoor plant.";
        }
        quizResult.classList.remove("hidden");
    });
}

// Form
const FormSubmit = document.getElementById("formList");

if (FormSubmit) {
    FormSubmit.addEventListener("submit", function (e) {
        e.preventDefault();

        let errorMessage = null;

        const submitMessage = document.getElementById("check_error");
        const userName = document.getElementById("contact_name").value;
        const userEmail = document.getElementById("contact_email").value;
        const userMessage = document.getElementById("contact_message").value;

        if (!userName) {
            errorMessage = "Name Is Required";
        } else if (!userEmail) {
            errorMessage = "Email Is Required";
        } else if (!userMessage) {
            errorMessage = "Message Is Required";
        }

        if (errorMessage) {
            submitMessage.innerHTML = errorMessage;
        } else {
            submitMessage.innerHTML = "Form Submit Done";
        }
    });
}


// Plant Price
const sizeOption = document.getElementById("sizeOption");
const potOption = document.getElementById("potOption");
const standOption = document.getElementById("standOption");

const plantPrice = document.getElementById("plantPrice");
const potPrice = document.getElementById("potPrice");
const standPrice = document.getElementById("standPrice");
const grandTotal = document.getElementById("grandTotal");

const addToCart = document.getElementById("addToCart");
const cartMessage = document.getElementById("cartMessage");

function total() {
    let plant = Number(sizeOption.value);
    let pot = Number(potOption.value);
    let stand = Number(standOption.value);

    plantPrice.innerText = "TK-" + plant.toFixed(2);
    potPrice.innerText = "TK-" + pot.toFixed(2);
    standPrice.innerText = "TK-" + stand.toFixed(2);

    grandTotal.innerText = "TK-" + (plant + pot + stand).toFixed(2);
}

if (sizeOption) sizeOption.onchange = total;
if (potOption) potOption.onchange = total;
if (standOption) standOption.onchange = total;

if (addToCart) {
    addToCart.onclick = function () {
        cartMessage.innerText = "Added to cart. Total: " + grandTotal.innerText;
        cartMessage.classList.remove("hidden");
    };
}

if (sizeOption) total();




// Live chat
var Tawk_API=Tawk_API||{}, Tawk_LoadStart=new Date();
(function(){
var s1=document.createElement("script"),s0=document.getElementsByTagName("script")[0];
s1.async=true;
s1.src='https://embed.tawk.to/6aad723e289a683445744f99/1k2qochbc';
s1.charset='UTF-8';
s1.setAttribute('crossorigin','*');
s0.parentNode.insertBefore(s1,s0);
})();



