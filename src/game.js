const start = document.getElementById("start");
const timer = document.getElementById("timer");

const time = document.getElementById("time");
let timeValue = 0;

const main = document.getElementById("game");
const widthMain = main.offsetWidth;
const heightMain = main.offsetHeight;

const monsterKilledDiv = document.getElementById("monster-killed");
let monsters = [];
let monstersKilled = 0;

const lives = document.getElementById("lives");
let livesTOT = 5;

const header = document.querySelector("header");
const heightHeader = header.offsetHeight;

start.addEventListener("click", () => {

    let gameOver = false;

    timer.classList.remove("hidden");
    start.classList.add("hidden");

    livesTOT = 5;
    monstersKilled = 0;
    timeValue = 0;

    lives.textContent = livesTOT;
    monsterKilledDiv.textContent = monstersKilled;
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
        monsters = [];
        gameOver = true;
        start.classList.remove("hidden");
    }

    function spawn() {

        if (gameOver) return;

        const monster = document.createElement("div");
        monster.classList.add("monster-box");

        let x = (Math.random() * widthMain) - widthMain / 2 - 32;
        x = (x <= -widthMain / 2 + 32) ? -widthMain / 2 + 48 : x;

        const y = heightHeader + (Math.random() * (heightMain - 64));

        monster.style.transform = `translate(${x}px, ${y}px)`;

        main.appendChild(monster);
        monsters.push(monster);

        monster.addEventListener("click", () => {
            if (gameOver) return;
            monster.remove();
            monsterKilledDiv.textContent = ++monstersKilled;
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

});
