

import Navigation from './components/navigation.js';
import {BrowserRouter as Router,Route,Routes} from 'react-router-dom'
import React from 'react'
import Home from './pages/home.js';
import Blog from './pages/blogsList.js';
import Login from './pages/login.js';
import Contact from './pages/contact.js';
import BlogContent from './pages/blog-content.js'
import Error404Page from './pages/error-404.js'
import WriteBlog from './pages/write-blog.tsx'
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
          <Route path="/contact" element = {<Contact/>}/>
          <Route path="/login" element = {<Login/>}/>
          <Route path="/blog/:title" element={<BlogContent/>} />
          <Route path="/*" element={<Error404Page/>}/>
          <Route path='/write' element ={<WriteBlog/>} />
        </Routes>
        <Footer/>
        
      </div>
    </Router>
    </ApolloProvider>
    );
  }





