// Fichier: main.js

// Définition de la clé API
const maConst = '8c4b867188ee47a1d4e40854b27391ec';

// Définition de l'URL de recherche
const searchUrl = 'https://api.themoviedb.org/3/search/movie?api_key=' + maConst + '&query=';

// Sélection des éléments HTML
const searchInput = document.getElementById('searchInput');
const searchResults = document.getElementById('searchResults');
const filmsContainer = document.getElementById('films');

// Fonction pour récupérer les films populaires et les afficher
function fetchPopularMovies() {
    fetch('https://api.themoviedb.org/3/discover/movie?api_key=' + maConst)
        .then(response => response.json())
        .then(data => {
            data.results.forEach(film => {
                const filmElement = document.createElement('div');
                filmElement.classList.add('col-md-4', 'mb-4'); // Bootstrap classes for column and margin bottom
                filmElement.innerHTML = `
                    <div class="card">
                        <img class="card-img-top" src="https://image.tmdb.org/t/p/w500/${film.poster_path}" alt="${film.title} Poster">
                        <div class="card-body">
                            <h5 class="card-title">${film.title}</h5>
                            <p class="card-text">${film.overview}</p>
                        </div>
                    </div>
                `;
                filmsContainer.appendChild(filmElement);
            });
        })
        .catch(error => {
            console.error('Erreur lors de la récupération des données des films populaires:', error);
        });
}

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

// Appeler la fonction pour récupérer les films populaires et les afficher au chargement de la page
fetchPopularMovies();
