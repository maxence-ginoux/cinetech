const apiKey = '8c4b867188ee47a1d4e40854b27391ec';
const movieId = '550'; // Exemple: ID du film "Fight Club"

// URL de l'API TMDb
const url = `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}`;

// Effectuer une requête GET à l'API TMDb
fetch(url)
  .then(response => {
    // Vérifier le statut de la réponse
    if (!response.ok) {
      throw new Error('La requête a échoué avec le code de statut ' + response.status);
    }
    // Convertir la réponse en JSON
    return response.json();
  })
  .then(data => {
    // Afficher les données de la réponse
    console.log(data);
  })
  .catch(error => {
    // Gestion des erreurs
    console.error('Une erreur s\'est produite:', error);
  });
