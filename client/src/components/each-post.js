import React, { memo, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import promiseToGetCorrectUrl from "../customFunctions/async-fetch-handler";

function EachPost(props){
    const currentPost = props.eachPost
    console.log("rendering post: "+ currentPost.title)

    const[thumbnailUrl,setThumbNailUrl] = useState('https://picsum.photos/330/205')
    
    useEffect(()=>
    {
        const promise = promiseToGetCorrectUrl(currentPost.thumbnail)
        promise.then((returnedUrl)=>{
        if(returnedUrl!=""){
            console.log("generatedImageUrl,so Re-rending Component")
            setThumbNailUrl(returnedUrl)
        }else
        console.log("recieved empty url")
    })
    },[])

    //Rendering an array of all the tags
    const renderedTagsArray =  currentPost.categories.map(
        (eachCategory)=>
        <span key={eachCategory} className="tag-border">
            {eachCategory}
        </span>
)
    return(
   
    <div className='blog-post'>

        <Link to = {`/blog/${encodeURIComponent(currentPost.title)}`}>
        
                <div className='thumbnail'>
                    <img className='img' src={thumbnailUrl}/>
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

export default memo( EachPost)