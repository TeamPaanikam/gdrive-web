import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import Header from './Header';
import './index.css';
import Body from './Body';
ReactDOM.render(
  <div>
  <Header />
    <Body/>  
  </div>, 
  document.getElementById('root')
);
