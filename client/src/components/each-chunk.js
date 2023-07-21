import React from "react";

function EachChunk(props){

    const currentChunk = props.eachChunk
   return(
   <>
    <div className='chunk-subheading'>
        {currentChunk.subheading}
    </div>
    
    <div className="chunk-image">
        <img src='https://picsum.photos/600/330'/>
    </div>

    <div className="chunk-content">
        {currentChunk.content}
    </div>

    </>

    )
}


export default EachChunk