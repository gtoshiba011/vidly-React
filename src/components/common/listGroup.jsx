import React from "react";

const ListGroup = props => {
  const { genres, onItemSelect } = props;
  return (
    <ul className="list-group">
      {genres.map(genre => (
        <li key={genre._id} className="list-group-item" onClick={() => onItemSelect(genre)}>
          {genre.name}
        </li>
      ))}
    </ul>
  );
};

export default ListGroup;
