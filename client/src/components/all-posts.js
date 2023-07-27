import React from "react";
import  {EachPost}  from ".";

export default function AllPosts(props){
    
    console.log("postsArray =", props.postsArray);
    console.log("type of postsArray =", typeof props.postsArray);
    const componentsArray =  props.postsArray.map((eachPost)=>
        
            <div >
                <EachPost eachPost = {eachPost}/>
            </div>
        
    )

    return(
        <div class = " grid grid-cols-4 justify-center ">
            {componentsArray}
        </div>
    )
}
