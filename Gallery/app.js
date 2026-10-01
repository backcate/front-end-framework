function liveTime() {
    let now = new Date();
    let localFormate = now.toLocaleString();
    let showMessage = document.getElementById("time");

    showMessage.innerHTML = localFormate;
}

liveTime();
setInterval(liveTime, 1000);