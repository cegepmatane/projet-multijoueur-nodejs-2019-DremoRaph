<?php
$usager = 'multijoueur';
$motdepasse = 'multijoueur';
$hote = 'localhost';
$base = 'multijoueur';
$dsn = 'mysql:dbname='.$base.';host=' . $hote. '';
$basededonnees = new PDO($dsn,$usager, $motdepasse);
$demandeConseil = $basededonnees->prepare("SELECT COUNT(*) FROM `conseil`");
$demandeConseil->execute();
$nombreConseils = $demandeConseil->fetch(PDO::FETCH_BOTH);
//print_r($nombreConseils);
$demandeConseil = $basededonnees->prepare("SELECT * FROM `conseil` WHERE id =". rand(1, $nombreConseils[0]));
$demandeConseil->execute();
$conseilChoisi = $demandeConseil->fetchAll(PDO::FETCH_BOTH);
echo ("{\"conseil\": \"".$conseilChoisi[0]['texte'] . "\"}");