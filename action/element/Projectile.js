var Projectile = function(nouveauCanevas){

    var canevas;
    var couleur;
    var projectile;
    var diametre;
    //var couleurDynamique;

    (function initialiser(){

        canevas = nouveauCanevas;

        couleur = '#3e59d1';

        diametre = 10;

        //couleurDynamique = new SVG.Color('#ff0066');
        //couleurDynamique.morph('#00ff99');

    })();

    this.afficher = function(){

        projectile = canevas.circle(diametre);
        projectile.center(canevas.width()/2, canevas.height()/2).fill(couleur);

    }

    this.deplacer = function(x, y){

        projectile.dmove(x, y);

    }

    this.getPosition = function(){

        return [balle.cx(), balle.cy()];
    }

    this.setPosition = function(x, y){

        projectile.cx(x); 
        projectile.cy(y);
        
    }
    /*
    this.colorerPourPosition = function(){

        balle.fill(couleurDynamique.at(1/canevas.width()*balle.x()));
    
    } */
    /*
    this.animerVersCentre = function(){

        balle.animate(100).center(canevas.width()/2, canevas.height()/2);

    } */

};