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

const root = ReactDOM.createRoot(document.getElementById('root')!);
root.render(
            <Auth0Provider
                     domain="dev-qago73s6t0jlks2g.us.auth0.com"
                     clientId="jxmEEDGgRH8D0qCGz9NPCrzj2tqSE3ro"
                     authorizationParams={{
                     redirect_uri: window.location.origin
                     }}
             >
            <App />
         </Auth0Provider>
      
  
);


