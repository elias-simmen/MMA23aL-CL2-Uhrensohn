<?php
/* =========================================================================
   kontakt_speichern.php
   -------------------------------------------------------------------------
   Nimmt die Daten vom Kontaktformular entgegen (per fetch aus script.js)
   und speichert sie sicher in der Tabelle "Kontakt".
   Antwortet mit JSON, damit das JavaScript Erfolg/Fehler erkennt.
   ========================================================================= */

header('Content-Type: application/json; charset=utf-8');

/* ---- 1. Datenbank-Zugangsdaten (wie in index.php) -------------------- */
$host = 'localhost';
$port = 3306;
$db   = 'fabio-alverde_';
$user = 'fabio-alverde';
$pass = 'Y.8rbcViYA:2.J3';   // <-- dasselbe Passwort wie in index.php eintragen

/* ---- 2. Nur POST-Anfragen zulassen ----------------------------------- */
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    echo json_encode(['ok' => false, 'msg' => 'Ungültige Anfrage.']);
    exit;
}

/* ---- 3. Eingaben einlesen und Leerzeichen entfernen ------------------ */
$name        = trim($_POST['name']        ?? '');
$email       = trim($_POST['email']       ?? '');
$plz         = trim($_POST['plz']         ?? '');
$anliegen    = trim($_POST['anliegen']    ?? '');
$betreff     = trim($_POST['betreff']     ?? '');
$nachricht   = trim($_POST['nachricht']   ?? '');
$datenschutz = isset($_POST['datenschutz']) ? 1 : 0;

/* ---- 4. Serverseitig pruefen (gleiche Regeln wie im JavaScript) ------ */
/*        Wichtig: niemals nur dem Browser vertrauen!                     */
$fehler = [];

if (mb_strlen($name) < 2)                                   $fehler[] = 'Name zu kurz.';
if (!filter_var($email, FILTER_VALIDATE_EMAIL))             $fehler[] = 'E-Mail ungültig.';
if (!preg_match('/^[0-9]+$/', $plz))                        $fehler[] = 'PLZ ungültig.';
if ($anliegen === '')                                       $fehler[] = 'Anliegen fehlt.';
if ($betreff === '')                                        $fehler[] = 'Betreff fehlt.';
if (mb_strlen($nachricht) < 10)                             $fehler[] = 'Nachricht zu kurz.';
if ($datenschutz !== 1)                                     $fehler[] = 'Datenschutz nicht akzeptiert.';

if (!empty($fehler)) {
    echo json_encode(['ok' => false, 'msg' => implode(' ', $fehler)]);
    exit;
}

/* ---- 5. In die Datenbank speichern (mit Prepared Statement) ---------- */
/*        Prepared Statements schuetzen vor SQL-Injection.                */
try {
    $pdo = new PDO(
        "mysql:host=$host;port=$port;dbname=$db;charset=utf8mb4",
        $user,
        $pass
    );
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    $sql = "INSERT INTO Kontakt (Name, Email, PLZ, Anliegen, Betreff, Nachricht, Datenschutz)
            VALUES (:name, :email, :plz, :anliegen, :betreff, :nachricht, :datenschutz)";

    $stmt = $pdo->prepare($sql);
    $stmt->execute([
        ':name'        => $name,
        ':email'       => $email,
        ':plz'         => $plz,
        ':anliegen'    => $anliegen,
        ':betreff'     => $betreff,
        ':nachricht'   => $nachricht,
        ':datenschutz' => $datenschutz,
    ]);

    echo json_encode(['ok' => true, 'msg' => 'Nachricht gespeichert.']);

} catch (PDOException $e) {
    // Im Schulprojekt ok; auf echten Seiten Fehler lieber nur loggen.
    echo json_encode(['ok' => false, 'msg' => 'Speichern fehlgeschlagen: ' . $e->getMessage()]);
}
