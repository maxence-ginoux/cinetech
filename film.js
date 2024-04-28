// Définition de la clé API
const maConst = '8c4b867188ee47a1d4e40854b27391ec';

// on déclare toute une série d'éléments avec lesquels on va jouer 
var buttons = document.querySelectorAll("button"); // les boutons de filtre
var wrapper = document.querySelector(".wrapper"); // le conteneur qui va réceptionner les films
var popup = document.querySelector(".popup"); // la popup qui va recevoir les informations
var close = document.querySelector(".close"); // le bouton qui va fermer la popup


// on déclare une fonction appelFilm qui va servir à aller chercher le détail d'un film précis et on lui passe un argument pour pouvoir personnaliser la requête
function appelFilm(argument) {
    fetch(`https://api.themoviedb.org/3/movie/${argument}?api_key=` + maConst)
        .then(response => response.json())
        .then(data => {
            // console.log(data);
            // on va injecter à 3 endroits différents tout ce qu'on reçoit en réponse à notre requête :
            popup.querySelector(".popup_img").innerHTML = `<img src="https://image.tmdb.org/t/p/w500/${data.poster_path}" alt="">`;  // le poster dans .popup_img
            popup.querySelector(".popup_txt h3").innerHTML = data.title;                                                              // le titre du film dans le h3
            popup.querySelector(".popup_txt p").innerHTML = data.overview;                                                           // la description du film dans le paragraphe
        })
        .catch(error => {
            console.error("Erreur : ", error);
        });
}
// on déclare une fonction appelApiFilm qui va servir à aller chercher une collection de films et on lui passe un argument pour pouvoir personnaliser la requête, cet argument servira à passer le data-attribute data-film dans l'URL de la requête
function appelApiFilm(argument) {
    console.log("Valeur de l'argument :", argument); // Ajoutez cette ligne pour déboguer
    fetch(`https://api.themoviedb.org/3/movie/${argument}?api_key=` + maConst)
        .then(response => response.json())
        .then(data => {
            // console.log(data);
            console.log("Résultats de la requête API :", data.results);

            // on boucle sur la longueur des résultats obtenus (qui sont un tableau)
            for(var i = 0; i < data.results.length; i++){
                
                // on crée un template rempli des informations issues de la réponse reçue de notre requête
                var myTemplate = `
            <div class="film" data-film-id="${data.results[i].id}">
                <h2>${data.results[i].title}</h2>
                <div class="film_img">
                    <img src="https://image.tmdb.org/t/p/w500/${data.results[i].poster_path}">
                    <div class="note">
                        ${data.results[i].vote_average}/10
                    </div>
                </div>
            </div>    
            `
            
            // on injecte notre template dans wrapper
            wrapper.innerHTML += myTemplate;

            // on capture à cet endroit-ci tous les éléments html qui ont la classe .film et on en fait une liste
            var films = document.querySelectorAll(".film");
            //on explose cette liste avec un forEach pour pouvoir, pour chaque film, récupérer son ID (avec son data attribute data-film-id) pour l'injecter dans la fonction appelFilm qui va injecter les informations dans la popup
            films.forEach(function(film){
                film.addEventListener("click", function(){
                  var whichFilm = film.getAttribute("data-film-id"); // on va chercher le data-film-id du .film cliqué
                  appelFilm(whichFilm);                            // on appelle la fonction appelFilm et on lui envoie l'ID qu'on a capturé ci-dessus
                  popup.classList.toggle("active");                    // on passe la popup en état "actif" en lui togglant sa classe active (qui n'est pas présente de base)
                })
                
            })
            }
        })
        .catch(error => {
            console.error("Erreur : ", error);
        });
}


// sur la collection de boutons, on fait un forEach pour exploser cette collection et appliquer un click qui va servir à ...
buttons.forEach(function(singleButton) {
    singleButton.addEventListener("click", function() {
        console.log("Bouton cliqué :", singleButton.getAttribute("data-film")); // Ajoutez cette ligne pour déboguer
        
        buttons.forEach(function(button) {      // on enlève la classe active de chaque bouton
            button.classList.remove("active");
        })

        singleButton.classList.add("active");       // on ajoute la classe active au bouton cliqué

        var category = singleButton.getAttribute("data-film"); // récupère le data-film du bouton cliqué
        wrapper.innerHTML = "";                              // remet le template à 0
        appelApiFilm(category)                                   // envoie le data-film comme argument à la fonction appelApiFilm pour la personnaliser
    })
});



// au click sur le bouton close, on toggle la classe active sur la popup. Normalement on ne peut cliquer sur le "close" que quand il est visible donc, dans tous les cas, le toggle ici devrait enlever la classe "acetive" du popup
close.addEventListener("click", function(){
    popup.classList.toggle("active");
})

appelApiFilm("popular"); // on appelle une fois la fonction appelApiFilm pour avoir quand même quelques affiches sur le choix arbitraire "popular" (bien placer la classe active sur popular dans l'html du coup)

