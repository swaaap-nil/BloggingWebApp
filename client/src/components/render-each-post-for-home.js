import React, { memo, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import promiseToGetCorrectUrl from "../customFunctions/async-fetch-handler";

const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;

function EachPost(props){
    const currentPost = props.eachPost
    console.log("rendering post: "+ currentPost.title)

    const[thumbnailUrl,setThumbNailUrl] = useState('')
    
    useEffect(() => {
      const fetchData = async () => {
        try {
          const returnedUrl = await promiseToGetCorrectUrl(currentPost.thumbnail);
          if (returnedUrl !== "") {
            setThumbNailUrl(returnedUrl);
          } else {
            console.log("Received empty URL");
          }
        } catch (error) {
          console.error("Error fetching image:", error.message);
        }
      };
    
      fetchData(); 
    
    }, []);

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
        
        <div className="thumbnail">
                {thumbnailUrl ? (
                <img className="thumbnail" src={thumbnailUrl} alt="Thumbnail" />
                ) : (
                    <Spin style={{ position: "relative", top: "50%", left: "50%" }} indicator={antIcon} />
                
                )}
             </div>

                <div className='name-date-container'>
                {currentPost.author} · {currentPost.date}
                </div>
                
                <div className="title">
                    {currentPost.title}
                </div>
                
                <div className="description">
                    {currentPost.description}
                </div>
                
                <div className='tags-container'>
                    {renderedTagsArray}
                </div>
        </Link>
        
    </div>

    )
}

export default memo( EachPost)