/* UHRENSOHN – script.js */
/* funktionen fuer menue, slider, produkte und kontaktformular */


/* mobile-menue */
const hamburgerBtn = document.getElementById("hamburger-btn");
const navLinks = document.getElementById("nav-links");

if (hamburgerBtn && navLinks) {
  hamburgerBtn.addEventListener("click", function () {
    hamburgerBtn.classList.toggle("open");
    navLinks.classList.toggle("open");
  });
}


/* aktueller nav-link */
const navLinksAll = document.querySelectorAll(".nav-link");

navLinksAll.forEach(function (link) {
  if (link.href === window.location.href) {
    link.classList.add("active");
  }
});


/* produkte fuer startseite und sortiment */
const homeProducts = [
  {
    name: "Tissot PRX Powermatic 80",
    price: "CHF 895.00",
    image: "assets/images/sortiment_home_tissot_prx.jpg"
  },
  {
    name: "Rolex Oyster Perpetual (100 Years Edition)",
    price: "CHF 8'550.00",
    image: "assets/images/sortiment_home_rolex.jpg"
  },
  {
    name: "Omega Seamaster Aqua Terra",
    price: "CHF 4'200.00",
    image: "assets/images/sortiment_home_omega.jpg"
  },
  {
    name: "IWC Pilot's Watch",
    price: "CHF 5'900.00",
    image: "assets/images/sortiment_home_iwc.jpg"
  }
];

const extraProducts = [
  {
    name: "Swatch Once Again",
    price: "CHF 75.00",
    image: "assets/images/sortiment_swatch.jpg"
  },
  {
    name: "MP-10 Tourbillon Weight Energy System Titanium Hublot",
    price: "CHF 250'000.00",
    image: "assets/images/sortiment_hublot.jpg"
  },
  {
    name: "TAG Heuer Monaco Split Seconds",
    price: "CHF 145'000.00",
    image: "assets/images/sortiment_tag_heuer.jpg"
  },
  {
    name: "Tissot PR 100 Sport Gent",
    price: "CHF 295.00",
    image: "assets/images/sortiment_tissot_pr100.jpg"
  }
];

const productGrid = document.getElementById("product-grid");

if (productGrid) {
  let products = homeProducts;

  /* auf der sortiment-seite werden mehr produkte angezeigt */
  if (window.location.pathname.includes("sortiment")) {
    products = homeProducts.concat(extraProducts);
  }

  products.forEach(function (product) {
    productGrid.innerHTML += `
      <div class="product-card">

        <div class="product-image">
          <img src="${product.image}" alt="${product.name}">
        </div>

        <div class="product-content">
          <h3>${product.name}</h3>
          <div class="price">${product.price}</div>

          <a href="kontakt.html">
            <button class="btn-primary">KAUFEN</button>
          </a>
        </div>

      </div>
    `;
  });
}


/* bild-slider auf der startseite */
const slides = document.querySelectorAll(".slide");
let currentSlide = 0;

function showSlide(index) {
  if (slides.length === 0) return;

  slides[currentSlide].classList.remove("active");
  currentSlide = (index + slides.length) % slides.length;
  slides[currentSlide].classList.add("active");
}

function nextSlide() {
  showSlide(currentSlide + 1);
}

function prevSlide() {
  showSlide(currentSlide - 1);
}

/* automatisch alle 5 sekunden wechseln */
if (slides.length > 0) {
  setInterval(nextSlide, 5000);
}


/* kontaktformular pruefen und bestaetigen */
const kontaktForm = document.getElementById("kontakt-form");

