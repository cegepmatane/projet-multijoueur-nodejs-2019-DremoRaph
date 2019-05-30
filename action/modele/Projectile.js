var MODELE = MODELE || {};

MODELE.Projectile = function(velociteX, 
                        velociteY, 
                        positionCentreX, 
                        positionCentreY){

    projectile = this;
    this.velociteX;
    this.velociteY;
    this.positionCentreX;
    this.positionCentreY;

    (function initialiser(){

        projectile.velociteX = velociteX;
        projectile.velociteY = velociteY;
        projectile.positionCentreX = positionCentreX;
        projectile.positionCentreY = positionCentreY;
        
    })();

    

}
