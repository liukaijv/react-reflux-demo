import React from 'react';
import Base from '../components/base';

export default class Tag extends Base {

	render(){
		return (
				<div>{this.props.children}</div>
			);
	}
}