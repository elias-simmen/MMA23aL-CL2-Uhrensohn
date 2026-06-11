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


/* kontaktformular pruefen */
const kontaktForm = document.getElementById("kontakt-form");

if (kontaktForm) {
  kontaktForm.addEventListener("submit", function (event) {
    event.preventDefault();

    let isValid = true;

    const name = document.getElementById("name");
    const email = document.getElementById("email");
    const betreff = document.getElementById("betreff");
    const nachricht = document.getElementById("nachricht");
    const datenschutz = document.getElementById("datenschutz");

    const nameError = document.getElementById("name-error");
    const emailError = document.getElementById("email-error");
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

    if (isValid) {
      successMsg.textContent = "Deine Nachricht wurde erfolgreich gesendet! Wir melden uns bald bei dir.";
      kontaktForm.reset();
    }
  });
}