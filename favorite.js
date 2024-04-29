document.addEventListener('DOMContentLoaded', function() {
    // Retrieve favorites from local storage
    const favorites = JSON.parse(localStorage.getItem('favorites')) || [];
    console.log('Favorites from local storage:', favorites);
    
    // Display favorites
    const favoritesList = document.getElementById('favoritesList');
    favorites.forEach(movieData => {
      // Create elements to display movie information
      const listItem = document.createElement('li');
      const img = document.createElement('img');
      const name = document.createElement('div');
      const des = document.createElement('div');
      
      // Set attributes and innerHTML for each element
      img.src = `https://image.tmdb.org/t/p/original${movieData.poster_path}`;
      img.alt = movieData.original_title;
      name.textContent = movieData.original_title;
      des.textContent = movieData.overview;
      

      
      
      // Append elements to list item
      listItem.appendChild(img);
      listItem.appendChild(name);
      listItem.appendChild(des);
      
      // Append list item to favorites list
      favoritesList.appendChild(listItem);
    });
});