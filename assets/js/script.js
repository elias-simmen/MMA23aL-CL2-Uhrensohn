/* =========================
   PRODUKTE
========================= */

/*
Hier erstelln wir die Uebersicht zu den Uhren, die auf der Startseite promoted werden. Jede Uhr weist folgende Eigenschaften auf:
-> Namen (zB Tissot PRX Powermatic 80)
-> Preis (zB CHF 895.00)
*/

const products = [

  {
    name: "Uhr 1",
    price: "Der Preis folgt noch!"
  },

  {
    name: "Uhr 2",
    price: "Der Preis folgt noch!"
  },

  {
    name: "Uhr 3",
    price: "Der Preis folgt noch!"
  },

  {
    name: "Uhr 4",
    price: "Der Preis folgt noch!"
  }

];

/*
Hier holen wir das HTML-Element
mit der ID "product-grid".

Dort werden später die Produkte eingefügt.
*/

const grid = document.getElementById("product-grid");

/*
forEach geht jedes Produkt einzeln durch.

Für jedes Produkt wird automatisch
eine Produktkarte erstellt.
*/

products.forEach(product => {

  /*
  innerHTML += fügt neuen HTML-Code
  in das Grid ein.
  */

  grid.innerHTML += `

    <!-- Einzelne Produktkarte -->
    <div class="product-card">

      <!-- Platzhalter für Produktbild -->
      <div class="product-image">

        Bild folgt bald!

      </div>

      <!-- Produktinhalt -->
      <div class="product-content">

        <!-- Produktname -->
        <h3>

          ${product.name}

        </h3>

        <!-- Produktpreis -->
        <div class="price">

          ${product.price}

        </div>

        <!-- Kaufen Button -->
        <button class="btn-primary">

          KAUFEN

        </button>

      </div>

    </div>

  `;
});

/* =========================
   SLIDER
========================= */

/*
Hier holen wir alle Elemente
mit der Klasse "slide".
*/

const slides = document.querySelectorAll(".slide");

/*
currentSlide speichert,
welcher Slide gerade sichtbar ist.

0 = erster Slide
*/

let currentSlide = 0;

/* =========================
   NÄCHSTER SLIDE
========================= */

function nextSlide() {

  /*
  Entfernt die Klasse "active"
  vom aktuellen Slide.
  */

  slides[currentSlide].classList.remove("active");

  /*
  Wechselt zum nächsten Slide.
  */

  currentSlide++;

  /*
  Wenn wir beim letzten Slide angekommen sind,
  starten wir wieder bei 0.
  */

  if(currentSlide >= slides.length) {

    currentSlide = 0;
  }

  /*
  Neuer Slide wird sichtbar gemacht.
  */

  slides[currentSlide].classList.add("active");
}

/* =========================
   VORHERIGER SLIDE
========================= */

function prevSlide() {

  /*
  Aktiven Slide ausblenden.
  */

  slides[currentSlide].classList.remove("active");

  /*
  Einen Slide zurückgehen.
  */

  currentSlide--;

  /*
  Wenn wir vor dem ersten Slide sind,
  springen wir zum letzten.
  */

  if(currentSlide < 0) {

    currentSlide = slides.length - 1;
  }

  /*
  Neuen Slide sichtbar machen.
  */

  slides[currentSlide].classList.add("active");
}

/* =========================
   AUTOMATISCHER WECHSEL
========================= */

/*
setInterval führt eine Funktion
automatisch alle X Millisekunden aus.

5000ms = 5 Sekunden
*/

setInterval(nextSlide, 5000);
