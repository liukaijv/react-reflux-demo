import React from 'react';
import Base from '../base';

export default class Header extends Base {
	render(){
		return (
				<footer className="main-footer">
				    <div className="pull-right hidden-xs">
				      <b>Version</b> 2.3.3
				    </div>
				    <strong>Copyright &copy; 2014-2015</strong> All rights reserved.
				  </footer>
			);
	}
}
