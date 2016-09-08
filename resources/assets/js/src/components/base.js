import React, {Component, PropTypes}from 'react';
import { decorate as mixin } from 'react-mixin';
import { ListenerMixin } from 'reflux';
import { Router } from 'react-router';

@mixin(ListenerMixin)

class Base extends Component{	

	constructor(props, context){
		super(props, context);		
	}

	// static contextTypes = {
	// 	router: () => PropTypes.func
	// }	

	// redirect(route){		
	// 	this.context.router.push(route);
	// }

}

export default Base;