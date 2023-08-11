import React, { useState,useRef } from 'react';
import { useQuery } from '@apollo/client';
import { AllPosts } from '../components';
import { LoadingOutlined } from '@ant-design/icons';
import { Spin } from 'antd';
import { Pagination } from 'antd';
import { getPostsQuery } from '../assets/possibleQueries/possibleQueries';

const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;
 function Home() {
  console.log("home component render called")
    //UseState hook to implement pagination
  const[currentPage,setCurrentPage]=useState(1)
  const[postsPerPage,setPostsPerPage] = useState(4) 
  
  
 
  //use query is a apollo react asyncnous hook
  // TODO keep it in seperate file and make sure to return asyncronously that is return only when data from query is ready 
  const { loading, error, data } = useQuery(getPostsQuery,{
    onCompleted: (data) => {
      console.log("Data fetched from useQuery:", data);
    },
  });
  // console.log("error =", error);
  // console.log("loading =", loading);
  // console.log("data =",data);
  
  //TODO
  if (loading)
   return <Spin className='loading-page' indicator={antIcon} />;
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
          <div className='home' class ='mt-8'>
            
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
                <img className='banner' src={`https://picsum.photos/1920/600`}/>
            </div>

            {data && <AllPosts postsArray = {currentPosts}/>}


            <div className='pagination'>
                <Pagination defaultCurrentcurrent={1}  onChange={handlePageChange} total={data.getPosts.length} pageSize={postsPerPage}/>
            </div>

            

          </div> 
    </main>
  )
}

export default Home
