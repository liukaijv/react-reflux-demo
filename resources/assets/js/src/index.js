import React from 'react';
import 'babel-polyfill';
import ReactDOM from 'react-dom';
import {Router, hashHistory } from 'react-router';

import Routes from './routes';

//css
import './assets/css/bootstrap.css';
import './assets/css/font-awesome.css';
import './assets/css/AdminLTE.css';
import './assets/css/skins/_all-skins.css';
import './assets/css/simditor.css';
import './styles/app.css';
//js
import './assets/js/bootstrap.js';
import './assets/js/app.js';

ReactDOM.render(	
	<Router history={hashHistory } routes={Routes}>		
	</Router>,
	document.getElementById('app')
);