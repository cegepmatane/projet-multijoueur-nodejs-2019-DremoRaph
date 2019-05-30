(function(){
   

    const VIES_DE_BASE = 100;
    const NOMBRE_JOUEURS_REQUIS = 2;
    var multiNode;
    var projectile;
    var vueAccueil;
    var vueCombat;
    var vueFinPartie;
    var listeJoueur;
    var positionJoueur;
    var pseudonymeJoueur;
    var pseudonymeAutreJoueur;
    var joueur;
    var autreJoueur;
    var ennemi;
    var derniereValeurTemporelleMilliseconde;
    var actionTour;
    var boutonAttaque;
    var action1;
    var action2;
    var actionPrise;
    (function initialiser()
    {
        multiNode = new MultiNode();
        multiNode.confirmerConnexion = confirmerConnexion;
        multiNode.confirmerAuthentification = confirmerAuthentification;
        multiNode.apprendreAuthentification = apprendreAuthentification;
        multiNode.recevoirVariable = recevoirVariable;
        multiNode.connecter();
        listeJoueur = {};
        vueCombat = VUE.combat;
        vueAccueil = VUE.Accueil;
        vueAccueil.afficher();
        actionTour = 0;
        action1 = "";
        action2 = "";
        actionPrise = false;
        //projectile = new MODELE.Balle(0, 0, ballePositionCentreX, ballePositionCentreY);
        //document.addEventListener("DOMContentLoaded", preparerJeu);
        
        document.addEventListener("DOMContentLoaded", initialiserVue);
        
       

    })();  
    
    
    function initialiserVue(evenement){

        console.log("Loadé!!");
        window.addEventListener("hashchange", naviguer);
        formulaireAuthentification = document.getElementById("formulaire-authentification");
        formulaireAuthentification.addEventListener("submit", authentifierJoueur);
        boutonAuthentification = document.getElementById("bouton-authentification");
        pseudonyme = document.getElementById("pseudonyme");
        chargerJoke();
        


    }

    function chargerJoke() 
	{
		//console.log('chargerJoke()');
        var requete = new XMLHttpRequest();
        var champ = document.getElementById("champ-joke");
        var punchline = document.getElementById("champ-punchline");
		requete.overrideMimeType("application/json");
		requete.open('GET', 'https://official-joke-api.appspot.com/random_joke', true); 
		requete.onreadystatechange = function () {
			  if (requete.readyState == 4 && requete.status == "200") {
                    var objet = JSON.parse(requete.responseText);
                    //console.log(objet.setup);
                    champ.innerHTML = objet.setup;
                    punchline.innerHTML = objet.punchline;
			  }
		};
		requete.send(null);  
	}
	

    

    function confirmerConnexion()
    {
        console.log("Je suis connecté.");
        //multiNode.demanderAuthentification("joueur " + Date.now());
        
    }

    function authentifierJoueur(evenement)
    {
        console.log("authentifierJoueur()");
        evenement.preventDefault();

        pseudonymeJoueur = pseudonyme.value;

        multiNode.demanderAuthentification(pseudonymeJoueur);

        boutonAuthentification.disabled = true;
        boutonAuthentification.value = "Attente d'un autre joueur...";
        
        
    }

    function confirmerAuthentification(autresParticipants){

        console.log("Je suis authentifié.");
        console.log("Les autres participants sont " + JSON.stringify(autresParticipants));
        if(JSON.stringify(autresParticipants) == "[]")
        {
            positionJoueur = 1;
        } else {
            positionJoueur = 2;
        }
        ajouterJoueur(pseudonymeJoueur);

        for (index = 0; index < autresParticipants.length; ++index) {
            ajouterJoueur(autresParticipants[index]);
        }

        //multiNode.posterVariableTextuelle("nom-var","Oof");
        verifierDebutPartie();

    }

    function ajouterJoueur(nouveauPseudonymeJoueur){

        console.log("ajouterJoueur() : " + nouveauPseudonymeJoueur);
        listeJoueur[nouveauPseudonymeJoueur] =
            {
                pointsDeVie : VIES_DE_BASE
            };
        

    }

    function apprendreAuthentification(pseudonyme){

        console.log("Nouvel ami " + pseudonyme);
        ajouterJoueur(pseudonyme);
        verifierDebutPartie();

    }
    function verifierDebutPartie()
    {
        var nombreJoueur = Object.keys(listeJoueur).length;
        if(nombreJoueur == NOMBRE_JOUEURS_REQUIS){
            
            debuterPartie();

        }
    }
    function debuterPartie(){

        pseudonymeAutreJoueur = identifierAutreJoueur();
        if(positionJoueur == 1)
        {
            joueur = new MODELE.Joueur1(200,30,50);
            autreJoueur = new MODELE.Joueur2(300,35,20);
            ennemi = new MODELE.Ennemi();
            multiNode.posterVariableTextuelle("ennemi", ennemi.stats);

        } else {
            joueur = new MODELE.Joueur2(300,35,20);
            autreJoueur = new MODELE.Joueur1(200,30,50);
            ennemi = new MODELE.Ennemi();
        }
        
        //pointDeVieAutreJoueur.value = listeJoueur[pseudonymeAutreJoueur].parametresDeJeu;

        //pointDeVie.value = listeJoueur[pseudonymeJoueur].pointDeVie;

        //formulaireJeu.style.display = "block";
        window.location.hash = "#jouer";


    }

    

    function identifierAutreJoueur(){

        for (var clePseudonyme in listeJoueur) {

            if(clePseudonyme.indexOf(pseudonymeJoueur) < 0){

                return clePseudonyme;

            }

        }

    }

    function recevoirVariable(variable){

        console.log("Surcharge de recevoirVariable " + variable.cle + " = " + variable.valeur);

        switch (variable.cle) {
            case "carre":
                console.log(variable.valeur);
                //var template = JSON.parse(variable.valeur);
                vueCombat.dessinerCarre(variable.valeur.hauteur,variable.valeur.largeur);
            break;

            case "ennemi":
                console.log(variable.valeur);
                //ennemi = new MODELE.Ennemi();
                ennemi.setStats(variable.valeur);
                if(positionJoueur == 1){
                    vueCombat.rafraichirStats(joueur,autreJoueur,ennemi);
                } else {
                    vueCombat.rafraichirStats(autreJoueur,joueur,ennemi);
                };
            break;

            case "attaque":
                console.log(variable.valeur);
                
                actionTour++;
                if(actionTour == 3){
                actionTour = 0;
                effectuerTour(variable.valeur);
                
                }else{
                    stockerTour(variable.valeur);
                }
                
                

            

        }


    }

    function effectuerTour(attaqueEnnemi)
    {
        var action1Separe = action1.split("/");
        var action2Separe = action2.split("/");
        vueCombat.remplirLog(action1Separe[1] + " attaque l'ennemi pour " + action1Separe[0] + " points de degats!");
        ennemi.blesser(action1Separe[0]);
        vueCombat.remplirLog(action2Separe[1] + " attaque l'ennemi pour " + action2Separe[0] + " points de degats!");
        ennemi.blesser(action2Separe[0]);
        var tourEnnemi = attaqueEnnemi.split("/");
        var choixEnnemi = tourEnnemi[1];
        var degatsEnnemi = tourEnnemi[0];
        if(choixEnnemi == 1){
            if(positionJoueur == 1)
            {
                vueCombat.remplirLog("L'ennemi attaque " + pseudonymeJoueur + " pour " + degatsEnnemi + " points de degats!");
                joueur.blesser(degatsEnnemi);
            }else{
                vueCombat.remplirLog("L'ennemi attaque " + pseudonymeAutreJoueur + " pour " + degatsEnnemi + " points de degats!");
                autreJoueur.blesser(degatsEnnemi);
            }
            
        } else {
            if(positionJoueur == 1)
            {
                
                vueCombat.remplirLog("L'ennemi attaque " + pseudonymeAutreJoueur + " pour " + degatsEnnemi + " points de degats!");
                autreJoueur.blesser(degatsEnnemi);
            }else{
                vueCombat.remplirLog("L'ennemi attaque " + pseudonymeJoueur + " pour " + degatsEnnemi + " points de degats!");
                joueur.blesser(degatsEnnemi);
            }
        }
        if(positionJoueur == 1){
            vueCombat.rafraichirStats(joueur,autreJoueur,ennemi);
        } else {
            vueCombat.rafraichirStats(autreJoueur,joueur,ennemi);
        }
        action1 = "";
        action2 = "";
        actionPrise = false;
        verifierFinPartie();
        
    }

    function verifierFinPartie()
    {

    if(ennemi.verifierMort())
    {
        window.location.hash = "#fin-partie-gagnee";
    }else if(joueur.verifierMort() || autreJoueur.verifierMort())
        {
            window.location.hash = "#fin-partie-perdue";
        }

    }
    function stockerTour(tour)
    {
        if(actionTour == 1){
            action1 = tour;
        } else if(actionTour == 2){
            action2 = tour;
            
        }
    }
    function naviguer(evenement)
    {
        
        var hash = window.location.hash;
        
        if(hash.match(/^#accueil/))
        {
            naviguerVueAccueil();
        }else if(hash.match(/^#jouer/))
        {
            naviguerVueJeu();   
        }else if(hash.match(/^#fin-partie-gagnee/))
        {
            naviguerVueFinPartie(true);   
        }else if(hash.match(/^#fin-partie-perdue/)){
            naviguerVueFinPartie(false);
        }else{
            naviguerVueAccueil();
        }
        
    }
    function naviguerVueAccueil()
    {
        initialiser();
        //vueAccueil.afficher();
    }
    
    function naviguerVueJeu()
    {
        console.log("naviguerVueJeu()");
        if(positionJoueur == 1)
        {
            vueCombat.afficher(positionJoueur, joueur, autreJoueur, ennemi);
        } else {
            vueCombat.afficher(positionJoueur, autreJoueur, joueur, ennemi);
        }
        boutonAttaque = document.getElementById("bouton-attaque");
        boutonAttaque.addEventListener("click", actionAttaque);
        
        
    }

    function actionAttaque()
    {
        if(actionPrise == false)
        {
            var degatsCalculés = Math.floor((Math.random() * vueCombat.getAttaque(positionJoueur)) + 10);
            multiNode.posterVariableTextuelle("attaque", degatsCalculés +"/"+ pseudonymeJoueur);
            if(actionTour == 1)
            {
                multiNode.posterVariableTextuelle("attaque", Math.floor((Math.random() * vueCombat.getAttaque(3)) + 0) + "/" + Math.floor((Math.random() * 2) + 1));
            }
            actionPrise = true;
        } else {
            vueCombat.remplirLog("Veuillez attendre le tour de l'autre joueur!!!")
        }
        
    }
    function naviguerVueFinPartie(gagnee)
    {
        vueFinPartie = VUE.FinPartie;
        vueFinPartie.afficher(gagnee);
    }
    /*
    function preparerJeu()
    {
        preparerRafraichissementEcran();
        
    }

    function mettreAJourJeuMultijoueur(deltaValeurTemporelleMilliseconde) 
    {
        
        
        
    } */

    

    function preparerRafraichissementEcran(valeurTemporelleMilliseconde) {

        // we get passed a timestamp in milliseconds
        // we use it to determine how much time has passed since the last call
        if (derniereValeurTemporelleMilliseconde) {

          //mettreAJourJeu((valeurTemporelleMilliseconde-derniereValeurTemporelleMilliseconde)/1000); // call update and pass delta time in seconds
          mettreAJourJeuMultijoueur((valeurTemporelleMilliseconde-
                                     derniereValeurTemporelleMilliseconde)
                                     /1000); // call update and pass delta time in seconds

        }
        
        derniereValeurTemporelleMilliseconde = valeurTemporelleMilliseconde;
        animationFrame = requestAnimationFrame(preparerRafraichissementEcran);

      }
})();