import React from "react";

const SearchBar = ({ value, onChange }) => {
  return (
    <div>
      <input
        type="text"
        name="query"
        value={value}
        onChange={event => onChange(event.currentTarget.value)}
        placeholder="Search..."
        className="form-control my-3"
      ></input>
    </div>
  );
};

export default SearchBar;
