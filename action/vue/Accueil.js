var VUE = VUE || {};

VUE.Accueil = (function()
{
    var accueil = {};
    var pageAccueilContenu;
    var body;
    function initialiser()
    {
        pageAccueilContenu = document.querySelector("#page-accueil").innerHTML;
        body = document.querySelector("body");
        
    }
    
    accueil.afficher = function()
    {
        
        body.innerHTML = pageAccueilContenu;
    }
    
    initialiser();
    return accueil;
    
})();