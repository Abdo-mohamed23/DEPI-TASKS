const API_MOVIES =
  'https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=9813ce01a72ca1bd2ae25f091898b1c7';

const moviesGrid = document.getElementById('movies-grid');

async function fetchMovies() {
  try {
    const res = await fetch(API_MOVIES);
    const data = await res.json();
    displayMovies(data.results);
  } catch (error) {
    console.error('خطأ في جلب بيانات الأفلام:', error);
  }
}

function displayMovies(movies) {
  moviesGrid.innerHTML = '';
  movies.forEach((movie) => {
    const imgPath = movie.poster_path
      ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
      : 'https://via.placeholder.com/200x300?text=No+Image';

    const movieCard = document.createElement('div');
    movieCard.classList.add('movie-card');
    movieCard.innerHTML = `
      <img src="${imgPath}" alt="${movie.title}">
      <div class="card-content">
        <h3 class="card-title">${movie.title}</h3>
      </div>
    `;

    movieCard.addEventListener('click', () => {
      window.location.href = `details.html?type=movie&id=${movie.id}`;
    });
    moviesGrid.appendChild(movieCard);
  });
}

fetchMovies();
