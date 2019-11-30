const fetchTrendingMovies = () => {
  return fetch(
    'https://api.themoviedb.org/3/trending/movie/day?api_key=45e316a6e984b0f8e49421453627c310',
  )
    .then(res => res.json())
    .then(data => {
      const movies = data.results;

      return movies;
    });
};

const fetchMovieDetails = movieId => {
  return fetch(
    `https://api.themoviedb.org/3/movie/${movieId}?api_key=45e316a6e984b0f8e49421453627c310`,
  ).then(res => res.json());
};

const fetchMovieWithQuery = searchQuery => {
  return fetch(
    `https://api.themoviedb.org/3/search/movie?api_key=45e316a6e984b0f8e49421453627c310&query=${searchQuery}`,
  )
    .then(res => res.json())
    .then(data => {
      const movies = data.results;

      return movies;
    });
};

const fetchMovieCredits = movieId => {
  return fetch(
    `https://api.themoviedb.org/3/movie/${movieId}/credits?api_key=45e316a6e984b0f8e49421453627c310`,
  ).then(res => res.json());
};

const fetchMovieReviews = movieId => {
  return fetch(
    `https://api.themoviedb.org/3/movie/${movieId}/reviews?api_key=45e316a6e984b0f8e49421453627c310`,
  ).then(res => res.json());
};

export default {
  fetchTrendingMovies,
  fetchMovieDetails,
  fetchMovieWithQuery,
  fetchMovieCredits,
  fetchMovieReviews,
};
