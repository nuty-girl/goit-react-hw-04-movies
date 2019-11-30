import React, { Component } from 'react';
import T from 'prop-types';
import { Link } from 'react-router-dom';
import qs from 'qs';
import Searchbar from '../components/Searchbar/Searchbar';
import tvApiService from '../services/tv-api-service';

const getQueryPramsFromProps = props =>
  qs.parse(props.location.search.slice(1));

export default class MoviesPage extends Component {
  static propTypes = {
    match: T.shape({
      url: T.string.isRequired,
    }).isRequired,
    location: T.shape({
      pathname: T.string.isRequired,
      search: T.string.isRequired,
    }).isRequired,
    history: T.shape({
      push: T.func.isRequired,
    }).isRequired,
  };

  state = {
    movies: [],
  };

  componentDidMount() {
    const queryParams = getQueryPramsFromProps(this.props);

    if (!queryParams.query) {
      return;
    }

    tvApiService.fetchMovieWithQuery(queryParams.query).then(movies => {
      this.setState({ movies });
    });
  }

  componentDidUpdate(prevProps, prevState) {
    const { query: prevQuery } = getQueryPramsFromProps(prevProps);
    const { query: nextQuery } = getQueryPramsFromProps(this.props);

    if (prevQuery === nextQuery) {
      return;
    }

    tvApiService.fetchMovieWithQuery(nextQuery).then(movies => {
      this.setState({ movies });
    });
  }

  setSearchQuery = searchQuery => {
    this.props.history.push({
      ...this.props.location,
      search: `query=${searchQuery}`,
    });
  };

  render() {
    const { match, location } = this.props;
    const { movies } = this.state;

    return (
      <div>
        <Searchbar onSearch={this.setSearchQuery} />

        <ul>
          {movies.map(movie => (
            <li key={movie.id}>
              <Link
                to={{
                  pathname: `${match.url}/${movie.id}`,
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
