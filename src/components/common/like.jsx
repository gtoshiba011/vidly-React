import React from "react";

// Input: liked: Boolean
// Output: onClick

const Like = ({ liked, onLike }) => {
  let classes = "fa fa-heart";
  classes += liked ? "" : "-o";
  return (
    <i
      className={classes}
      onClick={onLike}
      style={{ cursor: "pointer" }}
      aria-hidden="true"
    ></i>
  );
};

export default Like;
