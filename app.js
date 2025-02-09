const apiKey = 'bb1bb30c';  // Replace with your API key

function loadMovies(category) {
    const url = `http://www.omdbapi.com/?s=${category}&apikey=${apiKey}`;

    fetch(url)
        .then(response => response.json())
        .then(data => {
            if (data.Response === "True") {
                displayMovies(data.Search);
            } else {
                document.getElementById("movie-results").innerHTML = '<p>No results found.</p>';
            }
        })
        .catch(error => console.error('Error fetching data:', error));
}

function displayMovies(movies) {
    const movieResults = document.getElementById("movie-results");
    movieResults.innerHTML = '';  // Clear previous results

    movies.forEach(movie => {
        const movieCard = document.createElement("div");
        movieCard.classList.add("movie-card");

        movieCard.innerHTML = `
            <img src="${movie.Poster}" alt="${movie.Title}">
            <h3>${movie.Title}</h3>
            <p>${movie.Year}</p>
        `;
        
        movieResults.appendChild(movieCard);
    });
}

// Load the latest movies by default
loadMovies('movie');