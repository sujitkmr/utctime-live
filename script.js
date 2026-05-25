let format = "24";

/* ---------- UTC ELEMENTS ---------- */

const utcClockEl = document.getElementById("utcClock");
const utcTimeTextEl = document.getElementById("utcTimeText");
const utcDateTextEl = document.getElementById("utcDateText");

/* ---------- IST ELEMENTS ---------- */

const istClockEl = document.getElementById("istClock");
const istTimeTextEl = document.getElementById("istTimeText");
const istDateTextEl = document.getElementById("istDateText");

/* ---------- TOGGLE BUTTONS ---------- */

const btn24 = document.getElementById("btn24");
const btn12 = document.getElementById("btn12");

/* ---------- ORDINAL DATE ---------- */

function ordinal(n) {

    if (n > 3 && n < 21) {
        return n + "th";
    }

    switch (n % 10) {

        case 1:
            return n + "st";

        case 2:
            return n + "nd";

        case 3:
            return n + "rd";

        default:
            return n + "th";
    }
}

/* ---------- FORMAT CLOCK ---------- */

function formatClock(hours, minutes, seconds) {

    hours = Number(hours);

    // ---------- 12 HOUR ----------
    if (format === "12") {

        const ampm =
            hours >= 12
                ? " PM"
                : " AM";

        const displayHours =
            hours % 12 || 12;

        return `${displayHours}:${minutes}:${seconds}${ampm}`;
    }

    // ---------- 24 HOUR ----------
    const displayHours = String(hours)
        .padStart(2, "0");

    return `${displayHours}:${minutes}:${seconds}`;
}

/* ---------- UPDATE CLOCKS ---------- */

function updateTime() {

    const now = new Date();

    /* =========================
       UTC TIME
    ========================= */

    const utcHours =
        now.getUTCHours();

    const utcMinutes = String(
        now.getUTCMinutes()
    ).padStart(2, "0");

    const utcSeconds = String(
        now.getUTCSeconds()
    ).padStart(2, "0");

    const utcTime = formatClock(
        utcHours,
        utcMinutes,
        utcSeconds
    );

    utcClockEl.textContent = utcTime;

    utcTimeTextEl.textContent =
        `UTC current time is ${utcTime}`;

    const utcDay = ordinal(
        now.getUTCDate()
    );

    const utcWeekday =
        now.toLocaleString(
            "en-US",
            {
                weekday: "long",
                timeZone: "UTC"
            }
        );

    const utcMonth =
        now.toLocaleString(
            "en-US",
            {
                month: "long",
                timeZone: "UTC"
            }
        );

    const utcYear =
        now.getUTCFullYear();

    utcDateTextEl.textContent =
        `UTC current date is ${utcDay} ${utcWeekday} ${utcMonth} ${utcYear}.`;

    /* =========================
       IST TIME
    ========================= */

    // UTC + 5:30
    const istDate = new Date(
        now.getTime() + (5.5 * 60 * 60 * 1000)
    );

    const istHours =
        istDate.getUTCHours();

    const istMinutes = String(
        istDate.getUTCMinutes()
    ).padStart(2, "0");

    const istSeconds = String(
        istDate.getUTCSeconds()
    ).padStart(2, "0");

    const istTime = formatClock(
        istHours,
        istMinutes,
        istSeconds
    );

    istClockEl.textContent = istTime;

    istTimeTextEl.textContent =
        `IST current time is ${istTime}`;

    const istDay = ordinal(
        istDate.getUTCDate()
    );

    const istWeekday =
        istDate.toLocaleString(
            "en-US",
            {
                weekday: "long",
                timeZone: "UTC"
            }
        );

    const istMonth =
        istDate.toLocaleString(
            "en-US",
            {
                month: "long",
                timeZone: "UTC"
            }
        );

    const istYear =
        istDate.getUTCFullYear();

    istDateTextEl.textContent =
        `IST current date is ${istDay} ${istWeekday} ${istMonth} ${istYear}.`;
}

/* ---------- FORMAT TOGGLE ---------- */

function setFormat(type) {

    format = type;

    btn24.classList.remove("active");
    btn12.classList.remove("active");

    btn24.setAttribute(
        "aria-pressed",
        type === "24"
    );

    btn12.setAttribute(
        "aria-pressed",
        type === "12"
    );

    (
        type === "24"
            ? btn24
            : btn12
    ).classList.add("active");

    updateTime();
}

/* ---------- INITIAL LOAD ---------- */

updateTime();

/* ---------- UPDATE EVERY SECOND ---------- */

setInterval(updateTime, 1000);