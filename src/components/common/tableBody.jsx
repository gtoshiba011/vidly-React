import React, { Component } from "react";
import { Link } from "react-router-dom";
import _ from "lodash";

// movies: array
// onLike: func
// onDelete: func

class TableBody extends Component {
  renderCell = (item, column) => {
    if (column.content) return column.content(item);
    else return _.get(item, column.path);
  };

  createColumnKey = (item, column) => {
    return item._id + (column.path || column.key);
  };

  render() {
    const { data, columns } = this.props;

    return (
      <tbody>
        {data.map(item => (
          <tr key={item._id}>
            {/* cannot use bracket notation item[column.path] here for nested key */}
            {columns.map(column => (
              <td key={this.createColumnKey(item, column)}>
                {this.renderCell(item, column)}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    );
  }
}

export default TableBody;
