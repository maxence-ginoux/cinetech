// Définition de la clé API
const maConst = '8c4b867188ee47a1d4e40854b27391ec';

// Définition de l'URL de recherche
const searchUrl = 'https://api.themoviedb.org/3/search/movie?api_key=' + maConst + '&query=';

// Sélection des éléments HTML
const searchInput = document.getElementById('searchInput');
const searchResults = document.getElementById('searchResults');
const filmsContainer = document.getElementById('films');
const buttons = document.querySelectorAll("button");
const wrapper = document.querySelector(".wrapper");
const popup = document.querySelector(".popup");
const close = document.querySelector(".close");

// Fonction pour effectuer une recherche de films par mot-clé
function searchMovies(query) {
    fetch(searchUrl + query)
        .then(response => {
            if (!response.ok) {
                throw new Error('La requête a échoué avec le code de statut ' + response.status);
            }
            return response.json();
        })
        .then(data => {
            // Affichage des résultats de la recherche
            searchResults.innerHTML = ''; // Effacer les résultats précédents
            data.results.forEach(movie => {
                const movieElement = document.createElement('div');
                movieElement.classList.add('movie');
                movieElement.innerHTML = `
                    <h2>${movie.title}</h2>
                    <p>${movie.overview}</p>
                    <img src="https://image.tmdb.org/t/p/w500/${movie.poster_path}" alt="${movie.title}">
                `;
                searchResults.appendChild(movieElement);
            });
        })
        .catch(error => {
            console.error('Une erreur s\'est produite lors de la recherche:', error.message);
        });
}

// Écouteur d'événements pour la barre de recherche
searchInput.addEventListener('input', function() {
    const query = searchInput.value.trim();
    if (query.length === 0) {
        searchResults.innerHTML = ''; // Effacer les résultats de recherche si la barre de recherche est vide
        return;
    }
    searchMovies(query); // Appeler la fonction de recherche de films avec le terme de recherche
});

// on déclare une fonction appelTvShow qui va servir à aller chercher le détail d'une série TV précise et on lui passe un argument pour pouvoir personnaliser la requête
function appelTvShow(argument) {
    fetch(`https://api.themoviedb.org/3/tv/${argument}?api_key=` + maConst)
        .then(response => response.json())
        .then(data => {
            popup.querySelector(".popup_img").innerHTML = `<img src="https://image.tmdb.org/t/p/w500/${data.poster_path}" alt="">`;  // le poster dans .popup_img
            popup.querySelector(".popup_txt h3").innerHTML = data.name;                                                              // le nom de la série dans le h3
            // Formater la date de sortie
            const releaseDate = new Date(data.first_air_date);
            const options = { day: 'numeric', month: 'long', year: 'numeric' };
            const formattedReleaseDate = releaseDate.toLocaleDateString('fr-FR', options);
            popup.querySelector(".popup_txt h2").innerHTML = "Date de sortie : " + formattedReleaseDate;
            popup.querySelector(".popup_txt p").innerHTML = data.overview;                                                           // la description de la série dans le paragraphe 
        })
        .catch(error => {
            console.error("Erreur : ", error);
        });
}

// on déclare une fonction appelAPI qui va servir à aller chercher une collection de séries Tv et on lui passe un argument pour pouvoir personnaliser la requête, cet argument servira à passer le data-attribute data-tv dans l'URL de la requête
function appelApi(argument) {
    fetch(`https://api.themoviedb.org/3/tv/${argument}?api_key=` + maConst)
        .then(response => response.json())
        .then(data => {
            for(var i = 0; i < data.results.length; i++){
                var myTemplate = `
                    <div class="tv-show" data-tv-id="${data.results[i].id}">
                        <h2>${data.results[i].name}</h2>
                        <div class="tv-show_img">
                            <img src="https://image.tmdb.org/t/p/w500/${data.results[i].poster_path}">
                            <div class="note">
                                ${data.results[i].vote_average}/10
                            </div>
                        </div>
                    </div>`;
                wrapper.innerHTML += myTemplate;
                var tvShows = document.querySelectorAll(".tv-show");
                tvShows.forEach(function(tvShow){
                    tvShow.addEventListener("click", function(){
                        var whichTvShow = tvShow.getAttribute("data-tv-id");
                        appelTvShow(whichTvShow);
                        popup.classList.toggle("active");
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
        buttons.forEach(function(button) {
            button.classList.remove("active");
        });
        singleButton.classList.add("active");
        var category = singleButton.getAttribute("data-tv");
        wrapper.innerHTML = "";
        appelApi(category);
    });
});

// au click sur le bouton close, on toggle la classe active sur la popup. Normalement on ne peut cliquer sur le "close" que quand il est visible donc, dans tous les cas, le toggle ici devrait enlever la classe "acetive" du popup
close.addEventListener("click", function(){
    popup.classList.toggle("active");
});

// Appeler la fonction pour récupérer les films populaires et les afficher au chargement de la page
appelApi("popular");

// Appeler la fonction pour récupérer les films populaires et les afficher au chargement de la page
fetchPopularMovies();
