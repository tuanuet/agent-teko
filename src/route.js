import React from 'react';
import { Router, BrowserRouter } from 'react-router-dom';
import App from './container/App/App';


export default (
    <Router path="/" component={App}>
        <Route  component={App}/>
    </Router>
);
