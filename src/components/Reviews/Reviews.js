import React, { Component } from 'react';
import T from 'prop-types';
import tvApiService from '../../services/tv-api-service';

export default class Reviews extends Component {
  static propTypes = {
    match: T.shape({
      params: T.shape({ movieId: T.string.isRequired }).isRequired,
    }).isRequired,
  };

  state = { reviews: [] };

  componentDidMount() {
    this.fetchDetails();
  }

  fetchDetails = () => {
    const { movieId } = this.props.match.params;

    tvApiService.fetchMovieReviews(movieId).then(data => {
      const reviews = data.results;
      this.setState({ reviews });
    });
  };

  render() {
    const { reviews } = this.state;

    return (
      <div>
        {reviews.length > 0 ? (
          <ul>
            {reviews.map(review => (
              <li key={review.id}>
                <h3>{review.author}</h3>
                <p>{review.content}</p>
              </li>
            ))}
          </ul>
        ) : (
          <p>We do not have any reviews for this movie</p>
        )}
      </div>
    );
  }
}
