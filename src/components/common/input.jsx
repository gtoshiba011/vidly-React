import React from "react";

const Input = ({ name, label, error, value, onChange, type }) => {
  return (
    <div className="form-group">
      <label htmlFor={name}>{label}</label>
      <input
        name={name}
        id={name}
        className="form-control"
        value={value}
        onChange={onChange}
        type={type}
        // ref={this.username}
      />
      {error && <div className="alert alert-danger">{error}</div>}
    </div>
  );
};

export default Input;
