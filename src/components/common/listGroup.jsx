import React from "react";

const ListGroup = ({
  items,
  keyProperty,
  valueProperty,
  selectedItem,
  onItemSelect
}) => {
  return (
    <ul className="list-group">
      {items.map(item => (
        <li
          key={item[keyProperty]}
          className={
            item[valueProperty] === selectedItem[valueProperty]
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

ListGroup.defaultProps = {
  keyProperty: "_id",
  valueProperty: "name"
};

export default ListGroup;
