
import React,{useEffect, useState} from "react";
import promiseToGetCorrectUrl from "../customFunctions/async-fetch-handler";

//generating each chunk of [ subheading , image , and content ]
const EachChunk= (props)=>{
                            const currentChunk = props.eachChunk
                            console.log("rendering chunk: "+ currentChunk.title)
                            const[chunkImageUrl,setChunkImageUrl] = useState('')
                        
                            useEffect(()=>
                            {    
                                //if image exists
                                if(currentChunk.image!=''){
                                    promiseToGetCorrectUrl(currentChunk.image)
                                    .then((returnedUrl)=>{
                                                if(returnedUrl!=""){
                                                    console.log("generatedImageUrl,so Re-rending Component")
                                                    setChunkImageUrl(returnedUrl)
                                }
                                else
                                console.log("recieved empty url for chunk: ", currentChunk.title)
                            })}
                            },[])
                        
                            return(
                            <div className="chunk">
                                <div className='chunk-subheading'>
                                    {currentChunk.subheading}
                                </div>
                                
                                    <img className="chunk-image" src={chunkImageUrl}/>
                               
                                <div className="chunk-contenta">
                                    
                                    {currentChunk.content}
                                </div>
                            </div>
                        )
                    }
 
 

export default function AllChunks({chunksArray}){
    
    const componentsArray =  chunksArray.map((eachChunk)=>
            <EachChunk eachChunk = {eachChunk}/>
        
    )

    return(
            <>
                {componentsArray}
            </>    
    )
}
