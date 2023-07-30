import React from "react";
import  EachChunk from "./each-chunk"

export default function AllChunks(props){
    

    const componentsArray =  props.chunksArray.map((eachChunk)=>
        
            <div >
                <EachChunk eachChunk = {eachChunk}/>
            </div>
        
    )

    return(
        <div>
            {componentsArray}
        </div>
    )
}
