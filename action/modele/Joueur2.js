var MODELE = MODELE || {};

MODELE.Joueur2 = function(vie, attaque, vitesse){

    joueur2 = this;
    this.vie;
    this.attaque;
    this.vitesse;
    

    (function initialiser(){

        joueur2.vie = vie;
        joueur2.attaque = attaque;
        joueur2.vitesse = vitesse;
        
        
    })();
    joueur2.blesser = function(degats)
    {
        this.vie -= degats;
    }

    joueur2.verifierMort = function()
    {
        if (this.vie <= 0)
        {
            return true;
        } else {
            return false;
        }
    }
    

    

}
