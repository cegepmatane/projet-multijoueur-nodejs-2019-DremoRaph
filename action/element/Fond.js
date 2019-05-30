var Fond = function(nouveauCanevas){

    var canevas;
    var couleur;
    var affichageHaut;
    var affichageBas;
    var colone1;
    var colone2;
    var ligne1;
    var ligne2;
    var ligne3;
    var bord;
    var indicateurJoueur;
    var separation;
    var encadreBouton1;
    function initialiser(){

        canevas = nouveauCanevas;

        couleur1 = '#95a7c4';
        couleur2 = '#3d4f6d';
        colone1 = canevas.width() * 0.025;
        colone2 = (canevas.width() - canevas.width() * 0.05);
        ligne1 = canevas.height() * 0.025;
        ligne2 = canevas.height();
        ligne3 = canevas.height() - canevas.height() * 0.4;
        

    }

    this.afficher = function(){

        // draw background
        affichageHaut = canevas.rect(colone2 - colone1, ligne3 - ligne1).move(colone1,ligne1).fill(couleur1);
        affichageBas = canevas.rect(colone2 - colone1, ligne2 - ligne3).move(colone1,ligne3).fill(couleur2);

        // draw line
        
        //console.log(colone1 + " 1");
        //console.log(colone2 + " 2");
        //console.log(ligne1 + " 3");
        //console.log(ligne2 + " 4");
        bord = canevas.polyline([colone1,ligne1,colone2,ligne1,colone2,ligne2,colone1,ligne2,colone1,ligne1,colone2,ligne1]);
        bord.fill('none');
        bord.stroke({ color: '#103268', width: 5});
        separation = canevas.line(colone1,ligne3,colone2, ligne3);
        separation.stroke({ color: '#103268', width: 5});
        
        dessinerBoutons();
        afficherToolTips();

    }

    function dessinerBoutons()
    {
        var bouton1 = document.getElementById("bouton-attaque");
        bouton1.style.display = "inline-block";
        bouton1.style.position = "absolute";
        bouton1.style.width = (affichageBas.width() * 0.25) + "px";
        bouton1.style.height = (affichageBas.height() * 0.12) + "px";
        bouton1.style.left = affichageBas.x() + affichageBas.width() * 0.65 + "px";
        bouton1.style.top = affichageBas.y() + affichageBas.height() * 0.2 + "px";
        bouton1.addEventListener('mouseover', hoverEffect);

        var bouton2 = document.getElementById("bouton-magie");
        bouton2.style.display = "inline-block";
        bouton2.style.position = "absolute";
        //bouton2.style.fontSize = "2vh";
        bouton2.style.width = (affichageBas.width() * 0.25) + "px";
        bouton2.style.height = (affichageBas.height() * 0.2) + "px";
        bouton2.style.left = affichageBas.x() + affichageBas.width() * 0.65 + "px";
        bouton2.style.top = bouton1.getBoundingClientRect().bottom + "px";
        bouton2.addEventListener('mouseover', hoverEffect);

        var bouton3 = document.getElementById("bouton-defense");
        bouton3.style.display = "inline-block";
        bouton3.style.position = "absolute";
        bouton3.style.width = (affichageBas.width() * 0.25) + "px";
        bouton3.style.height = (affichageBas.height() * 0.12) + "px";
        bouton3.style.left = affichageBas.x() + affichageBas.width() * 0.65 + "px";
        bouton3.style.top = bouton2.getBoundingClientRect().bottom + "px";
        bouton3.addEventListener('mouseover', hoverEffect);
    }

    function afficherToolTips()
    {
        indicateurJoueur = canevas.text("Vous êtes le joueur " + canevas.attr('joueur')).fill("white").stroke('black');
        indicateurJoueur.cx(affichageHaut.x() + affichageHaut.width() * 0.85);
        indicateurJoueur.cy(affichageHaut.y() + affichageHaut.height() * 0.12);
        indicateurJoueur.font({
            family:   'Impact',
            weight: 'bolder',
            size: '120%',
            style: 'italic'
          
          
          });
    }

    function hoverEffect(evenement)
    {
        evenement.target.style.backgroundColor = "white";
        evenement.target.style.color = "black";
        evenement.target.style.fontWeight = "bolder";
        evenement.target.style.cursor = "pointer";
        evenement.target.addEventListener('mouseleave', removeHover);
    }

    function removeHover(evenement)
    {
        evenement.target.style.backgroundColor = "transparent";
        evenement.target.style.color = "white";
        evenement.target.style.fontWeight = "normal";
        evenement.target.removeEventListener('mouseleave', removeHover);
    }

    initialiser();
};