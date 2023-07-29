import React from "react";
import { EachPost } from ".";

const AllPosts = React.memo((props) => {
  console.log("render AllPosts called. props = "+JSON.stringify(props));
  
  const componentsArray = props.postsArray.map((eachPost) => (
    <EachPost key={eachPost.title} eachPost={eachPost} />
  ));

  return (
    <div className="grid grid-cols-4 justify-center">
      {componentsArray}
    </div>
  );
});

export default AllPosts;
