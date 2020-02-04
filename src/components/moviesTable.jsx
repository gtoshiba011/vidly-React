import React, { Component } from "react";
import { Link } from "react-router-dom";
import Like from "./common/like";
import Table from "./common/table";
import auth from "../services/authService";

class MoviesTable extends Component {
  columns = [
    {
      path: "title",
      label: "Title",
      content: movie => <Link to={`/movies/${movie._id}`}>{movie.title}</Link>
    },
    { path: "genre.name", label: "Genre" },
    { path: "numberInStock", label: "Stock" },
    { path: "dailyRentalRate", label: "Rate" },
    {
      path: "like",
      content: movie => (
        <Like liked={movie.liked} onLike={() => this.props.onLike(movie)} />
      )
    }
  ];

  deleteColumn = {
    path: "delete",
    content: movie => (
      <button
        className="btn btn-danger btn-sm"
        onClick={() => this.props.onDelete(movie)}
      >
        Delete
      </button>
    )
  };

  constructor() {
    super();
    const user = auth.getCurrentUser();
    if (user && user.isAdmin) this.columns.push(this.deleteColumn);
  }

  render() {
    const { movies, onSort, sortColumn } = this.props;

    return (
      <Table
        data={movies}
        onSort={onSort}
        columns={this.columns}
        sortColumn={sortColumn}
      />
    );
  }
}

export default MoviesTable;
