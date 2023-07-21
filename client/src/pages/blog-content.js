import React from "react";
import { useParams } from "react-router-dom";
import { getPostByTitleQuery } from "../assets/possibleQueries/possibleQueries";
import { useQuery } from "@apollo/client";
import AllChunks from "../components/all-chunks"

export default function BlogContent(){
    const {title} = useParams();
    
    const {loading,error,data} = useQuery(getPostByTitleQuery,{variables : {title}})
    const post = data?.getPostByTitle
    

    console.log("error =", error);
    console.log("loading =", loading) ;
    console.log("data =",data);

    if (loading) {
        return <p>Loading...</p>;
      }
    
      if (error) {
        return <p>Error: {error.message}</p>;
      }

      const AAllChunks = [
        {
          subheading : "chunk1",
          content : "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
        },
        
        {
          subheading : "chunk2",
          content : "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
        },
        
        { subheading : "chunk3",
          content : "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
        },

        {  subheading : "chunk4",
          content : "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
        },

        
      ];

    return <div className="main-dabba">
            
            <div className="blog-post">

                <div className="blog-heading">
                  {post.title}
                </div>

                <div className="author-and-date">
                  by {post.author} on {post.date} 
                </div>

                <div className="heading-image">
                  <img src='https://picsum.photos/900/449'/>
                </div>

                <div className="introduction-paragraph">
                {post.description}
                </div>

                <div className="chunks-container">
                  <AllChunks chunksArray= {post.content}/>
                </div>

            </div>
    </div>
}