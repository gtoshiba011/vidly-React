import React from "react";

const MovieDetails = ({ match, history }) => {
  return (
    <div>
      <h1>Movie From {match.params.id}</h1>
      <button
        onClick={() => history.push("/movies")}
        className="btn btn-primary btn-sm"
      >
        Save
      </button>
    </div>
  );
};

export default MovieDetails;
