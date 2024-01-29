import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { UserOutlined } from '@ant-design/icons';
import { Avatar, Menu, Dropdown } from 'antd';
import { useAuth0 } from "@auth0/auth0-react";
import { AuthenticationContext } from "../App";

const navLinks = [
  {
    title: 'Home',
    path: '/',
  },
  {
    title: 'Blog',
    path: '/blog',
  },
  {
    title: 'Upcoming',
    path: '/contact',
  },
  {
    title: 'Write Blogs',
    path: '/write',
  },
];

export default function Navigation({ user }) {
  const [menuActive, setMenuActive] = useState(false);
  const { logout,loginWithRedirect } = useAuth0();  
  
  const isAuthenticated = useContext(AuthenticationContext);

  const handleLogout = () => {
    // Implement your logout logic here
    logout({ logoutParams: { returnTo: window.location.origin } })
  };
  
  const handleLogin = () => {
    // Implement your logout logic here
    
    loginWithRedirect();
  };


  const AuthenticatedUser = (
    <Menu>
      <Menu.Item key="logout" onClick={handleLogout}>
        Logout
      </Menu.Item>
    </Menu>
  );

  const unAuthenticatedUser = (
    <Menu>
      <Menu.Item key="logout" onClick={handleLogin}>
        Login
      </Menu.Item>
    </Menu>
  );

  return (
    <nav className="site-navigation">
      <span className="menu-title">
        <Link to={`/`}>QuickQuill</Link>
      </span>

      <div className={`menu-content-container ${menuActive && 'active'}`}>
        <ul>
          {navLinks.map((link, index) => (
            <li key={index} onClick={() => setMenuActive(false)}>
              <Link to={link.path}>{link.title}</Link>
            </li>
          ))}
        </ul>

        {/* if user is authenticated show this */}
           {isAuthenticated && <Dropdown overlay={AuthenticatedUser} trigger={['hover','click']} placement="bottomRight">
          <span className="avatar">
            
            <span>{user?.name}</span>
            <Avatar src={user?.picture} icon={<UserOutlined />} style={{marginLeft : '4px'}}/>
            
            </span>
          </Dropdown>}
        
        {/* if user is not authenticated show this */}
          { !isAuthenticated &&<Dropdown overlay={unAuthenticatedUser} trigger={['hover','click']} placement="bottomRight">
          <span className="avatar">
            
            <span>{user?.name}</span>
            <Avatar style={{ backgroundColor: '#87d068',marginLeft : '4px' }} icon={<UserOutlined />} />
            
            </span>
          </Dropdown>}
          
        
      </div>
      <i className="ionicons icon ion-ios-menu" onClick={() => setMenuActive(!menuActive)} />
    </nav>
  );
}
