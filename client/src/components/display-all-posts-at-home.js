import React from "react";
import  EachPost  from "./render-each-post-for-home";

const AllPosts = React.memo((props) => {
  console.log("Rendering AllPosts....");
  
  const componentsArray = props.postsArray.map((eachPost) => (
    <EachPost key={eachPost.title} eachPost={eachPost} />
  ));

  return (
    <div className="posts-container">
            {componentsArray}
    </div>
  );
});

export default AllPosts;
