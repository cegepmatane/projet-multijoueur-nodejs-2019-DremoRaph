var MODELE = MODELE || {};

MODELE.Joueur1 = function(vie, attaque, vitesse){

    joueur1 = this;
    this.vie;
    this.attaque;
    this.vitesse;
    //this.stats;
    

    (function initialiser(){

        joueur1.vie = vie;
        joueur1.attaque = attaque;
        joueur1.vitesse = vitesse;
        //joueur1.stats = {"vie" : vie, "attaque" : attaque, "vitesse" : vitesse};
        
        
    })();

    joueur1.blesser = function(degats)
    {
        this.vie -= degats;
    }

    joueur1.verifierMort = function()
    {
        if (this.vie <= 0)
        {
            return true;
        } else {
            return false;
        }
    }

    

    

}
