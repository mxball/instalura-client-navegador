import React from 'react';
import ReactDOM from 'react-dom';
import Timeline from './Timeline';
import Login from './Login';
import './css/reset.css';
import './css/index.css';
import {Router, Route} from 'react-router'
import {browserHistory} from 'react-router'


ReactDOM.render((
	<Router history={browserHistory}>
    	<Route path="/" component={Login}/>	    	    	
    	<Route path="/timeline" component={Timeline}/>	    	
    </Router>
), document.getElementById('root'));