if (kontaktForm) {

  /* spinner und absende-button fuer den ladezustand */
  const spinner = document.getElementById("form-spinner");
  const submitBtn = document.getElementById("submit-btn");

  kontaktForm.addEventListener("submit", function (event) {
    event.preventDefault();

    let isValid = true;

    /* alle eingabefelder holen */
    const name = document.getElementById("name");
    const email = document.getElementById("email");
    const plz = document.getElementById("plz");
    const anliegen = document.getElementById("anliegen");
    const betreff = document.getElementById("betreff");
    const nachricht = document.getElementById("nachricht");
    const datenschutz = document.getElementById("datenschutz");

    /* die passenden fehlermeldungs-felder dazu */
    const nameError = document.getElementById("name-error");
    const emailError = document.getElementById("email-error");
    const plzError = document.getElementById("plz-error");
    const anliegenError = document.getElementById("anliegen-error");
    const betreffError = document.getElementById("betreff-error");
    const nachrichtError = document.getElementById("nachricht-error");
    const datenschutzError = document.getElementById("datenschutz-error");
    const successMsg = document.getElementById("success-msg");

    /* alte erfolgsmeldung entfernen */
    successMsg.textContent = "";

    if (name.value.trim().length < 2) {
      nameError.textContent = "Bitte gib deinen Namen ein (mindestens 2 Zeichen).";
      isValid = false;
    } else {
      nameError.textContent = "";
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email.value.trim())) {
      emailError.textContent = "Bitte gib eine gültige E-Mail-Adresse ein.";
      isValid = false;
    } else {
      emailError.textContent = "";
    }

    /* plz: darf nur aus zahlen bestehen und nicht leer sein */
    const plzNurZahlen = /^[0-9]+$/;

    if (!plzNurZahlen.test(plz.value.trim())) {
      plzError.textContent = "Bitte gib eine gültige Postleitzahl ein (nur Zahlen).";
      isValid = false;
    } else {
      plzError.textContent = "";
    }

    /* anliegen: es muss ein eintrag gewaehlt sein (nicht der leere) */
    if (anliegen.value === "") {
      anliegenError.textContent = "Bitte wähle ein Anliegen aus.";
      isValid = false;
    } else {
      anliegenError.textContent = "";
    }

    if (betreff.value.trim() === "") {
      betreffError.textContent = "Bitte gib einen Betreff ein.";
      isValid = false;
    } else {
      betreffError.textContent = "";
    }

    if (nachricht.value.trim().length < 10) {
      nachrichtError.textContent = "Bitte schreib eine Nachricht (mindestens 10 Zeichen).";
      isValid = false;
    } else {
      nachrichtError.textContent = "";
    }

    if (!datenschutz.checked) {
      datenschutzError.textContent = "Bitte stimme der Datenschutzerklärung zu.";
      isValid = false;
    } else {
      datenschutzError.textContent = "";
    }

    /* nur wenn alle felder ok sind: an das PHP-skript schicken und speichern */
    if (isValid) {

      spinner.hidden = false;     // spinner anzeigen
      submitBtn.disabled = true;  // doppel-absenden verhindern

      /* alle formulardaten einsammeln */
      const formData = new FormData(kontaktForm);

      /* daten per fetch an das backend (PHP) senden */
      fetch("kontakt_speichern.php", {
        method: "POST",
        body: formData
      })
        .then(function (response) {
          return response.json();   // antwort als JSON lesen
        })
        .then(function (data) {
          spinner.hidden = true;       // spinner ausblenden
          submitBtn.disabled = false;  // button wieder aktiv

          if (data.ok) {
            // erfolg: gruene meldung + formular leeren
            successMsg.style.color = "green";
            successMsg.textContent = "Deine Nachricht wurde erfolgreich gesendet! Wir melden uns bald bei dir.";
            kontaktForm.reset();
          } else {
            // server hat einen fehler gemeldet
            successMsg.style.color = "red";
            successMsg.textContent = "Fehler: " + data.msg;
          }
        })
        .catch(function () {
          // netzwerk-/verbindungsfehler
          spinner.hidden = true;
          submitBtn.disabled = false;
          successMsg.style.color = "red";
          successMsg.textContent = "Verbindung zum Server fehlgeschlagen. Bitte später erneut versuchen.";
        });
    }

  });
}


/* ============================================================ */
/* uhren-runner – kleines lauf-spiel auf der ueber-uns-seite     */
/* eigenes vanilla-js im stil des google t-rex-spiels:           */
/* die spielfigur springt ueber uhren, die von rechts kommen     */
/* ============================================================ */

const gameBoard = document.getElementById("uhr-game");

