import React,{useState,useEffect} from "react";
import promiseToGetCorrectUrl from "../customFunctions/async-fetch-handler";
import { useParams } from "react-router-dom";
import { getPostByTitleQuery } from "../assets/possibleQueries/possibleQueries";
import { useQuery } from "@apollo/client";
import AllChunks from "../components/all-chunks"

export default function BlogContent(){
    const {title} = useParams();
    let post;
    const[headImage,setHeadImageUrl] = useState('https://picsum.photos/900/449')
    const {loading,error,data} = useQuery(getPostByTitleQuery,{variables : {title}})
     
    // console.log("error =", error);
    // console.log("loading =", loading) ;
    // console.log("data =",data);
    
    //once data is fetched start fetching img from AWS
    useEffect(()=>
    {
        if(data)
        {
            console.log("Post Fetched :",data)
            const promise = promiseToGetCorrectUrl(post.headImage)
            promise.then((returnedUrl)=>{
            if(returnedUrl!=""){
                console.log("generated ImageUrl Successfully,so Re-rending Component")
                setHeadImageUrl(returnedUrl)
            }
            else console.log("recieved empty url")
            })
        }
    },[data])

    if (loading) 
        return <p>Loading...</p>;
    if (error) 
        return <p>Error: {error.message}</p>;


    post = data?.getPostByTitle

    return <div className="main-dabba">
            
            <div className="blog-post">

                <div className="blog-heading">
                  {post.title}
                </div>

                <div className="author-and-date">
                  by {post.author} on {post.date} 
                </div>

                <div className="heading-image">
                  <img src={headImage}/>
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