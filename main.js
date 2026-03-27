/* =========================
   INITIAL LOCK STATE
========================= */
document.body.classList.add("locked");


/* =========================
   TYPEWRITER
========================= */
const text = "Hey Shlesha… I made something for you.";
let index = 0;

function typeWriter(){
const el = document.getElementById("typewriter");
if(!el) return;

if(index < text.length){
el.innerHTML += text.charAt(index);
index++;

let speed = 40;
if(text.charAt(index) === "…") speed = 200;

setTimeout(typeWriter, speed);
}
}

window.addEventListener("load", () => {
setTimeout(typeWriter, 600);
initVideo();
});


/* =========================
   UNLOCK SYSTEM 🔐
========================= */

function unlock(){

const input = document.getElementById("unlock-input").value.trim();
const hint = document.querySelector(".unlock-hint");
const screen = document.getElementById("unlock-screen");

const correct = "0103";

if(input === correct){

document.body.classList.remove("locked");

startMusic();
startStars();
startHearts();

/* smooth fade */
screen.style.transition = "0.6s ease";
screen.style.opacity = "0";

setTimeout(()=>{
screen.style.display = "none";
},600);

/* vibration */
if(navigator.vibrate) navigator.vibrate(100);

} else {
hint.innerHTML = "Not quite… think again 😉";
hint.style.color = "#ff9ecf";
}
}


/* =========================
   MUSIC 🎧
========================= */

const music = document.getElementById("bgmusic");
let isPlaying = false;

function startMusic(){

if(!music) return;

music.play().then(()=>{
isPlaying = true;
}).catch(()=>{});

/* fade in */
music.volume = 0;
let vol = 0;

const fade = setInterval(()=>{
vol += 0.02;

if(vol >= 0.35){
music.volume = 0.35;
clearInterval(fade);
} else {
music.volume = vol;
}
},200);
}

function toggleMusic(){
if(!music) return;

if(isPlaying){
music.pause();
isPlaying = false;
} else {
music.play();
isPlaying = true;
}
}

/* mobile autoplay fix */
document.addEventListener("click", () => {
if(!isPlaying) startMusic();
}, { once:true });


/* =========================
   HEARTS 💖 (FIXED)
========================= */

function createHeart(){

const heart = document.createElement("div");
heart.innerHTML = "💖";

heart.style.position = "fixed";
heart.style.left = Math.random() * 100 + "vw";
heart.style.bottom = "0px"; /* 🔥 FIX */
heart.style.fontSize = Math.random() * 20 + 16 + "px";
heart.style.opacity = 0.8;
heart.style.animation = "floatUp 5s linear";

document.body.appendChild(heart);

setTimeout(()=>heart.remove(),5000);
}

function startHearts(){
setInterval(createHeart, 500);
}


/* =========================
   STARS SYSTEM 🌌
========================= */

const canvas = document.getElementById("stars");
const ctx = canvas.getContext("2d");

function startStars(){

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let stars = [];

for(let i=0; i<180; i++){
stars.push({
x: Math.random()*canvas.width,
y: Math.random()*canvas.height,
size: Math.random()*2 + 0.5,
speed: Math.random()*0.3 + 0.1,
opacity: Math.random()*0.8 + 0.2
});
}

function drawStars(){

ctx.clearRect(0,0,canvas.width,canvas.height);

stars.forEach(star=>{

star.y += star.speed;

/* reset */
if(star.y > canvas.height){
star.y = 0;
star.x = Math.random()*canvas.width;
}

/* glow effect */
ctx.beginPath();
ctx.arc(star.x, star.y, star.size, 0, Math.PI*2);

ctx.fillStyle = `rgba(255,255,255,${star.opacity})`;
ctx.shadowBlur = 10;
ctx.shadowColor = "white";

ctx.fill();

});

requestAnimationFrame(drawStars);
}

drawStars();


window.triggerFinalSequence = function(){
textPoints = createTextPoints("Shlesha");
finalMode = true;
};

}


/* =========================
   SECTION CONTROL
========================= */

const sections = document.querySelectorAll(".section");
let currentSection = -1;

function startExperience(){
    document.querySelector(".hero").style.display = "none";

    currentSection = 0;
    sections[currentSection].classList.add("active");

    handleSectionEnter(currentSection);
}

