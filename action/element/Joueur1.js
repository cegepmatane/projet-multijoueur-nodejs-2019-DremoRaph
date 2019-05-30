var Joueur1 = function(nouveauCanevas){

    var canevas;
    var couleur;
    var carreJoueur;
    var carreStats;
    var stats;
    var numeroJoueur;
    var colone;
    var ligne;
    function initialiser(){

        canevas = nouveauCanevas;

        couleur = "#54d2e5";
        colone = canevas.width() * 0.75;
        
        ligne = canevas.height() * 0.45;
        

    }

    this.afficher = function(){
        carreJoueur = canevas.rect(150,150).fill(couleur).stroke({color: 'black', opacity : 0.8, width : 8}).radius(10);
        carreJoueur.cx(colone);
        carreJoueur.cy(ligne);

        carreStats = canevas.rect(150,150).fill("gray").stroke({color: 'white', opacity : 0.8, width : 8}).radius(10).hide();
        carreStats.cx(colone);
        carreStats.cy(ligne);

        numeroJoueur = canevas.text("1").fill('black').stroke('white').cx(carreJoueur.cx()).cy(carreJoueur.cy());
        numeroJoueur.font({
            family:   'Impact',
            weight: 'bolder'
          
          
          });
        stats = canevas.text("").fill(couleur).x(carreJoueur.cx() - carreStats.width()/2.3).y(carreJoueur.cy() - carreStats.height()/2.3).hide();
        stats.font({
            family:   'Courrier new',
            weight: 'bold',
            size: '18px'
          
          
          });
        carreJoueur.on('mouseenter', hoverEffect);
        numeroJoueur.on('mouseenter', hoverEffect);
        //console.log(canevas.attr('joueur1'));
        carreStats.style('cursor', 'pointer');
        stats.style('cursor', 'pointer');
        numeroJoueur.style('cursor', 'pointer');

    }

    function changerStats()
    {
        stats.text("Points de vie: " + canevas.attr('joueur1Vie') + 
                                        "\nAttaque: " + canevas.attr('joueur1Attaque') + 
                                        "\nVitesse: " + canevas.attr('joueur1Vitesse'));
    }

    function hoverEffect(evenement)
    {
        carreJoueur.hide();
        numeroJoueur.hide();
        carreStats.show();
        changerStats();
        stats.show();
        carreStats.on('mouseleave', removeHover);
    }

    function removeHover(evenement)
    {
        carreJoueur.show();
        numeroJoueur.show();
        carreStats.hide();
        
        stats.hide();
        carreStats.off('mouseleave', removeHover);
    }
    

    initialiser();
};