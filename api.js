const apiKey = '8c4b867188ee47a1d4e40854b27391ec';

// URL de l'API TMDb pour récupérer tous les films
const url = `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}`;

// Récupérer les données depuis l'API
fetch(url)
  .then(response => {
    if (!response.ok) {
      throw new Error('La requête a échoué avec le code de statut ' + response.status);
    }
    return response.json();
  })
  .then(data => {
    // Stocker les données dans localStorage
    localStorage.setItem('moviesData', JSON.stringify(data.results));
    console.log('Données des films stockées avec succès dans localStorage.');
  })
  .catch(error => {
    console.error('Une erreur s\'est produite lors de la récupération des données:', error.message);
  });
