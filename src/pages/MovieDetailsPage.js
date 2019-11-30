import React, { Component } from 'react';
import T from 'prop-types';
import { BrowserRouter, Route, NavLink, Switch } from 'react-router-dom';
import tvApiService from '../services/tv-api-service';
import routes from '../routes';
import Cast from '../components/Cast/Cast';
import Reviews from '../components/Reviews/Reviews';

export default class MovieDetailsPage extends Component {
  static propTypes = {
    match: T.shape({
      params: T.shape({ movieId: T.string.isRequired }).isRequired,
      url: T.string.isRequired,
    }).isRequired,
    location: T.shape({
      pathname: T.string.isRequired,
      search: T.string.isRequired,
      state: T.object.isRequired,
    }).isRequired,
    history: T.shape({
      push: T.func.isRequired,
    }).isRequired,
  };

  state = { movie: null };

  componentDidMount() {
    this.fetchDetails();
  }

  fetchDetails = () => {
    const { movieId } = this.props.match.params;

    tvApiService
      .fetchMovieDetails(movieId)
      .then(movie => this.setState({ movie }))
      .catch(error => {
        console.log(error);
      });
  };

  onGoBack = () => {
    if (this.props.location.state && this.props.location.state.from) {
      this.props.history.push(this.props.location.state.from);
      return;
    }

    this.props.history.push(routes.HOME);
  };

  render() {
    const { movie } = this.state;
    const { match, location } = this.props;

    return (
      <BrowserRouter>
        <div>
          <button type="button" onClick={this.onGoBack}>
            Go back
          </button>

          {movie && (
            <>
              <img
                src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`}
                alt="poster"
              />
              <h2>{movie.original_title}</h2>
              <p>User Score: {movie.vote_average * 10}%</p>
              <h3>Overview</h3>
              <p>{movie.overview}</p>
              <h3>Genres</h3>
              <p>
                {movie.genres.map(genre => (
                  <span key={genre.id}> {genre.name}</span>
                ))}
              </p>
              <div>
                <h4>Additional information</h4>
                <ul>
                  <li>
                    <NavLink
                      to={{
                        pathname: `${match.url}/cast`,
                        state: { from: location },
                      }}
                      style={{ color: '#212121' }}
                      activeStyle={{ color: 'palevioletred' }}
                    >
                      Cast
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to={{
                        pathname: `${match.url}/reviews`,
                        state: { from: location },
                      }}
                      style={{ color: '#212121' }}
                      activeStyle={{ color: 'palevioletred' }}
                    >
                      Reviews
                    </NavLink>
                  </li>
                </ul>
              </div>
            </>
          )}
          <Switch>
            <Route path={routes.MOVIE_CAST} component={Cast} />
            <Route path={routes.MOVIE_REWIEWS} component={Reviews} />
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}
