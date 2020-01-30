import React from "react";

const Input = ({ name, label, value, onChange }) => {
  return (
    <div className="form-group">
      <label htmlFor={name}>{label}</label>
      <input
        value={value}
        name={name}
        id={name}
        type="text"
        className="form-control"
        onChange={onChange}
        // ref={this.username}
      />
    </div>
  );
};

export default Input;
