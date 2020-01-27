import React, { Component } from "react";
import { getMovies } from "../services/fakeMovieService";
import Like from "./common/like";
import Pagination from "./common/pagination";
import { Paginate, paginate } from '../utils/paginate';

class Movies extends Component {
  state = {
    movies: getMovies(),
    pageSize: 4,
    currentPage: 1
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

    const { pageSize, currentPage, movies: allMovies } = this.state;
    const { length: count } = allMovies;
    const movies = paginate(allMovies, currentPage, pageSize);

    return (
      <React.Fragment>
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
            {movies.map(movie => (
              <tr key={movie._id}>
                <td>{movie.title}</td>
                <td>{movie.genre.name}</td>
                <td>{movie.numberInStock}</td>
                <td>{movie.dailyRentalRate}</td>
                <td>
                  <Like
                    liked={movie.liked}
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
        <Pagination
          itemsCount={count}
          pageSize={pageSize}
          currentPage={currentPage}
          onPageChange={this.handlePageChange}
        />
      </React.Fragment>
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

  handlePageChange = page => {
      this.setState({ currentPage: page })
  };
}
export default Movies;
