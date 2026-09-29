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