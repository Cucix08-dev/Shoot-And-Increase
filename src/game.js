const start = document.getElementById("start");
const timer = document.getElementById("timer");

const time = document.getElementById("time");
let timeValue = 0;

const main = document.getElementById("game");
const widthMain = main.offsetWidth;
const heightMain = main.offsetHeight;

const pointsContainer = document.getElementById("points");
let monsters = [];
let points = 0;

const lives = document.getElementById("lives");
let livesTOT = 5;

const header = document.querySelector("header");
const heightHeader = header.offsetHeight;

const shotsIter = document.getElementById("shots");
let shots = 0;

let specialTarget = 0;

start.addEventListener("click", () => {

    let gameOver = false;

    timer.classList.remove("hidden");
    start.classList.add("hidden");

    livesTOT = 5;
    points = 0;
    timeValue = 0;
    shots = 0;
    specialTarget = 0;

    lives.textContent = livesTOT;
    pointsContainer.textContent = points;
    time.textContent = timeValue;

    let timerValue = 3;
    timer.textContent = timerValue;

    const interval = setInterval(() => {
        timerValue--;
        timer.textContent = timerValue;

        if (timerValue === 0) {
            clearInterval(interval);
            timer.classList.add("hidden");

            setInterval(() => {
                if (!gameOver) {
                    time.textContent = ++timeValue;
                }
            }, 1000);

            spawn();
        }

    }, 1000);

    let count = 3000;

    function endGame() {
        monsters.forEach(m => m.remove());
        monsters.length = 0;
        gameOver = true;
        start.classList.remove("hidden");
    }

    function spawn() {

        if (gameOver) return;

        const monster = document.createElement("div");
        monster.classList.add("monster-box");

        specialTarget++;
        const isSpecial = (specialTarget === 6);

        if (isSpecial) monster.classList.add("special");

        let x = (Math.random() * widthMain) - widthMain / 2 - 32;
        x = (x <= -widthMain / 2 + 32) ? -widthMain / 2 + 48 : x;

        const y = heightHeader + (Math.random() * (heightMain - 64));
        monster.style.transform = `translate(${x}px, ${y}px)`;

        const bgmonster = document.createElement("div");
        bgmonster.classList.add("background-monster-box");
        monster.appendChild(bgmonster);
        main.appendChild(monster);
        monsters.push(monster);

        monster.addEventListener("click", () => {
            if (gameOver) return;

            monster.remove();

            if (isSpecial) {
                points += 5;
                specialTarget = 0;
            } else {
                points++;
            }

            pointsContainer.textContent = points;
        });

        setTimeout(() => {
            if (monster.parentNode && !gameOver) {
                monster.remove();
                livesTOT--;
                lives.textContent = livesTOT;

                if (livesTOT === 0) {
                    gameOver = true;
                    endGame();
                }
            }
        }, count * 1.2);

        count *= 0.95;
        if (count < 400) count = 400;

        setTimeout(spawn, count);
    }


    
    main.addEventListener("click", () => {
        if (!gameOver) shotsIter.textContent = String(++shots);
    });


});
