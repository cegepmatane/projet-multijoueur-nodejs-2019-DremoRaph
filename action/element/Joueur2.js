var Joueur2 = function(nouveauCanevas){

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

        couleur = "#9ece4c";
        colone = canevas.width() * 0.84;
        
        ligne = canevas.height() * 0.2;
        

    }

    this.afficher = function(){
        carreJoueur = canevas.rect(150,150).fill(couleur).stroke({color: 'black', opacity : 0.8, width : 8}).radius(10);
        carreJoueur.cx(colone);
        carreJoueur.cy(ligne);

        carreStats = canevas.rect(150,150).fill("gray").stroke({color: 'white', opacity : 0.8, width : 8}).radius(10).hide();
        carreStats.cx(colone);
        carreStats.cy(ligne);

        stats = canevas.text("").fill(couleur).x(carreJoueur.cx() - carreStats.width()/2.3).y(carreJoueur.cy() - carreStats.height()/2.3).hide();
        stats.font({
            family:   'Courrier new',
            weight: 'bold',
            size: '18px'
          
          
          });

        numeroJoueur = canevas.text("2").fill('black').stroke('white').cx(carreJoueur.cx()).cy(carreJoueur.cy());
        numeroJoueur.font({
            family:   'Impact',
            weight: 'bolder'
          
          
          });
        carreStats.style('cursor', 'pointer');
        stats.style('cursor', 'pointer');
        numeroJoueur.style('cursor', 'pointer');
        numeroJoueur.on('mouseenter', hoverEffect);
        carreJoueur.on('mouseenter', hoverEffect);
    }

    function changerStats()
    {
        stats.text("Points de vie: " + canevas.attr('joueur2Vie') + 
                                        "\nAttaque: " + canevas.attr('joueur2Attaque') + 
                                        "\nVitesse: " + canevas.attr('joueur2Vitesse'));
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