import React from 'react';

import { gql , useQuery } from '@apollo/client';

export default function Blog() {

      const getPostsQuery = gql`
          query {
                    getPosts {
                    title
                    author
                    description
                    categories
                  }
          }
      `;
      const { loading, error, data } = useQuery(getPostsQuery);
      console.log("error =", error);
      console.log("loading =", loading);
      console.log("data =",data);
  
  //TODO
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error : {error.message}</p>;
  

  const postsArray = data.getPosts;
  const firstPost = postsArray[0]
  const tags = firstPost.categories

  return  <div className='blog-post'>

           <div className='thumbnail'>
                <img className='img' src='https://i.imgur.com/rQjt0IH.jpeg'/>
            </div>

            <div className='name-date-container'>
              Swapnil Suman-19 Jan 2023
            </div>

            <div className='title'>
              title
            </div>

            <div className='description'>
            Dig out information from the web using advanced search queries in the search bar.
            </div>

            <div className='tags-container'>
                
                <div className='tag-border'  >
                  Google
                </div>

                <div className='tag-border'  >
                  Technology
                </div>

                <div className='tag-border'  >
                  Privacy
                </div>
            </div>
          
          </div>
}
