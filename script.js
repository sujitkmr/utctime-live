let format = "24";

function ordinal(n) {
    if (n > 3 && n < 21) return n + "th";
    return n % 10 === 1 ? n + "st" :
           n % 10 === 2 ? n + "nd" :
           n % 10 === 3 ? n + "rd" : n + "th";
}

function updateTime() {
    const now = new Date();

    let hours = now.getUTCHours();
    const minutes = String(now.getUTCMinutes()).padStart(2, "0");
    const seconds = String(now.getUTCSeconds()).padStart(2, "0");

    let displayHours = hours;
    let ampm = "";

    if (format === "12") {
        ampm = hours >= 12 ? " PM" : " AM";
        displayHours = hours % 12 || 12;
    }

    displayHours = String(displayHours).padStart(2, "0");

    const timeStr = `${displayHours}:${minutes}:${seconds}${ampm}`;

    document.getElementById("utcClock").textContent = timeStr;
    document.getElementById("timeText").textContent =
        `UTC current time is ${timeStr}`;

    const day = ordinal(now.getUTCDate());
    const weekday = now.toLocaleString("en-US", { weekday: "long", timeZone: "UTC" });
    const month = now.toLocaleString("en-US", { month: "long", timeZone: "UTC" });
    const year = now.getUTCFullYear();

    document.getElementById("dateText").textContent =
        `UTC current date is ${day} ${weekday} ${month} ${year}.`;
}

function setFormat(type) {
    format = type;

    document.getElementById("btn24").classList.remove("active");
    document.getElementById("btn12").classList.remove("active");

    document.getElementById("btn24").setAttribute("aria-pressed", type === "24");
    document.getElementById("btn12").setAttribute("aria-pressed", type === "12");

    document.getElementById(type === "24" ? "btn24" : "btn12")
        .classList.add("active");

    updateTime();
}

setInterval(updateTime, 1000);
updateTime();
