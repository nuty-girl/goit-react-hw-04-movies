import React, { Component } from 'react';
import T from 'prop-types';
import { Link } from 'react-router-dom';
import tvApiService from '../services/tv-api-service';

export default class HomePage extends Component {
  static propTypes = {
    match: T.shape({
      url: T.string.isRequired,
    }).isRequired,
    location: T.shape({
      pathname: T.string.isRequired,
      search: T.string.isRequired,
    }).isRequired,
  };

  state = {
    movies: [],
  };

  componentDidMount() {
    tvApiService.fetchTrendingMovies().then(movies => {
      this.setState({ movies });
    });
  }

  render() {
    const { match, location } = this.props;
    const { movies } = this.state;
    return (
      <div>
        <h1>Trending today</h1>
        <ul>
          {movies.map(movie => (
            <li key={movie.id}>
              <Link
                to={{
                  pathname: `${match.url}movies/${movie.id}`,
                  state: { from: location },
                }}
              >
                {movie.original_title}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    );
  }
}
