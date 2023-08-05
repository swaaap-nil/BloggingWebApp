

import Navigation from './components/navigation-bar.js';
import {BrowserRouter as Router,Route,Routes} from 'react-router-dom'
import React from 'react'
import Home from './pages/home.js';
import Blog from './pages/blogsList.js';
import Login from './pages/login.tsx';
import Upcoming from './pages/upcoming.tsx';
import BlogContent from './pages/blog-content.js'
import Error404Page from './pages/error-404.js'
import WriteBlog from './pages/write-blog.tsx'
import PostAdded from './components/post-added.tsx';
import NotAllowed from './components/not-allowed-403.tsx';
import './index.css';

import Footer from './components/footer.js';



import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';

const client = new ApolloClient({
  uri: 'http://localhost:4000/graphql',
  cache: new InMemoryCache(),
});


const user = {
  firstName : 'Swapnil',
  lastName : "Suman"
};


export default function App() {
  return (
    <ApolloProvider client={client}> 
    <Router>
      <div className="App">
        <Navigation user = {user}/>
        
        <Routes>
          <Route path="/" element = {<Home/>}/>
          <Route path="/blog" element = {<Blog/>}/>
          <Route path="/contact" element = {<Upcoming/>}/>
          <Route path="/login" element = {<Login/>}/>
          <Route path="/blog/:title" element={<BlogContent/>} />
          <Route path="/*" element={<Error404Page/>}/>
          <Route path='/write' element ={<WriteBlog/>} />
          <Route path='/posted' element = {<PostAdded/>}/>
          <Route path='/error-403' element = {<NotAllowed/>}/>
        </Routes>
        <Footer/>
        
      </div>
    </Router>
    </ApolloProvider>
    );
  }





