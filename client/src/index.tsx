import * as React from 'react';
import * as ReactDOM from 'react-dom/client';
import './index.css';
// @ts-ignore
import App from './App';
import './assets/scss/base.scss'
import 'antd/dist/antd'
import '@quasar/extras/ionicons-v4'


const root = ReactDOM.createRoot(document.getElementById('root')!);
root.render(
  <React.StrictMode>
    
    <App />
    
  </React.StrictMode>
);


