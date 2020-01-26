import React, { Component } from "react";
import { getMovies } from "../services/fakeMovieService";
import Like from "./common/like";

class Movies extends Component {
  state = {
    movies: getMovies()
  };
  render() {
    return (
      <React.Fragment>
        {this.renderSummary()}
        {this.getMoviesNumber() !== 0 && this.renderMovieTable()}
      </React.Fragment>
    );
  }

  renderSummary = () => {
    return this.getMoviesNumber() === 0 ? (
      <p>There are no movies in the database.</p>
    ) : (
      <p>Showing {this.state.movies.length} movies in the database.</p>
    );
  };

  getMoviesNumber = () => {
    return this.state.movies.length;
  };

  renderMovieTable = () => {
    // zen coding
    // table.table>thead>tr>th*5
    return (
      <table className="table">
        <thead>
          <tr>
            <th>Title</th>
            <th>Genre</th>
            <th>Stock</th>
            <th>Rate</th>
            <th></th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {this.state.movies.map(movie => (
            <tr key={movie._id}>
              <td>{movie.title}</td>
              <td>{movie.genre.name}</td>
              <td>{movie.numberInStock}</td>
              <td>{movie.dailyRentalRate}</td>
              <td>
                <Like
                  liked={movie.liked}
                  movie={movie}
                  onLike={() => this.handleLike(movie)}
                />
              </td>
              <td>
                <button
                  className="btn btn-danger btn-sm"
                  onClick={() => this.removeMovie(movie)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  };

  removeMovie = movie => {
    const movies = this.state.movies.filter(m => m._id !== movie._id);
    this.setState({ movies: movies });
  };

  handleLike = movie => {
    const movies = [...this.state.movies];
    const index = movies.indexOf(movie);
    movies[index] = { ...movie };
    movies[index].liked = !movies[index].liked;
    this.setState({ movies });
  };
}
export default Movies;
