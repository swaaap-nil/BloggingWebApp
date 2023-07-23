import React, { useState } from 'react';
import moment  from 'moment';
import { useQuery } from '@apollo/client';
import AllPosts from "../components/all-posts"
import { Pagination } from 'antd';
import { getPostsQuery } from '../assets/possibleQueries/possibleQueries';



export default function Home() {

    //UseState hook to implement pagination
    const[currentPage,setCurrentPage]=useState(1)
    const[postsPerPage,setPostsPerPage] = useState(4) 
 
  //use query is a apollo react asyncnous hook
  // TODO keep it in seperate file and make sure to return asyncronously that is return only when data from query is ready 
  const { loading, error, data } = useQuery(getPostsQuery);
  console.log("error =", error);
  console.log("loading =", loading);
  console.log("data =",data);

  
  //TODO
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error : {error.message}</p>;

  //data && makes sure to render the Allposts Component only when data is defined and ready
   
  const lastPostIndex = currentPage * postsPerPage  
  const firstPostIndex = lastPostIndex - postsPerPage

   //handling pagination
   const currentPosts = data.getPosts.slice(firstPostIndex,lastPostIndex)
         
   const handlePageChange = (pageNumber,pageSize)=>  {
     setCurrentPage(pageNumber)
   }
 
  return (    
     
    <main>
          <div className='home' class = "mt-16">
            
            <div className='heading-super-script'>
                The blog
            </div>


           <div className='heading-main'>
                Writings From our team
            </div>


            <div className='heading-sub-script'>
                The latest industry news,interviews,technlogies,and resources.
            </div>


            <div className='banner'>
                <img className='banner' src='https://picsum.photos/1920/600'/>
            </div>


            <div>
                {data && <AllPosts postsArray = {currentPosts}/>}
            </div>


            <div className='pagination'>
                <Pagination defaultCurrentcurrent={1}  onChange={handlePageChange} total={data.getPosts.length} pageSize={postsPerPage}/>
            </div>

            

          </div> 
    </main>
  )
}
