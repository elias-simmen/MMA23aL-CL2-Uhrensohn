<?php

$host = 'localhost';  
$port = 3306;                        
$db   = 'fabio-alverde_';        
$user = 'fabio-alverde-1';          
$pass = 'Y.8rbcViYA:2.J3';          

try {
    // Verbindung zur Datenbank aufbauen (PDO = PHP Data Objects)
    $pdo = new PDO(
        "mysql:host=$host;port=$port;dbname=$db;charset=utf8mb4",
        $user,
        $pass
    );
    // Bei Fehlern eine Exception werfen, damit man Probleme sieht
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch (PDOException $e) {
    die('Verbindung fehlgeschlagen: ' . $e->getMessage());
}

/* =========================================================================
   DATEN ABFRAGEN
   ========================================================================= */
$stmt = $pdo->query("SELECT `E-Mail`, Vorname, Nachname FROM Kunde");
$rows = $stmt->fetchAll(PDO::FETCH_ASSOC);

$pdo = null; // Verbindung schliessen
?>
<!DOCTYPE html>
<html lang="de">
<head>
    <meta charset="utf-8">
    <title>Kunden</title>
    <style>
        body   { font-family: Arial, sans-serif; margin: 40px; }
        h1     { color: #222; }
        table  { border-collapse: collapse; }
        th, td { border: 1px solid #999; padding: 6px 12px; text-align: left; }
        th     { background: #f0f0f0; }
    </style>
</head>
<body>
    <h1>Kundenliste</h1>

    <table border="1" cellpadding="6" cellspacing="0">
        <tr>
            <th>E-Mail</th>
            <th>Vorname</th>
            <th>Nachname</th>
        </tr>

        <?php foreach ($rows as $row): ?>
            <tr>
                <!-- htmlspecialchars() schuetzt vor schaedlichem Code (XSS) -->
                <td><?= htmlspecialchars($row['E-Mail']) ?></td>
                <td><?= htmlspecialchars($row['Vorname']) ?></td>
                <td><?= htmlspecialchars($row['Nachname']) ?></td>
            </tr>
        <?php endforeach; ?>
    </table>

</body>
</html>
