
import Navigation from './components/navigation-bar.js';
import {BrowserRouter as Router,Route,Routes} from 'react-router-dom'
import React from 'react'
import Home from './pages/home.jsx';
import Blog from './pages/blogsList.tsx';
import Upcoming from './pages/upcoming.tsx';
import BlogContent from './pages/blog-content.tsx';
import Error404Page from './pages/error-404.tsx'
import WriteBlog from './pages/write-blog.tsx'
import PostAdded from './components/post-added.tsx';
import NotAllowed from './components/not-allowed-403.tsx';
import './index.css';
import {ApolloProvider } from '@apollo/client';
import Footer from "./components/footer.js"
import { ApolloClientConfig } from './config.ts';
import { useAuth0 } from "@auth0/auth0-react";

//default context is not logged in
export const AuthenticationContext = React.createContext(false);

export default function App() {
  const { user, isAuthenticated, isLoading } = useAuth0();

  return (
    <ApolloProvider client={ApolloClientConfig}>
      <AuthenticationContext.Provider value = {isAuthenticated}> 
        <Router>
          <div className="App">
            <Navigation user = {user}/>
              <Routes>
                <Route path="/" element = {<Home/>}/>
                <Route path="/blog" element = {<Blog/>}/>
                <Route path="/contact" element = {<Upcoming/>}/>
                <Route path="/blog/:title" element={<BlogContent/>} />
                <Route path="/*" element={<Error404Page/>}/>
                <Route path='/write' element ={<WriteBlog/>} />
                <Route path='/posted' element = {<PostAdded/>}/>
                <Route path='/error-403' element = {<NotAllowed/>}/>
              </Routes>
              <Footer className="px-0"/>
          </div>
        </Router>
    </AuthenticationContext.Provider>
    </ApolloProvider>
    );
  }





