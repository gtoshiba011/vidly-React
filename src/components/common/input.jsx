import React from "react";

// const Input = ({ name, label, error, value, onChange, type }) => {
const Input = ({ name, label, error, ...rest }) => {
  return (
    <div className="form-group">
      <label htmlFor={name}>{label}</label>
      <input
        name={name}
        id={name}
        className="form-control"
        // value={value}
        // onChange={onChange}
        // type={type}
        {...rest}
        // ref={this.username}
      />
      {error && <div className="alert alert-danger">{error}</div>}
    </div>
  );
};

export default Input;
