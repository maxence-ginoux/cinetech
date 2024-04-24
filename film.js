// Définition de la clé API
const maConst = '8c4b867188ee47a1d4e40854b27391ec';
let currentPage = 1; // Numéro de la page actuelle

// Définition de l'URL pour récupérer les films
const apiUrl = `https://api.themoviedb.org/3/discover/movie?api_key=${maConst}`;

// Fonction pour afficher les films sur la page
function displayFilms(films) {
    const filmsContainer = document.getElementById('films');
    filmsContainer.innerHTML = ''; // Effacer les films précédemment affichés
    films.forEach(film => {
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
}

// Sélection des éléments HTML
const prevPageBtn = document.getElementById('prevPageBtn');
const nextPageBtn = document.getElementById('nextPageBtn');
const sortSelect = document.getElementById('sortSelect');
const sortButton = document.getElementById('sortButton');

// Fonction pour récupérer les films d'une page spécifique et les afficher
function fetchMoviesByPage(pageNumber) {
    const perPage = 18; // Modifier le nombre de films par page à 18
    const pageUrl = `${apiUrl}&page=${pageNumber}&per_page=${perPage}`;

    fetch(pageUrl)
        .then(response => response.json())
        .then(data => {
            displayFilms(data.results); // Appeler la fonction pour afficher les films
        })
        .catch(error => {
            console.error('Erreur lors de la récupération des données des films:', error);
        });
}

// Fonction pour trier les films en fonction du critère sélectionné
function sortFilms() {
    const sortBy = sortSelect.value; // Récupérer le critère de tri sélectionné
    const films = Array.from(document.querySelectorAll('.col-md-4'));

    films.sort((a, b) => {
        const aValue = a.dataset[sortBy]; // Valeur du critère de tri pour le film A
        const bValue = b.dataset[sortBy]; // Valeur du critère de tri pour le film B

        // Comparaison des valeurs du critère de tri
        if (sortBy === 'release_date') {
            return new Date(aValue) - new Date(bValue); // Tri par date de sortie
        } else {
            return parseFloat(bValue) - parseFloat(aValue); // Tri par popularité ou autre critère numérique
        }
    });

    // Réordonner les films sur la page en fonction du tri
    const filmsContainer = document.getElementById('films');
    filmsContainer.innerHTML = ''; // Effacer les films actuels

    films.forEach(film => filmsContainer.appendChild(film));
}


// Écouteurs d'événements pour les boutons de pagination
prevPageBtn.addEventListener('click', function() {
    currentPage--; // Diminuer le numéro de page actuel
    fetchMoviesByPage(currentPage); // Charger les films de la page précédente
});

nextPageBtn.addEventListener('click', function() {
    currentPage++; // Augmenter le numéro de page actuel
    fetchMoviesByPage(currentPage); // Charger les films de la page suivante
});

sortButton.addEventListener('click', sortFilms);

// Appeler la fonction pour récupérer les films de la première page au chargement de la page
fetchMoviesByPage(currentPage);