function nextSection(){

    if(currentSection === -1) return;

    sections[currentSection].classList.remove("active");

    currentSection++;

    if(currentSection >= sections.length){
        return;
    }

    sections[currentSection].classList.add("active");

    handleSectionEnter(currentSection);
}
function previousSection(){

if(currentSection <= 0) return;

sections[currentSection].classList.remove("active");
currentSection--;

sections[currentSection].classList.add("active");

handleSectionEnter(currentSection); // 🔥 ADD THIS
}


/* =========================
   SLIDER (FIXED RESPONSIVE)
========================= */
let polaroidIndex = 0;

function slidePolaroid(direction){

const track = document.getElementById("polaroidTrack");
const total = track.children.length;

const visible = window.innerWidth < 768 ? 1 : 3;

/* move */
polaroidIndex += direction;

/* limit properly */
if(polaroidIndex < 0) polaroidIndex = 0;
if(polaroidIndex > total - visible) polaroidIndex = total - visible;

/* dynamic width */
const card = track.children[0];
const gap = 20;
const width = card.offsetWidth + gap;

/* move perfectly */
track.style.transform = `translateX(-${polaroidIndex * width}px)`;
}

/* resize fix */
window.addEventListener("resize", ()=>{
slidePolaroid(0);
});


/* =========================
   FINAL CAKE 🎂
========================= */

function blowCandles(){

for(let i=0;i<60;i++){
createHeart();
}

}
function openImage(src){
const modal = document.getElementById("imageModal");
const img = document.getElementById("modalImg");

img.src = src;
modal.classList.add("active");
}

function closeImage(){
document.getElementById("imageModal").classList.remove("active");
}
document.querySelectorAll("audio").forEach(audio => {
audio.addEventListener("play", () => {
document.querySelectorAll("audio").forEach(other => {
if(other !== audio) other.pause();
});
});
});
function showUnsaidLines() {
    const lines = document.querySelectorAll(".unsaid-line");

    lines.forEach((line, index) => {
        setTimeout(() => {
            line.classList.add("show");
        }, index * 1400);
    });
}
function handleSectionEnter(index){

    const section = sections[index];
    if(!section) return;

    const video = document.getElementById("loveVideo");
    const overlay = document.getElementById("videoOverlay");
    const wrapper = document.getElementById("videoContainer");

    /* ================= UNSAID ================= */
    if(section.id === "unsaid"){
        showUnsaidLines();
    }

    /* ================= VIDEO ================= */
    if(section.id === "video"){

        if(wrapper){
            wrapper.classList.remove("show"); // reset first
            setTimeout(()=>{
                wrapper.classList.add("show");
            },200);
        }

        return; // 🔥 IMPORTANT: stop here (avoid reset logic below)
    }

    /* ================= RESET VIDEO ================= */
    if(video){
        video.pause();
        video.currentTime = 0;
    }

    if(overlay){
        overlay.classList.remove("hide");
    }

    if(wrapper){
        wrapper.classList.remove("show");
    }

    document.body.classList.remove("video-playing");
    if(section.id === "quiz"){
    document.getElementById("quiz-intro").style.display = "block";
    document.getElementById("quiz-box").style.display = "none";
    document.getElementById("quiz-result").style.display = "none";
    document.getElementById("quiz-continue").style.display = "none";
}
if(section.id === "letter"){
    setTimeout(typeLetter, 300);
}
if(section.id === "memory-lane"){
    const display = document.getElementById("memory-display");
    const text = document.getElementById("memory-text");
    const img = document.getElementById("memory-img");

    text.innerText = "Select something above… 💭";
    img.style.display = "none";
    display.classList.remove("show");
}
}
function initVideo(){

    const video = document.getElementById("loveVideo");
    const overlay = document.getElementById("videoOverlay");

    if(!video || !overlay) return;

    overlay.onclick = () => {

        video.play().then(()=>{
            overlay.classList.add("hide");
            document.body.classList.add("video-playing");
        }).catch(()=>{
            console.log("Play blocked");
        });

    };
}
video.addEventListener("click", () => {
    if(video.paused){
        video.play();
    } else {
        video.pause();
    }
});
const quizData = [
    {
        question: "What is my favorite thing about you?",
        options: ["Your smile", "Your attitude", "Everything", "The way you care"],
        answer: 2
    },
    {
        question: "When did we have our first date?",
        options: ["5th feb", "2nd feb", "14th feb", "25th jan"],
        answer: 0
    },
    {
        question: "Which movie did we watch on our first date?",
        options: ["Anyone But you", "Animal", "Laila Majnu", "YJHD"],
        answer: 0
    },
    {
        question: "How much do I love you?",
        options: ["A little", "Equal to you", "More than you", "Infinity"],
        answer: 3
    },
    {
        question: "What are you to me?",
        options: ["Special", "Goddess", "My peace", "Everything"],
        answer: 1
    }
];
let currentQuestion = 0;
let score = 0;
function startQuiz(){
    document.getElementById("quiz-intro").style.display = "none";
    document.getElementById("quiz-box").style.display = "block";

    currentQuestion = 0;
    score = 0;

    loadQuestion();
}
function loadQuestion(){

    const q = quizData[currentQuestion];

    document.getElementById("question").innerText = q.question;

    const buttons = document.querySelectorAll(".option-btn");

    buttons.forEach((btn, index)=>{
        btn.innerText = q.options[index];
    });

    document.getElementById("quiz-feedback").innerText = "";
}
function selectAnswer(index){

    const q = quizData[currentQuestion];
    const correct = q.answer;
    const feedback = document.getElementById("quiz-feedback");

    if(index === correct){
        score++;
        feedback.innerText = "Correct 💖 you really know me well";
    } else {
        const correctAnswer = q.options[correct];
        feedback.innerText = `Not correct… but still cute 😌 
The right answer is: ${correctAnswer}`;
    }

    setTimeout(()=>{
        currentQuestion++;

        if(currentQuestion < quizData.length){
            loadQuestion();
        } else {
            showResult();
        }
    }, 1500);
}

