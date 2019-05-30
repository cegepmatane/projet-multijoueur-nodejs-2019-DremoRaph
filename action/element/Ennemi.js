var Ennemi = function(nouveauCanevas){

    var canevas;
    var couleur;
    var carreEnnemi;
    var carreStats;
    var stats;
    var numeroEnnemi;
    var colone;
    var ligne;
    function initialiser(){

        canevas = nouveauCanevas;

        couleur = "#ab1faf";
        colone = canevas.width() * 0.2;
        
        ligne = canevas.height() * 0.3;
        

    }

    this.afficher = function(){
        carreEnnemi = canevas.rect(200,200).fill(couleur).stroke({color: 'black', opacity : 0.8, width : 8}).radius(15);
        carreEnnemi.cx(colone);
        carreEnnemi.cy(ligne);

        carreStats = canevas.rect(200,200).fill("black").stroke({color: 'gray', opacity : 0.8, width : 8}).radius(15).hide();
        carreStats.cx(colone);
        carreStats.cy(ligne);

        numeroEnnemi = canevas.text("ENNEMI").fill('white').stroke('black').cx(carreEnnemi.cx() * 0.95).cy(carreEnnemi.cy() * 1.1);
        numeroEnnemi.font({
            family:   'Impact',
            weight: 'bolder',
            size: '200%'
          
          
          });
        stats = canevas.text("").fill(couleur).x(carreEnnemi.cx() - carreStats.width()/2.3).y(carreEnnemi.cy() - carreStats.height()/2.3).hide();
        stats.font({
            family:   'Courrier new',
            weight: 'bold',
            size: '18px'
          
          
          });
        carreEnnemi.on('mouseenter', hoverEffect);
        numeroEnnemi.on('mouseenter', hoverEffect);
        //console.log(canevas.attr('joueur1'));
        carreStats.style('cursor', 'pointer');
        stats.style('cursor', 'pointer');
        numeroEnnemi.style('cursor', 'pointer');

    }

    function changerStats()
    {
        
        stats.text("Points de vie: " + canevas.attr('ennemiVie') + 
                                        "\nAttaque: " + canevas.attr('ennemiAttaque') + 
                                        "\nVitesse: " + canevas.attr('ennemiVitesse'));
    }

    function hoverEffect(evenement)
    {
        carreEnnemi.hide();
        numeroEnnemi.hide();
        carreStats.show();
        changerStats();
        stats.show();
        carreStats.on('mouseleave', removeHover);
    }

    function removeHover(evenement)
    {
        carreEnnemi.show();
        numeroEnnemi.show();
        carreStats.hide();
        
        stats.hide();
        carreStats.off('mouseleave', removeHover);
    }
    

    initialiser();
};