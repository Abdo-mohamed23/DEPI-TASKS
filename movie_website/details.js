const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const type = urlParams.get('type');
const id = urlParams.get('id');

const apiKey = '9813ce01a72ca1bd2ae25f091898b1c7';

const detailsContent = document.getElementById('details-content');

async function fetchDetails() {
  if (!type || !id) {
    detailsContent.innerHTML = '<p>لم يتم توفير معرّف صالح.</p>';
    return;
  }

  let apiURL = '';
  if (type === 'movie') {
    apiURL = `https://api.themoviedb.org/3/movie/${id}?api_key=${apiKey}`;
  } else if (type === 'series') {
    apiURL = `https://api.themoviedb.org/3/tv/${id}?api_key=${apiKey}`;
  } else {
    detailsContent.innerHTML = '<p>نوع المحتوى غير معروف.</p>';
    return;
  }

  try {
    const res = await fetch(apiURL);
    const data = await res.json();
    displayDetails(data);
  } catch (error) {
    console.error('خطأ في جلب التفاصيل:', error);
    detailsContent.innerHTML = '<p>حدث خطأ أثناء جلب البيانات.</p>';
  }
}

function displayDetails(data) {
  const imgPath = data.poster_path
    ? `https://image.tmdb.org/t/p/w500${data.poster_path}`
    : 'https://via.placeholder.com/300x450?text=No+Image';

  const title = data.title || data.name || 'عنوان غير متوفر';

  const overview = data.overview || 'لا توجد وصف متاح.';
  const rating = data.vote_average ? `التقييم: ${data.vote_average}` : '';
  const releaseDate = data.release_date || data.first_air_date || '';

  detailsContent.innerHTML = `
    <div class="details-image">
      <img src="${imgPath}" alt="${title}">
    </div>
    <div class="details-info">
      <h2>${title}</h2>
      <p>${overview}</p>
      <p>${rating}</p>
      <p>${releaseDate ? 'تاريخ الإصدار: ' + releaseDate : ''}</p>
    </div>
  `;
}

fetchDetails();
