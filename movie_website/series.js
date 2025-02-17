const API_SERIES =
  'https://api.themoviedb.org/3/discover/tv?include_adult=false&include_null_first_air_dates=false&language=en-US&page=1&sort_by=popularity.desc&api_key=9813ce01a72ca1bd2ae25f091898b1c7';

const seriesGrid = document.getElementById('series-grid');

async function fetchSeries() {
  try {
    const res = await fetch(API_SERIES);
    const data = await res.json();
    displaySeries(data.results);
  } catch (error) {
    console.error('خطأ في جلب بيانات المسلسلات:', error);
  }
}

function displaySeries(series) {
  seriesGrid.innerHTML = '';
  series.forEach((serie) => {
    const imgPath = serie.poster_path
      ? `https://image.tmdb.org/t/p/w500${serie.poster_path}`
      : 'https://via.placeholder.com/200x300?text=No+Image';
    const seriesCard = document.createElement('div');
    seriesCard.classList.add('series-card');
    seriesCard.innerHTML = `
      <img src="${imgPath}" alt="${serie.name}">
      <div class="card-content">
        <h3 class="card-title">${serie.name}</h3>
      </div>
    `;
    seriesCard.addEventListener('click', () => {
      window.location.href = `details.html?type=series&id=${serie.id}`;
    });
    seriesGrid.appendChild(seriesCard);
  });
}

fetchSeries();
