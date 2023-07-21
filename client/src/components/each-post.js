import React from "react";
import { Link } from "react-router-dom";

function EachPost(props){

    const randomImage = () =>{
        return 'https://picsum.photos/330/205'
    }
    const currentPost = props.eachPost


    //Rendering an array of all the tags
    const renderedTagsArray =  currentPost.categories.map(
        (eachCategory)=>
        <span className="tag-border">
            {eachCategory}
        </span>
)


    return(
   
    <div className='blog-post'>

        <Link to = {`/blog/${encodeURIComponent(currentPost.title)}`}>
        <div className='thumbnail'>
        <img className='img' src={randomImage()}/>
        </div>

        <div className='name-date-container'>
        {currentPost.author}-{currentPost.date}
        </div>
        
        <h5 className="title">
            {currentPost.title}
        </h5>
        
        <p className="description">
            {currentPost.description}
        </p>
        
        <div className='tags-container'>
            {renderedTagsArray}
        </div>
        </Link>
        
    </div>

    )
}



export default EachPost