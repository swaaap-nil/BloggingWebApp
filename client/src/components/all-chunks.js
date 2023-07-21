import React from "react";
import  {EachChunk}  from "./";

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
