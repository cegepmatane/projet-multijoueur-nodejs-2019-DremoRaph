var VUE = VUE || {};

VUE.combat = (function()
{
    var interface = {};
    var pagePartieContenu;
    var body;
    var canevas;
    var fond;
    var largeur;
    var hauteur;

    (function initialiser()
    {
        pagePartieContenu = document.querySelector("#page-partie").innerHTML;
        //pagePartieContenu.style.padding = "0, 0, 0, 0";
        body = document.querySelector("body");
        
    })();
    
    interface.afficher = function(joueurActif, premierJoueur, deuxiemeJoueur, ennemi)
    {
        body.innerHTML = pagePartieContenu;
        
        canevas = SVG('scene-jeu').size(window.innerWidth - window.innerWidth * 0.005, window.innerHeight - window.innerHeight * 0.05);
        canevas.viewbox(0, 0, window.innerWidth, window.innerHeight);
        //console.log(premierJoueur.stats);
        canevas.attr('joueur', joueurActif);
        canevas.attr({'joueur1Vie': premierJoueur.vie, 
        'joueur1Attaque' : premierJoueur.attaque, 
        'joueur1Vitesse': premierJoueur.vitesse});
        canevas.attr({'joueur2Vie': deuxiemeJoueur.vie, 
        'joueur2Attaque' : deuxiemeJoueur.attaque, 
        'joueur2Vitesse': deuxiemeJoueur.vitesse});
        canevas.attr({'ennemiVie': ennemi.vie, 
        'ennemiAttaque' : ennemi.attaque, 
        'ennemiVitesse': ennemi.vitesse});
        //console.log("Actif : " + joueurActif);
        //canevas.on('click', agirSurClic);
        fond = new Fond(canevas);
        Joueur1 = new Joueur1(canevas);
        Joueur2 = new Joueur2(canevas);
        Ennemi = new Ennemi(canevas);
        fond.afficher();
        Joueur1.afficher();
        Joueur2.afficher();
        Ennemi.afficher();
    }

    interface.getAttaque = function(position)
    {
        if(position == 1){
            return canevas.attr("joueur1Attaque");
        } else if(position == 2){
            return canevas.attr("joueur2Attaque");
        }else{
            return canevas.attr("ennemiAttaque");
        }
        
    }
    
    interface.dessinerCarre = function(hauteur,largeur)
    {
        carre = canevas.rect(hauteur,largeur).attr({ fill: '#f70' });
        carre.cx(100);
        carre.cy(100);
    }
    
    interface.rafraichirStats = function(premierJoueur, deuxiemeJoueur, ennemi)
    {
        canevas.attr({'joueur1Vie': premierJoueur.vie, 
        'joueur1Attaque' : premierJoueur.attaque, 
        'joueur1Vitesse': premierJoueur.vitesse});
        canevas.attr({'joueur2Vie': deuxiemeJoueur.vie, 
        'joueur2Attaque' : deuxiemeJoueur.attaque, 
        'joueur2Vitesse': deuxiemeJoueur.vitesse});
        canevas.attr({'ennemiVie': ennemi.vie, 
        'ennemiAttaque' : ennemi.attaque, 
        'ennemiVitesse': ennemi.vitesse});
    }

    interface.remplirLog = function(message)
    {
        var log = document.getElementById("log-tour");
        log.value = log.value + "\n" + message;
    }

    

    
    return interface;
    
})();