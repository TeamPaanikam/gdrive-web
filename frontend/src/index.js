import React from 'react';
import ReactDOM from 'react-dom';
import Header from './Header';
import './index.css';
import Body from './Body';
import {Switch, Route} from 'react-router';
import { BrowserRouter } from 'react-router-dom';
import Status from './Status';


ReactDOM.render(
  <div>
    <BrowserRouter>
  <Header />
  <Switch>
    <Route exact path='/' component={Body} />
    <Route exact path='/status' component={Status} />
  </Switch>
    </BrowserRouter>
  </div>, 
  document.getElementById('root')
);