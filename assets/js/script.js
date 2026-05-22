/* =========================
   UHRENSOHN – script.js
   Wird auf ALLEN Seiten eingebunden.
   Enthält: Hamburger-Menü, aktiver Nav-Link,
   Produkt-Grid, Slider, Formular-Validierung.
========================= */


/* =========================
   HAMBURGER MENÜ
   Klappt die Navigation auf Mobile auf/zu.
========================= */

/*
  DOM-ZUGRIFF: JavaScript holt HTML-Elemente mit diesen Methoden:

  document.getElementById("id")
    → holt EIN Element anhand seiner id=""
    → gibt null zurück wenn nicht gefunden

  document.querySelectorAll(".klasse")
    → holt ALLE Elemente mit der Klasse (wie CSS-Selektor)
    → gibt eine Liste zurück (auch wenn leer)

  const = Konstante: Wert wird einmal gesetzt und nicht mehr geändert.
  let   = Variable: Wert kann später geändert werden (z.B. currentSlide).
*/

/* Die beiden Elemente aus dem HTML holen */
const hamburgerBtn = document.getElementById("hamburger-btn");
const navLinksList = document.getElementById("nav-links");

/* Nur ausführen wenn beide Elemente vorhanden sind */
if (hamburgerBtn && navLinksList) {

  /*
    addEventListener("click", ...) → lauscht auf Klicks auf den Button.
    Sobald geklickt, wird die Funktion ausgeführt.
  */
  hamburgerBtn.addEventListener("click", function () {

    /* classList.toggle() fügt die Klasse hinzu,
       wenn sie fehlt – und entfernt sie, wenn sie da ist. */
    hamburgerBtn.classList.toggle("open");
    navLinksList.classList.toggle("open");

  });

}


/* =========================
   AKTIVER NAV-LINK
   Der Link zur aktuellen Seite wird goldfarben hervorgehoben.
   Das macht das JavaScript automatisch, indem es die URL prüft.
========================= */

/* Alle Links mit der Klasse "nav-link" holen */
const allNavLinks = document.querySelectorAll(".nav-link");

/* Jeden Link prüfen */
allNavLinks.forEach(function (link) {

  /* Wenn der Link-Ziel (href) zur aktuellen URL passt */
  if (link.href === window.location.href) {

    /* Klasse "active" hinzufügen → Link wird goldfarben */
    link.classList.add("active");

  }

});


/* =========================
   PRODUKTE
   Erstellt automatisch die Produktkarten
   für das Raster auf der Startseite und Sortiment-Seite.
========================= */

/*
  Hier sind die Produkt-Daten gespeichert.
  Jedes Produkt hat:
    - name:  Bezeichnung der Uhr
    - price: Preis in CHF
  Um ein Produkt hinzuzufügen: einfach { name: "...", price: "..." } einfügen.
*/

const products = [
  { name: "Tissot PRX Powermatic 80",   price: "CHF 895.00"   },
  { name: "Rolex Oyster Perpetual",     price: "CHF 8'550.00" },
  { name: "Omega Seamaster Aqua Terra", price: "CHF 4'200.00" },
  { name: "IWC Pilot's Watch",          price: "CHF 5'900.00" }
];

/* Das Grid-Element aus dem HTML holen */
const productGrid = document.getElementById("product-grid");

/* Nur ausführen wenn das Grid auf dieser Seite vorhanden ist */
if (productGrid) {

  /*
    forEach() geht jeden Eintrag des Arrays einzeln durch.
    Bei jedem Durchgang hat "product" den Wert des aktuellen Eintrags,
    also z.B. { name: "Tissot PRX...", price: "CHF 895.00" }
  */
  products.forEach(function (product) {

    /*
      innerHTML += fügt neuen HTML-Code ans Ende des Grid-Elements.
      Das Backtick-String (`) heisst "Template Literal" und erlaubt:
        1. Mehrzeiligen Text ohne + Verknüpfung
        2. Variablen direkt einfügen mit ${variable}
      ${product.name} wird automatisch durch den Produktnamen ersetzt.
    */
    productGrid.innerHTML += `

      <!-- Produktkarte -->
      <div class="product-card">

        <!-- Bild-Platzhalter: Bild hier selber in VS Code einfügen -->
        <!-- Beispiel: <img src="assets/images/uhr1.jpg" alt="Uhrname"> -->
        <div class="product-image">
          Bild hier einfügen
        </div>

        <!-- Inhalt -->
        <div class="product-content">

          <h3>${product.name}</h3>

          <div class="price">${product.price}</div>

          <button class="btn-primary">KAUFEN</button>

        </div>

      </div>

    `;

  });

}


/* =========================
   SLIDER
   Wechselt automatisch und per Knopfdruck
   zwischen den Slides im Hero-Bereich.
========================= */

/* Alle Slides holen */
const slides = document.querySelectorAll(".slide");

/* Speichert welcher Slide gerade sichtbar ist (0 = erster) */
let currentSlide = 0;

/*
  nextSlide() und prevSlide() werden direkt im HTML aufgerufen:
  <button onclick="nextSlide()">
  Deshalb müssen sie hier global (ausserhalb von if-Blöcken) stehen.
*/

/* Zum nächsten Slide wechseln */
function nextSlide() {
  if (slides.length === 0) return; /* kein Slider auf dieser Seite */

  slides[currentSlide].classList.remove("active");

  /*
    % = Modulo (Rest der Division).
    Beispiel mit 3 Slides: (2 + 1) % 3 = 0 → springt zum ersten Slide zurück.
    So entsteht ein endloser Kreislauf ohne if-Abfrage.
  */
  currentSlide = (currentSlide + 1) % slides.length;

  slides[currentSlide].classList.add("active");
}

