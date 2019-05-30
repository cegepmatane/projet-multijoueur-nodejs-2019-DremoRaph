var VUE = VUE || {};

VUE.FinPartie = (function()
{
    var finPartie = {};
    var pageFinPartieContenu;
    var body;
    function initialiser()
    {
        pageFinPartieContenu = document.querySelector("#page-fin-partie").innerHTML;
        body = document.querySelector("body");
        
    }
    
    finPartie.afficher = function(gagnee)
    {
        var pageFinPartieContenuReponse = pageFinPartieContenu;
        if(gagnee)
        {       
            pageFinPartieContenuReponse = pageFinPartieContenuReponse.replace("{texte-fin}", "Bravo!");
            
            
        }else{
            console.log("partie perdue")
            pageFinPartieContenuReponse = pageFinPartieContenuReponse.replace("{texte-fin}", "Vous êtes pathétique");
        }
        body.innerHTML = pageFinPartieContenuReponse;
    }
    
    initialiser();
    return finPartie;
    
})();