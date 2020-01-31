import React, { Component } from "react";
import _ from "lodash";
import { getMovies, deleteMovie } from "../services/fakeMovieService";
import { getGenres } from "../services/fakeGenreService";
import { paginate } from "../utils/paginate";
import ListGroup from "./common/listGroup";
import MoviesTable from "./moviesTable";
import Pagination from "./common/pagination";

class Movies extends Component {
  state = {
    movies: [],
    genres: [],
    pageSize: 4,
    currentPage: 1,
    selectedGenre: { _id: null, name: "All Genres" },
    sortColumn: { path: "title", order: "asc" }
  };
  componentDidMount() {
    const genres = [{ _id: null, name: "All Genres" }, ...getGenres()];
    this.setState({
      movies: getMovies(),
      genres
    });
  }

  getMoviesData() {
    const {
      pageSize,
      currentPage,
      selectedGenre,
      movies: allMovies,
      sortColumn
    } = this.state;

    // filter movies with selectedGenre
    const filteredMovies =
      selectedGenre._id !== null
        ? allMovies.filter(movie => movie.genre._id === selectedGenre._id)
        : allMovies;

    // sort movies
    const sortedMovies = _.orderBy(
      filteredMovies,
      [sortColumn.path],
      [sortColumn.order]
    );

    // only pass sortedMovies to paginate function
    const movies = paginate(sortedMovies, currentPage, pageSize);

    return { data: movies, totalCount: filteredMovies.length };
  }

  render() {
    // check whether there is no movies in the database
    const { length: count } = this.state.movies;
    if (count === 0) return <p>There are no movies in the database.</p>;

    const { pageSize, currentPage, sortColumn } = this.state;

    const { data: movies, totalCount } = this.getMoviesData();

    return (
      <div className="row">
        <div className="col-3">
          <ListGroup
            items={this.state.genres}
            selectedItem={this.state.selectedGenre}
            onItemSelect={this.handleGenreSelect}
          />
        </div>
        <div className="col">
          <button
            className="btn btn-primary"
            onClick={() => this.props.history.push("/movies/new")}
          >
            New Movie
          </button>
          <p>Showing {totalCount} movies in the database.</p>
          <MoviesTable
            movies={movies}
            onLike={this.handleLike}
            onDelete={this.handleDelete}
            onSort={this.handleSort}
            sortColumn={sortColumn}
          />
          <Pagination
            itemsCount={totalCount}
            pageSize={pageSize}
            currentPage={currentPage}
            onPageChange={this.handlePageChange}
          />
        </div>
      </div>
    );
  }

  handleDelete = movie => {
    const movies = this.state.movies.filter(m => m._id !== movie._id);
    this.setState({ movies: movies });

    deleteMovie(movie._id);
    if (
      Math.ceil(movies.length / this.state.pageSize) < this.state.currentPage
    ) {
      this.handlePageChange(this.state.currentPage - 1);
    }
  };

  handleLike = movie => {
    const movies = [...this.state.movies];
    const index = movies.indexOf(movie);
    movies[index] = { ...movie };
    movies[index].liked = !movies[index].liked;
    this.setState({ movies });
  };

  handlePageChange = page => {
    this.setState({ currentPage: page });
  };

  handleGenreSelect = genre => {
    this.setState({ selectedGenre: genre, currentPage: 1 });
  };

  handleSort = sortColumn => {
    this.setState({ sortColumn });
  };
}
export default Movies;