function showResult(){

    document.getElementById("quiz-box").style.display = "none";
    document.getElementById("quiz-result").style.display = "block";

    document.getElementById("score-text").innerText =
        `You got ${score}/5 💖`;

    let message = "";

    if(score === 5){
        message = "Perfect… just like you ✨";
    } else if(score >= 3){
        message = "Not perfect… but still special 💫";
    } else {
        message = "You tried… and that matters 💖";
    }

    document.getElementById("final-message").innerText = message;

    document.getElementById("quiz-continue").style.display = "inline-block";
}
const letterContent = `

I don’t really know how to say everything properly…

But I just wanted you to know this.

You’ve become someone really important to me.
More than I expected… more than I say.

It’s not always the big moments,
but the small things…
the conversations, the silence, the way you exist.

Even on days when things aren’t perfect,
you still matter to me in a way I can’t explain.

I never thought ek kattar hindu marwadi 2 saal
badi ke saath itna close honga mai

I cannot be with you on your special day even
when I wholeheartdely wanted to
But I hope you always stay happy and enjoy your day

And if this made you smile even a little…

that’s all I wanted 💖

`;

function typeLetter(){

    const el = document.getElementById("letter-text");
    if(!el) return;

    el.innerHTML = "";
    let i = 0;

    function typing(){
        if(i < letterContent.length){
            el.innerHTML += letterContent.charAt(i);
            i++;
            setTimeout(typing, 25);
        }
    }

    typing();
}
const memoryData = [
    {
        text: "I still remember the first time… it felt different 💫",
        img: "images/memory1.jpeg"
    },
    {
        text: "That moment we couldn’t stop laughing… I’ll never forget it ✨",
        img: "images/memory2.jpeg"
    },
    {
        text: "Last Year your birthday 😅",
        img: "images/memory3.jpeg"
    },
    {
        text: "It’s the little things about you that make you special, cannot forget this moment 💖",
        img: "images/memory4.jpeg"
    },
    {
        text: "I don’t know the future… but I want you in it 🌙",
        img: "images/memory5.jpeg"
    }
];
function showMemory(index){

    const display = document.getElementById("memory-display");
    const text = document.getElementById("memory-text");
    const img = document.getElementById("memory-img");

    if(!memoryData[index]) return;

    display.classList.remove("show");

    setTimeout(()=>{
        text.innerText = memoryData[index].text;

        img.src = memoryData[index].img;
        img.style.display = "block";

        display.classList.add("show");
    },200);
}
