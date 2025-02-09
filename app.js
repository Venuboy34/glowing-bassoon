const apiKey = 'bb1bb30c';  // Your OMDB API key
let currentCategory = 'movie';  // Default category to 'movie'

// Function to fetch movies or anime from OMDB API
async function fetchMovies(category = 'movie') {
    const url = `http://www.omdbapi.com/?apikey=${apiKey}&s=${category}`;
    const response = await fetch(url);
    const data = await response.json();

    if (data.Response === 'True') {
        displayMovies(data.Search);
    } else {
        document.getElementById('movie-list').innerHTML = 'No results found!';
    }
}

// Function to display movies or anime on the page
function displayMovies(movies) {
    const movieList = document.getElementById('movie-list');
    movieList.innerHTML = '';  // Clear previous results

    movies.forEach(movie => {
        const movieItem = document.createElement('div');
        movieItem.classList.add('movie-item');
        movieItem.innerHTML = `
            <img src="${movie.Poster}" alt="${movie.Title}">
            <h3>${movie.Title}</h3>
        `;
        movieItem.addEventListener('click', () => displayMovieInfo(movie.imdbID));
        movieList.appendChild(movieItem);
    });
}

// Function to display individual movie information
async function displayMovieInfo(imdbID) {
    const url = `http://www.omdbapi.com/?apikey=${apiKey}&i=${imdbID}`;
    const response = await fetch(url);
    const movie = await response.json();

    if (movie.Response === 'True') {
        alert(`Title: ${movie.Title}\nYear: ${movie.Year}\nPlot: ${movie.Plot}`);
    } else {
        alert('Movie not found');
    }
}

// Function to filter by category (movies or anime)
function filterCategory(category) {
    currentCategory = category;
    fetchMovies(category);
}

// Function to search for a movie
function searchMovie() {
    const query = document.getElementById('search-bar').value;
    if (query) {
        fetchMovies(query);
    } else {
        fetchMovies(currentCategory);
    }
}

// Initialize the page by fetching the default category (movies)
fetchMovies(currentCategory);
