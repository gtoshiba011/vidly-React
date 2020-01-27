import React from "react";

const ListGroup = props => {
  const {
    items,
    keyProperty,
    valueProperty,
    currentItem,
    onItemSelect
  } = props;

  return (
    <ul className="list-group">
      {items.map(item => (
        <li
          key={item[keyProperty]}
          className={
            item[valueProperty] === currentItem
              ? "list-group-item active"
              : "list-group-item"
          }
          onClick={() => onItemSelect(item)}
        >
          {item[valueProperty]}
        </li>
      ))}
    </ul>
  );
};

export default ListGroup;
