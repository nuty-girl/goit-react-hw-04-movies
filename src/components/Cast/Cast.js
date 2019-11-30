import React, { Component } from 'react';
import T from 'prop-types';
import tvApiService from '../../services/tv-api-service';

export default class Cast extends Component {
  static propTypes = {
    match: T.shape({
      params: T.shape({ movieId: T.string.isRequired }).isRequired,
    }).isRequired,
  };

  state = { cast: [] };

  componentDidMount() {
    this.fetchDetails();
  }

  fetchDetails = () => {
    const { movieId } = this.props.match.params;

    tvApiService.fetchMovieCredits(movieId).then(data => {
      const { cast } = data;
      this.setState({ cast });
    });
  };

  render() {
    const { cast } = this.state;

    return (
      <>
        <div>
          <ul>
            {cast.map(item => (
              <li key={item.cast_id}>
                <img
                  src={`https://image.tmdb.org/t/p/w154${item.profile_path}`}
                  alt="actor_photo"
                />
                <p>{item.name}</p>
                <p>Character: {item.character}</p>
              </li>
            ))}
          </ul>
        </div>
      </>
    );
  }
}
