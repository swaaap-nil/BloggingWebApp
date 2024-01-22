import React from 'react';
import AllPosts from "../components/display-all-posts-at-home"
import { useQuery } from '@apollo/client';
import { getPostsQuery } from '../assets/possibleQueries/possibleQueries';

export default function Blog() {

      
      const { loading, error, data } = useQuery(getPostsQuery);
      // console.log("error =", error);
      // console.log("loading =", loading);
      // console.log("data =",data);
  
  //TODO
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error : {error.message}</p>;
  

  const postsArray = data.getPosts;

  return  <div>
              {data && <AllPosts postsArray = {postsArray}/>}
          </div>  
}
