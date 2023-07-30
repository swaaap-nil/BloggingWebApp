import React,{useEffect, useState} from "react";
import promiseToGetCorrectUrl from "../customFunctions/async-fetch-handler";

// interface chunkType{
//     subheading :string
//     content : string
//     image : string
// }
//chunk image size https://picsum.photos/600/330
function EachChunk(props){
   const currentChunk = props.eachChunk
   console.log("rendering chunk: "+ currentChunk.title)

   const[chunkImageUrl,setChunkImageUrl] = useState('')

   useEffect(()=>
   {    
        //if image exists
       if(currentChunk.image!=''){
        
            const promise = promiseToGetCorrectUrl(currentChunk.image)
            promise.then((returnedUrl)=>{
            if(returnedUrl!=""){
                console.log("generatedImageUrl,so Re-rending Component")
                setChunkImageUrl(returnedUrl)
        }
        else
        console.log("recieved empty url for chunk: ", currentChunk.title)
   })}
   },[])

   return(
   <>
    <div className='chunk-subheading'>
        {currentChunk.subheading}
    </div>
    
    <div className="chunk-image">
        <img src={chunkImageUrl}/>
    </div>

    <div className="chunk-content">
        {currentChunk.content}
    </div>

    </>

    )
}


export default EachChunk