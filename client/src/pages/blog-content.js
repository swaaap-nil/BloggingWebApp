import React,{useState,useEffect} from "react";
import promiseToGetCorrectUrl from "../customFunctions/async-fetch-handler";
import { useParams } from "react-router-dom";
import { getPostByTitleQuery } from "../assets/possibleQueries/possibleQueries";
import { useQuery } from "@apollo/client";
import AllChunks from "../components/display-all-chunks"
import { Skeleton } from 'antd';

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
                console.log("generated ImageUrl Sucessfully,so Re-rending Component")
                setHeadImageUrl(returnedUrl)
            }
            else console.log("recieved empty url")
            })
        }
    },[data])

    if (loading) 
        return <Skeleton active />;
    if (error) 
        return <p>Error: {error.message}</p>;


    post = data?.getPostByTitle

    return <div className="main-dabba">
            
            <div className="complete-post">

                <div className="blog-heading">
                  {post.title}
                </div>

                <div className="author-and-date">
                  by {post.author} on {post.date} 
                </div>

                  <img className="head-image" src={headImage}/>
               

                <div className="introduction-paragraph">
                  {post.introduction}
                </div>

                <div className="chunks-container">
                  <AllChunks chunksArray= {post.content}/>
                </div>

            </div>
    </div>
}