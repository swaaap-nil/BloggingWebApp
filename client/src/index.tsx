import * as React from 'react';
import * as ReactDOM from 'react-dom/client';
import './index.css';
// @ts-ignore
import App from './App';
import { createRoot } from 'react-dom/client';
import { Auth0Provider } from '@auth0/auth0-react';
import './assets/scss/base.scss'
import 'antd/dist/antd'
import '@quasar/extras/ionicons-v4/ionicons-v4.css'
const auth0Domain = process.env.REACT_APP_AUTHO_DOMAIN?.toString() || "";
const auth0CLientID = process.env.REACT_APP_AUTHO_CLIENT_ID?.toString() || "";

const root = ReactDOM.createRoot(document.getElementById('root')!);
root.render(
            <Auth0Provider
                     domain= {auth0Domain}
                     clientId= {auth0CLientID}
                     authorizationParams={{
                     redirect_uri: window.location.origin
                     }}
             >
            <App />
         </Auth0Provider>
      
  
);


