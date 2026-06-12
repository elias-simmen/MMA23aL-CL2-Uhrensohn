<?php
/* =========================================================================
   kontakt_speichern.php
   Nimmt die Kontaktformular-Daten entgegen und speichert sie in "Kontakt".
   ========================================================================= */

header('Content-Type: application/json; charset=utf-8');

/* ---- 1. Datenbank-Zugangsdaten (wie in index.php) -------------------- */
$host = 'localhost';  
$port = 3306;                        
$db   = 'fabio-alverde_';        
$user = 'fabio-alverde-1';          
$pass = 'Y.8rbcViYA:2.J3';      

/* ---- 2. Nur POST-Anfragen zulassen ------------------------------------ */
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    echo json_encode(['ok' => false, 'msg' => 'Ungueltige Anfrage.']);
    exit;
}

/* ---- 3. Eingaben einlesen --------------------------------------------- */
$vorname     = trim($_POST['vorname']     ?? '');
$nachname    = trim($_POST['nachname']    ?? '');
$email       = trim($_POST['email']       ?? '');
$plz         = trim($_POST['plz']         ?? '');
$ort         = trim($_POST['ort']         ?? '');
$anliegen    = trim($_POST['anliegen']    ?? '');
$betreff     = trim($_POST['betreff']     ?? '');
$nachricht   = trim($_POST['nachricht']   ?? '');
$datenschutz = isset($_POST['datenschutz']) ? 1 : 0;

/* ---- 4. Serverseitig pruefen ------------------------------------------ */
$fehler = [];

if (mb_strlen($vorname) < 2)                    $fehler[] = 'Vorname zu kurz.';
if (mb_strlen($nachname) < 2)                   $fehler[] = 'Nachname zu kurz.';
if (!filter_var($email, FILTER_VALIDATE_EMAIL)) $fehler[] = 'E-Mail ungueltig.';
if (!preg_match('/^[0-9]+$/', $plz))            $fehler[] = 'PLZ ungueltig.';
if ($ort === '')                                $fehler[] = 'Ort fehlt.';
if ($anliegen === '')                           $fehler[] = 'Anliegen fehlt.';
if ($betreff === '')                            $fehler[] = 'Betreff fehlt.';
if (mb_strlen($nachricht) < 10)                 $fehler[] = 'Nachricht zu kurz.';
if ($datenschutz !== 1)                         $fehler[] = 'Datenschutz nicht akzeptiert.';

if (!empty($fehler)) {
    echo json_encode(['ok' => false, 'msg' => implode(' ', $fehler)]);
    exit;
}

/* ---- 5. In die Datenbank speichern ------------------------------------ */
try {
    $pdo = new PDO(
        "mysql:host=$host;port=$port;dbname=$db;charset=utf8mb4",
        $user,
        $pass
    );
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    $sql = "INSERT INTO Kontakt (Vorname, Nachname, Email, PLZ, Ort, Anliegen, Betreff, Nachricht, Datenschutz)
            VALUES (:vorname, :nachname, :email, :plz, :ort, :anliegen, :betreff, :nachricht, :datenschutz)";

    $stmt = $pdo->prepare($sql);
    $stmt->execute([
        ':vorname'     => $vorname,
        ':nachname'    => $nachname,
        ':email'       => $email,
        ':plz'         => $plz,
        ':ort'         => $ort,
        ':anliegen'    => $anliegen,
        ':betreff'     => $betreff,
        ':nachricht'   => $nachricht,
        ':datenschutz' => $datenschutz,
    ]);

    echo json_encode(['ok' => true, 'msg' => 'Nachricht gespeichert.']);

} catch (PDOException $e) {
    echo json_encode(['ok' => false, 'msg' => 'Speichern fehlgeschlagen: ' . $e->getMessage()]);
}