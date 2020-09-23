import React from "react";
import "./Post.css";
function Post({ title, content }) {
  return (
    <div className="post">
      <h1> {title} </h1>
      <div className="post__content">{content} </div>
    </div>
  );
}

export default Post;
