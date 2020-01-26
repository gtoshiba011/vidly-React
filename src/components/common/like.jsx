import React from 'react';

// Input: liked: Boolean
// Output: onClick

const Like = (props) => {
  let classes = "fa fa-heart";
  classes += props.liked ? "" : "-o";
  return (
    <i
      className={classes}
      onClick={props.onLike}
      style={{ cursor: "pointer" }}
      aria-hidden="true"
    ></i>
  );
};

export default Like;
