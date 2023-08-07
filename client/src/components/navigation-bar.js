import React,{useState} from 'react';
import { Link } from 'react-router-dom';

import { UserOutlined } from '@ant-design/icons';
import { Avatar } from 'antd';


//so that we can use react libaries

const navLinks = [
    {
        title : 'Home',
        path : '/'
    },
    {
        title : 'Blog',
        path : '/blog'
    },
    {
        title : 'Upcoming',
        path : '/contact'
    }, 
    {
        title : 'Login',
        path : '/login'
    },
    {
        title : "Write Blogs",
        path : "/write"
    },
]
// The navigation function here is a react comopnent created by us
export default function Navigation ({user}) {

     const [menuActive,setMenuActive]= useState(false)


    return ( 
    <nav className= "site-navigation">
        <span className='menu-title'>
            <Link to = {`/`} >
            Wasseypur Journals
            </Link>
        </span>  
        <div className={`menu-content-container ${menuActive && 'active'}`}>
                <ul>
                    { navLinks.map ((link,index) => (
                        <li key = {index} onClick={()=>setMenuActive(false)}>
                            <Link to = {link.path}>{link.title}</Link>
                        </li>

                    ))
                        }
                </ul>

                <span className='avatar'>
                        <Avatar
                        style={{
                        backgroundColor: '#87d068',
                        }}
                            icon={<UserOutlined />}
                    /> 
                    <span>  {user.firstName} {user.lastName}</span> 
                </span>

        </div>
        <i className='ionicons icon ion-ios-menu' onClick={()=>setMenuActive(!menuActive)}/>
         
    </nav> );
}

