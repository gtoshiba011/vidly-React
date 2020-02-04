import React, { Component } from "react";
import _ from "lodash";
import { getMovies, deleteMovie } from "../services/movieService";
import { getGenres } from "../services/genreService";
import { paginate } from "../utils/paginate";
import ListGroup from "./common/listGroup";
import SearchBar from "./searchBar";
import MoviesTable from "./moviesTable";
import Pagination from "./common/pagination";
import { toast } from "react-toastify";

class Movies extends Component {
  state = {
    movies: [],
    genres: [],
    pageSize: 4,
    currentPage: 1,
    selectedGenre: { _id: null, name: "All Genres" },
    sortColumn: { path: "title", order: "asc" },
    searchQuery: ""
  };
  async componentDidMount() {
    const { data } = await getGenres();
    const genres = [{ _id: null, name: "All Genres" }, ...data];

    const { data: movies } = await getMovies();
    this.setState({
      movies,
      genres
    });
  }

  getMoviesData() {
    const {
      pageSize,
      currentPage,
      selectedGenre,
      movies: allMovies,
      sortColumn,
      searchQuery
    } = this.state;

    // filter movies with searchQuery
    let filteredMovies = [];
    if (searchQuery !== "") {
      filteredMovies = allMovies.filter(
        movie =>
          movie.title.toLowerCase().indexOf(searchQuery.toLowerCase()) !== -1
      );
    } else if (selectedGenre._id !== null) {
      filteredMovies = allMovies.filter(
        movie => movie.genre._id === selectedGenre._id
      );
    } else {
      filteredMovies = allMovies;
    }

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
    // const { length: count } = this.state.movies;
    // if (count === 0) return <p>There are no movies in the database.</p>;

    const { pageSize, currentPage, sortColumn, searchQuery } = this.state;
    const { data: movies, totalCount } = this.getMoviesData();
    const { user } = this.props;

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
          {user && (
            <button
              className="btn btn-primary"
              onClick={() => this.props.history.push("/movies/new")}
              style={{ marginBottom: "1rem" }}
            >
              New Movie
            </button>
          )}
          <p>Showing {totalCount} movies in the database.</p>
          <SearchBar value={searchQuery} onChange={this.handleSearch} />
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

  handleSearch = query => {
    this.setState({
      searchQuery: query,
      currentPage: 1,
      selectedGenre: { _id: null, name: "All Genres" }
    });
  };

  handleDelete = async movie => {
    const oriMovies = this.state.movies;
    const oriCurrentPage = this.state.currentPage;
    const movies = oriMovies.filter(m => m._id !== movie._id);
    const { pageSize, currentPage } = this.state;
    this.setState({
      movies: movies,
      currentPage:
        Math.ceil(movies.length / pageSize) < currentPage
          ? currentPage - 1
          : currentPage
    });

    try {
      await deleteMovie(movie._id);
    } catch (ex) {
      if (ex.response && ex.response.status === 404)
        toast.error("This movie has been deleted.");
      this.setState({ movies: oriMovies, currentPage: oriCurrentPage });
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
    this.setState({ searchQuery: "", selectedGenre: genre, currentPage: 1 });
  };

  handleSort = sortColumn => {
    this.setState({ sortColumn });
  };
}
export default Movies;
