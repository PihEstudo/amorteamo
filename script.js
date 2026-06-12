const hero = document.querySelector("#hero");
const gift = document.querySelector("#gift");
const surprise = document.querySelector("#surprise");
const openGiftButton = document.querySelector("#openGift");
const seeSurpriseButton = document.querySelector("#seeSurprise");
const restartButton = document.querySelector("#restart");
const letterCard = document.querySelector("#letterCard");
const typedText = document.querySelector("#typedText");
const flowerStage = document.querySelector("#flowerStage");
const finalMessage = document.querySelector("#finalMessage");
const particles = document.querySelector("#particles");
const days = document.querySelector("#days");

// Personalize aqui: meses em JavaScript começam em 0. Setembro = 8.
const relationshipStart = new Date(2021, 8, 17);

const loveLetter =
  "Eu n\u00e3o tinha dinheiro para comprar flores...\nent\u00e3o programei uma para voc\u00ea.";

// Cria corações e partículas flutuantes no fundo.
function createParticles(amount = 34) {
  particles.innerHTML = "";

  for (let index = 0; index < amount; index += 1) {
    const particle = document.createElement("span");
    particle.className = "particle";
    particle.textContent = Math.random() > 0.38 ? "\u2661" : "\u2665";
    particle.style.left = `${Math.random() * 100}%`;
    particle.style.setProperty("--size", `${14 + Math.random() * 20}px`);
    particle.style.setProperty("--duration", `${8 + Math.random() * 8}s`);
    particle.style.setProperty("--delay", `${Math.random() * -14}s`);
    particle.style.setProperty("--drift", `${-60 + Math.random() * 120}px`);
    particles.appendChild(particle);
  }
}

// Alterna telas principais com uma animação simples.
function showScreen(screen) {
  [hero, gift, surprise].forEach((item) => item.classList.remove("active"));
  screen.classList.add("active");
}

// Efeito máquina de escrever para a carta.
function typeText(text, onDone) {
  typedText.textContent = "";
  typedText.classList.remove("done");
  let index = 0;

  const interval = window.setInterval(() => {
    typedText.textContent += text[index] === "\n" ? "\n" : text[index];
    index += 1;

    if (index >= text.length) {
      window.clearInterval(interval);
      typedText.classList.add("done");
      onDone();
    }
  }, 48);
}

// Solta corações extras enquanto a flor abre.
function burstHearts() {
  for (let index = 0; index < 18; index += 1) {
    const heart = document.createElement("span");
    heart.className = "particle";
    heart.textContent = "\u2665";
    heart.style.left = `${38 + Math.random() * 24}%`;
    heart.style.setProperty("--size", `${12 + Math.random() * 12}px`);
    heart.style.setProperty("--duration", `${3.8 + Math.random() * 2.4}s`);
    heart.style.setProperty("--delay", `${Math.random() * 0.4}s`);
    heart.style.setProperty("--drift", `${-80 + Math.random() * 160}px`);
    particles.appendChild(heart);

    window.setTimeout(() => heart.remove(), 7000);
  }
}

function openGift() {
  showScreen(gift);
  letterCard.classList.add("opening");

  window.setTimeout(() => {
    typeText(loveLetter, () => {
      flowerStage.classList.add("visible");
      burstHearts();

      window.setTimeout(() => {
        finalMessage.classList.add("visible");
      }, 2600);
    });
  }, 520);
}

// Calcula os dias juntos e anima o contador da tela de surpresa.
function runLoveCounter() {
  let value = 0;
  const today = new Date();
  const todayOnly = new Date(today.getFullYear(), today.getMonth(), today.getDate());
  const target = Math.max(
    0,
    Math.floor((todayOnly - relationshipStart) / (1000 * 60 * 60 * 24))
  );

  if (target === 0) {
    days.textContent = "0";
    return;
  }

  const interval = window.setInterval(() => {
    value += Math.max(1, Math.ceil((target - value) / 10));
    days.textContent = String(value);

    if (value >= target) {
      days.textContent = String(target);
      window.clearInterval(interval);
    }
  }, 48);
}

function openSurprise() {
  showScreen(surprise);
  runLoveCounter();
  burstHearts();
}

function restartExperience() {
  typedText.textContent = "";
  flowerStage.classList.remove("visible");
  finalMessage.classList.remove("visible");
  letterCard.classList.remove("opening");
  days.textContent = "000";
  showScreen(hero);
}

openGiftButton.addEventListener("click", openGift);
seeSurpriseButton.addEventListener("click", openSurprise);
restartButton.addEventListener("click", restartExperience);

createParticles();
