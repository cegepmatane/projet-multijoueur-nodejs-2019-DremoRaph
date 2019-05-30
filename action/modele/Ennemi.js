var MODELE = MODELE || {};

MODELE.Ennemi = function(){

    ennemi = this;
    this.vie;
    this.attaque;
    this.vitesse;
    this.stats;
    

    (function initialiser(){

        ennemi.vie = (Math.floor(Math.random() * 50) + 20) * 10;
        ennemi.attaque = (Math.floor(Math.random() * 50) + 25);
        ennemi.vitesse = (Math.floor(Math.random() * 70) + 15);
        ennemi.stats = {"vie" : ennemi.vie, "attaque" : ennemi.attaque, "vitesse" : ennemi.vitesse};
        
        
    })();

    ennemi.setStats = function(retourStats)
    {
        this.vie = retourStats.vie;
        this.attaque = retourStats.attaque;
        this.vitesse = retourStats.vitesse;
        this.stats = retourStats;
    }

    

    

}
