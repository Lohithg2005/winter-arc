// ==========================================
// WINTER ARC 3.0
// ==========================================

const STORAGE_KEY = "winterArcV3";

const tasks = [

    // MORNING
    {
        id: "wake",
        category: "morning",
        name: "Wake up",
        description: "Wake up at 4:00 AM only when you have enough sleep",
        time: "4:00 AM"
    },
    {
        id: "shower",
        category: "morning",
        name: "Cold / cool shower",
        description: "Start the morning fresh",
        time: "Morning"
    },
    {
        id: "run",
        category: "morning",
        name: "Running",
        description: "Easy/moderate run according to your fitness",
        time: "Morning"
    },
    {
        id: "morningExercise",
        category: "morning",
        name: "Small exercise",
        description: "Stretching + simple bodyweight movement",
        time: "Morning"
    },

    // STUDY
    {
        id: "study",
        category: "study",
        name: "Study",
        description: "Focused academic study",
        time: "2 hours"
    },
    {
        id: "english",
        category: "study",
        name: "English learning",
        description: "Reading, writing, spelling and modern English",
        time: "Daily"
    },
    {
        id: "computer",
        category: "study",
        name: "Computer knowledge",
        description: "Learn one useful computer concept",
        time: "Daily"
    },

    // SKILLS
    {
        id: "typing",
        category: "skills",
        name: "Speed typing",
        description: "Practice typing speed and accuracy",
        time: "30 min"
    },
    {
        id: "python",
        category: "skills",
        name: "Python coding",
        description: "Learn Python and practice coding",
        time: "45–60 min"
    },

    // FITNESS
    {
        id: "walk",
        category: "fitness",
        name: "Evening walk",
        description: "Relaxing walk",
        time: "30 min"
    },
    {
        id: "gym",
        category: "fitness",
        name: "Gym / workout",
        description: "Strength or fitness session with proper recovery",
        time: "Up to 1 hour"
    },

    // HEALTH
    {
        id: "water",
        category: "health",
        name: "Water goal",
        description: "Aim around 3 litres, adjusting for heat and activity",
        time: "Daily"
    },
    {
        id: "healthyFood",
        category: "health",
        name: "Balanced food",
        description: "Nutritious meals and limit junk food",
        time: "Daily"
    },
    {
        id: "breakfast",
        category: "health",
        name: "Healthy breakfast",
        description: "Example: oats + apple + milk + other nutritious foods",
        time: "Morning"
    },
    {
        id: "sleep",
        category: "health",
        name: "Enough sleep",
        description: "Protect your sleep and recovery",
        time: "Night"
    },

    // SUNDAY
    {
        id: "hairOil",
        category: "sunday",
        name: "Hair oil",
        description: "Weekly self-care routine",
        time: "Sunday"
    },
    {
        id: "coconutWater",
        category: "sunday",
        name: "Coconut water",
        description: "Part of your Sunday routine",
        time: "Sunday"
    },
    {
        id: "weeklyReview",
        category: "sunday",
        name: "Weekly review",
        description: "Review your week and prepare for the next one",
        time: "Sunday"
    }
];


// ==========================================
// DATE
// ==========================================

function getDateKey(date = new Date()) {

    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");

    return `${year}-${month}-${day}`;
}

const todayKey = getDateKey();

document.getElementById("todayDate").textContent =
    new Date().toLocaleDateString("en-IN", {
        weekday: "short",
        day: "numeric",
        month: "short",
        year: "numeric"
    });


// ==========================================
// DEFAULT DATA
// ==========================================

function getDefaultData() {

    return {
        startDate: "2026-10-01",
        duration: 90,
        xp: 0,
        streak: 0,
        days: {}
    };
}

let data = JSON.parse(localStorage.getItem(STORAGE_KEY));

if (!data) {

    data = getDefaultData();

    saveData();
}


function saveData() {

    localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify(data)
    );
}


// ==========================================
// DAY CALCULATION
// ==========================================

function getDayNumber() {

    const start =
        new Date(data.startDate + "T00:00:00");

    const today = new Date();

    today.setHours(0, 0, 0, 0);

    const difference =
        Math.floor(
            (today - start) /
            (1000 * 60 * 60 * 24)
        );

    return difference + 1;
}


function updateJourney() {

    const day = getDayNumber();

    let displayDay = day;

    if (day < 1) {
        displayDay = 1;
    }

    if (day > data.duration) {
        displayDay = data.duration;
    }

    document.getElementById("dayNumber").textContent =
        `DAY ${displayDay} / ${data.duration}`;

    if (day < 1) {

        document.getElementById("journeyText").textContent =
            "Get ready. Your Winter Arc starts tomorrow.";

    } else if (day === 1) {

        document.getElementById("journeyText").textContent =
            "🔥 Day 1. The journey starts today.";

    } else if (day <= data.duration) {

        document.getElementById("journeyText").textContent =
            "Keep going. One day at a time.";

    } else {

        document.getElementById("journeyText").textContent =
            "❄️ 90 days completed.";
    }
}


