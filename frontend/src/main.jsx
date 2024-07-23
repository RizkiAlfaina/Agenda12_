import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';

const API_URL = 'http://192.168.13.237:5000';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App apiUrl={API_URL} />
  </React.StrictMode>,
);