/* Zum vorherigen Slide wechseln */
function prevSlide() {
  if (slides.length === 0) return;

  slides[currentSlide].classList.remove("active");

  /* + slides.length verhindert negative Zahlen */
  currentSlide = (currentSlide - 1 + slides.length) % slides.length;

  slides[currentSlide].classList.add("active");
}

/* Automatisch alle 5 Sekunden weiterschalten */
if (slides.length > 0) {
  setInterval(nextSlide, 5000);
}


/* =========================
   FORMULAR-VALIDIERUNG (Kontakt-Seite)

   VALIDIERUNGSKONZEPT (Dokumentation für den Lehrer):

   Feld 1 – Name (input type="text")
     Regel:    Pflichtfeld, mindestens 2 Zeichen
     Warum:    Leerer String oder Einzelbuchstabe ist kein echter Name

   Feld 2 – E-Mail (input type="text" mit novalidate)
     Regel:    Pflichtfeld, muss gültiges E-Mail-Format haben (x@x.x)
     Warum:    Ohne korrektes Format können wir die Antwort nicht senden
     Methode:  Regulärer Ausdruck (RegEx) prüft das Format

   Feld 3 – Betreff (input type="text")
     Regel:    Pflichtfeld, darf nicht leer sein
     Warum:    Wir müssen wissen, worum es geht

   Feld 4 – Nachricht (textarea)
     Regel:    Pflichtfeld, mindestens 10 Zeichen
     Warum:    Eine zu kurze Nachricht ("hi", "ok") ist nicht hilfreich

   Feld 5 – Datenschutz (input type="checkbox")
     Regel:    Pflichtfeld, muss angehakt sein
     Warum:    Rechtliche Anforderung – ohne Zustimmung dürfen wir
               die Daten nicht verarbeiten
========================= */

/* Formular-Element holen */
const kontaktForm = document.getElementById("kontakt-form");

/* Nur ausführen wenn das Formular auf dieser Seite existiert */
if (kontaktForm) {

  /*
    addEventListener("submit", ...) → lauscht auf das Absenden des Formulars.
    Sobald der Submit-Button geklickt wird, wird die Funktion ausgeführt.
  */
  kontaktForm.addEventListener("submit", function (event) {

    /*
      event.preventDefault() → verhindert das normale Formular-Absenden.
      Normalerweise würde der Browser die Seite neu laden und die Daten senden.
      Mit preventDefault() übernehmen wir selbst die Kontrolle.
    */
    event.preventDefault();

    /* Startet als "alles gültig" – wird auf false gesetzt sobald ein Fehler auftritt */
    let isValid = true;


    /* ---- Feld 1: Name ---- */

    const nameInput  = document.getElementById("name");
    const nameError  = document.getElementById("name-error");

    /*
      .value      → der eingegebene Text des Feldes
      .trim()     → entfernt Leerzeichen am Anfang und Ende (verhindert " " als gültige Eingabe)
      .length     → Anzahl der Zeichen
      < 2         → weniger als 2 Zeichen = ungültig
    */
    if (nameInput.value.trim().length < 2) {

      /* Zu kurz oder leer: Fehlermeldung anzeigen */
      nameError.textContent = "Bitte gib deinen Namen ein (mindestens 2 Zeichen).";
      isValid = false;

    } else {

      /* Gültig: Fehlermeldung entfernen */
      nameError.textContent = "";

    }


    /* ---- Feld 2: E-Mail ---- */

    const emailInput = document.getElementById("email");
    const emailError = document.getElementById("email-error");

    /*
      Regulärer Ausdruck (RegEx) für E-Mail-Prüfung:
      ^         = Anfang
      [^\s@]+   = ein oder mehr Zeichen (kein Leerzeichen, kein @)
      @         = das @-Zeichen muss vorkommen
      [^\s@]+   = wieder Zeichen
      \.        = ein Punkt muss vorkommen
      [^\s@]+   = noch mehr Zeichen
      $         = Ende
    */
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(emailInput.value.trim())) {

      emailError.textContent = "Bitte gib eine gültige E-Mail-Adresse ein (z.B. name@mail.ch).";
      isValid = false;

    } else {

      emailError.textContent = "";

    }


    /* ---- Feld 3: Betreff ---- */

    const betreffInput = document.getElementById("betreff");
    const betreffError = document.getElementById("betreff-error");

    if (betreffInput.value.trim() === "") {

      betreffError.textContent = "Bitte gib einen Betreff ein.";
      isValid = false;

    } else {

      betreffError.textContent = "";

    }


    /* ---- Feld 4: Nachricht ---- */

    const nachrichtInput = document.getElementById("nachricht");
    const nachrichtError = document.getElementById("nachricht-error");

    if (nachrichtInput.value.trim().length < 10) {

      nachrichtError.textContent = "Bitte schreib eine Nachricht (mindestens 10 Zeichen).";
      isValid = false;

    } else {

      nachrichtError.textContent = "";

    }


    /* ---- Feld 5: Datenschutz-Checkbox ---- */

    const datenschutzInput = document.getElementById("datenschutz");
    const datenschutzError = document.getElementById("datenschutz-error");

    if (!datenschutzInput.checked) {

      datenschutzError.textContent = "Bitte stimme der Datenschutzerklärung zu.";
      isValid = false;

    } else {

      datenschutzError.textContent = "";

    }


    /* ---- Alle Felder gültig: Erfolgsmeldung zeigen ---- */

    if (isValid) {

      const successMsg = document.getElementById("success-msg");
      successMsg.textContent = "Deine Nachricht wurde erfolgreich gesendet! Wir melden uns bald bei dir.";

      /* Formular leeren */
      kontaktForm.reset();

    }

  });

}
