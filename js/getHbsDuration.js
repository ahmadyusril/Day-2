const getDuration = require("./getDuration");

function getHbsDuration() {
    const p = document.getElementById("duration");
    const startDate = document.getElementById("startDate").innerHTML;
    const endDate = document.getElementById("endDate").innerHTML;

    const duration = getDuration(startDate, endDate);
    p.innerHTML = `Durasi : ${duration}`;
    return;
}

getHbsDuration();