/* das spiel nur aufbauen, wenn das spielfeld existiert           */
/* (also nur auf der ueber-uns-seite, nicht auf den anderen)      */
if (gameBoard) {

  /* benoetigte html-elemente einsammeln */
  const player          = document.getElementById("uhr-game-player");
  const scoreLabel      = document.getElementById("uhr-game-score");
  const highscoreLabel  = document.getElementById("uhr-game-highscore");
  const finalScoreLabel = document.getElementById("uhr-game-finalscore");
  const startOverlay    = document.getElementById("uhr-game-start");
  const overOverlay     = document.getElementById("uhr-game-over");

  /* aktueller zustand: "start" (warten), "running" (laeuft), "over" */
  let gameState = "start";

  /* physik-werte fuer den sprung (in pixel pro sekunde) */
  const gravity   = 1450;   // zieht die figur nach unten
  const jumpPower = 650;    // anfangs-geschwindigkeit beim absprung
  let playerY      = 0;     // hoehe der figur ueber dem boden
  let playerSpeed  = 0;     // aktuelle vertikale geschwindigkeit
  let onGround     = true;  // steht die figur gerade auf dem boden?

  /* hindernisse und tempo */
  let obstacles  = [];      // liste der aktiven uhren-hindernisse
  let spawnTimer = 1.2;     // restzeit bis zum naechsten hindernis (sek)
  const baseSpeed = 320;    // start-tempo der hindernisse (px/sek)

  /* punkte und highscore */
  let score = 0;
  let highscore = Number(localStorage.getItem("uhrGameHighscore")) || 0;
  highscoreLabel.textContent = highscore;

  let lastTime = 0;         // zeitstempel des letzten frames

  function currentSpeed() {
    return Math.min(760, baseSpeed + score * 3);
  }

  const playerInset   = { left: 0.30, right: 0.34, top: 0.12, bottom: 0.15 };
  const obstacleInset = { left: 0.34, right: 0.28, top: 0.24, bottom: 0.30 };

  function visibleBox(rect, inset) {
    const w = rect.right - rect.left;
    const h = rect.bottom - rect.top;
    return {
      left:   rect.left   + w * inset.left,
      right:  rect.right  - w * inset.right,
      top:    rect.top    + h * inset.top,
      bottom: rect.bottom - h * inset.bottom
    };
  }

  function isHit(a, b) {
    return (
      a.left < b.right &&
      a.right > b.left &&
      a.top < b.bottom &&
      a.bottom > b.top
    );
  }

  function jump() {
    if (onGround) {
      playerSpeed = jumpPower;
      onGround = false;
    }
  }

  function spawnObstacle() {
    const uhr = document.createElement("img");
    uhr.src = "assets/images/T-Rex_Game/hindernis_uhr.png";
    uhr.alt = "Uhr als Hindernis";
    uhr.className = "uhr-game-obstacle";
    const startX = gameBoard.clientWidth;   // startet rechts ausserhalb
    uhr.style.left = startX + "px";
    gameBoard.appendChild(uhr);
    obstacles.push({ el: uhr, x: startX });
  }

  function clearObstacles() {
    obstacles.forEach(function (o) { o.el.remove(); });
    obstacles = [];
  }

  function update(delta) {

    /* punkte hochzaehlen (10 punkte pro sekunde) */
    score += delta * 10;
    scoreLabel.textContent = Math.floor(score);

    /* sprung-physik: die schwerkraft bremst/zieht die figur        */
    playerSpeed -= gravity * delta;
    playerY     += playerSpeed * delta;

    /* nicht durch den boden fallen */
    if (playerY <= 0) {
      playerY = 0;
      playerSpeed = 0;
      onGround = true;
    }
    player.style.bottom = (14 + playerY) + "px"; // 14px = boden-abstand

    /* zeit bis zum naechsten hindernis runterzaehlen */
    spawnTimer -= delta;
    if (spawnTimer <= 0) {
      spawnObstacle();
      spawnTimer = Math.max(0.7, 1.6 - score * 0.01) + Math.random() * 0.6;
    }

    /* alle hindernisse nach links bewegen und auf treffer pruefen   */
    const speed = currentSpeed();
    const playerBox = visibleBox(player.getBoundingClientRect(), playerInset);

    for (let i = obstacles.length - 1; i >= 0; i--) {
      const o = obstacles[i];
      o.x -= speed * delta;
      o.el.style.left = o.x + "px";

      if (isHit(playerBox, visibleBox(o.el.getBoundingClientRect(), obstacleInset))) {
        endGame();
        return;
      }

      if (o.x < -80) {
        o.el.remove();
        obstacles.splice(i, 1);
      }
    }
  }

  function loop(timestamp) {
    if (gameState !== "running") return;
    const delta = (timestamp - lastTime) / 1000; // ms -> sekunden
    lastTime = timestamp;
    update(delta);
    if (gameState === "running") {
      requestAnimationFrame(loop);
    }
  }

  function startGame() {
    clearObstacles();
    score = 0;
    playerY = 0;
    playerSpeed = 0;
    onGround = true;
    spawnTimer = 1.2;
    gameState = "running";
    startOverlay.classList.add("uhr-game-hidden");
    overOverlay.classList.add("uhr-game-hidden");
    lastTime = performance.now();
    requestAnimationFrame(loop);
  }

  function endGame() {
    gameState = "over";

    const finalScore = Math.floor(score);
    if (finalScore > highscore) {
      highscore = finalScore;
      localStorage.setItem("uhrGameHighscore", highscore);
      highscoreLabel.textContent = highscore;
    }

    finalScoreLabel.textContent = finalScore;
    overOverlay.classList.remove("uhr-game-hidden");
  }

  function handleInput() {
    if (gameState === "running") {
      jump();
    } else {
      startGame();
    }
  }

  gameBoard.addEventListener("pointerdown", handleInput);

  document.addEventListener("keydown", function (event) {
    if (event.code === "Space" || event.code === "ArrowUp") {
      event.preventDefault();  // verhindert das scrollen der seite
      handleInput();
    }
  });
}