// ==========================================
// TODAY DATA
// ==========================================

function getTodayData() {

    if (!data.days[todayKey]) {

        data.days[todayKey] = {};
    }

    return data.days[todayKey];
}


// ==========================================
// RENDER TASKS
// ==========================================

function renderTasks() {

    const categories = {

        morning:
            document.getElementById("morningTasks"),

        study:
            document.getElementById("studyTasks"),

        skills:
            document.getElementById("skillTasks"),

        fitness:
            document.getElementById("fitnessTasks"),

        health:
            document.getElementById("healthTasks"),

        sunday:
            document.getElementById("sundayTasks")
    };

    Object.values(categories).forEach(element => {

        element.innerHTML = "";
    });


    const today = getTodayData();

    const isSunday =
        new Date().getDay() === 0;


    tasks.forEach(task => {

        if (
            task.category === "sunday" &&
            !isSunday
        ) {
            return;
        }


        const div =
            document.createElement("div");


        div.className = "task";


        if (today[task.id]) {

            div.classList.add("done");
        }


        div.innerHTML = `

            <div class="task-check"></div>

            <div class="task-info">

                <div class="task-name">
                    ${task.name}
                </div>

                <div class="task-description">
                    ${task.description}
                </div>

            </div>

            <div class="task-time">
                ${task.time}
            </div>

        `;


        div.addEventListener(
            "click",
            () => toggleTask(task.id)
        );


        categories[task.category]
            .appendChild(div);
    });


    updateStats();
}


// ==========================================
// TOGGLE TASK
// ==========================================

function toggleTask(id) {

    const today =
        getTodayData();


    today[id] = !today[id];


    if (today[id]) {

        data.xp += 10;

    } else {

        data.xp =
            Math.max(
                0,
                data.xp - 10
            );
    }


    saveData();


    renderTasks();

    updateLevel();
}


// ==========================================
// STATS
// ==========================================

function updateStats() {

    const today =
        getTodayData();


    const visibleTasks =
        tasks.filter(task => {

            return !(
                task.category === "sunday" &&
                new Date().getDay() !== 0
            );

        });


    const total =
        visibleTasks.length;


    const completed =
        visibleTasks.filter(
            task => today[task.id]
        ).length;


    const percentage =
        total === 0
            ? 0
            : Math.round(
                (completed / total) * 100
            );


    document.getElementById(
        "completedCount"
    ).textContent = completed;


    document.getElementById(
        "totalCount"
    ).textContent = total;


    document.getElementById(
        "progressText"
    ).textContent = `${percentage}%`;


    document.getElementById(
        "progressBar"
    ).style.width = `${percentage}%`;


    updateStreak();
}


// ==========================================
// LEVEL
// ==========================================

function updateLevel() {

    const level =
        Math.floor(data.xp / 100) + 1;


    document.getElementById(
        "level"
    ).textContent = level;


    document.getElementById(
        "xp"
    ).textContent = data.xp;
}


// ==========================================
// STREAK
// ==========================================

function updateStreak() {

    let streak = 0;

    const date = new Date();


    while (true) {

        const key =
            getDateKey(date);


        const dayData =
            data.days[key];


        if (!dayData) {

            break;
        }


        const dayTasks =
            tasks.filter(task => {

                return !(
                    task.category === "sunday" &&
                    date.getDay() !== 0
                );
            });


        const completed =
            dayTasks.length > 0 &&
            dayTasks.every(
                task => dayData[task.id]
            );


        if (!completed) {

            break;
        }


        streak++;

        date.setDate(
            date.getDate() - 1
        );
    }


    data.streak = streak;


    document.getElementById(
        "streak"
    ).textContent = streak;


    saveData();
}


// ==========================================
// PWA INSTALL
// ==========================================

let deferredPrompt = null;

const installBtn =
    document.getElementById("installBtn");


installBtn.style.display = "none";


window.addEventListener(
    "beforeinstallprompt",
    event => {

        event.preventDefault();

        deferredPrompt = event;

        installBtn.style.display =
            "block";
    }
);


installBtn.addEventListener(
    "click",
    async () => {

        if (!deferredPrompt) {

            alert(
                "Install option is not available yet. Open the app through HTTPS on your phone."
            );

            return;
        }


        deferredPrompt.prompt();


        await deferredPrompt.userChoice;


        deferredPrompt = null;

        installBtn.style.display =
            "none";
    }
);


// ==========================================
// SERVICE WORKER
// ==========================================

if ("serviceWorker" in navigator) {

    window.addEventListener(
        "load",
        () => {

            navigator.serviceWorker
                .register("sw.js")
                .catch(error => {

                    console.log(
                        "Service Worker:",
                        error
                    );

                });
        }
    );
}


// ==========================================
// START
// ==========================================

updateJourney();

renderTasks();

updateLevel();
