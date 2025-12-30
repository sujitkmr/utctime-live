let format = "24";

// Cache DOM elements
const utcClockEl = document.getElementById("utcClock");
const timeTextEl = document.getElementById("timeText");
const dateTextEl = document.getElementById("dateText");
const btn24 = document.getElementById("btn24");
const btn12 = document.getElementById("btn12");

// Ordinal function
function ordinal(n) {
    if (n > 3 && n < 21) return n + "th";
    return n % 10 === 1 ? n + "st" :
           n % 10 === 2 ? n + "nd" :
           n % 10 === 3 ? n + "rd" : n + "th";
}

// Update UTC time
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

    displayHours = format === "24" ? String(displayHours).padStart(2, "0") : displayHours;

    const timeStr = `${displayHours}:${minutes}:${seconds}${ampm}`;

    utcClockEl.textContent = timeStr;
    timeTextEl.textContent = `UTC current time is ${timeStr}`;

    const day = ordinal(now.getUTCDate());
    const weekday = now.toLocaleString("en-US", { weekday: "long", timeZone: "UTC" });
    const month = now.toLocaleString("en-US", { month: "long", timeZone: "UTC" });
    const year = now.getUTCFullYear();

    dateTextEl.textContent = `UTC current date is ${day} ${weekday} ${month} ${year}.`;
}

// Set 12/24 hour format
function setFormat(type) {
    format = type;

    btn24.classList.remove("active");
    btn12.classList.remove("active");

    btn24.setAttribute("aria-pressed", type === "24" ? "true" : "false");
    btn12.setAttribute("aria-pressed", type === "12" ? "true" : "false");

    (type === "24" ? btn24 : btn12).classList.add("active");

    updateTime();
}

// Initialize clock
setInterval(updateTime, 1000);
updateTime();
