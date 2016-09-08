import React from 'react';
import Base from '../base';

import {Link} from 'react-router';

import AuthStore from '../../stores/auth';
import AuthAction from '../../actions/auth';

export default class Header extends Base {

	constructor(props, context){
		super(props, context);
		this.state = {
			user: AuthStore.getDefaultData()
		}		
	}	

	componentWillMount(){
		this.listenTo(AuthStore,this.onStoreUpdate);
	}

	onStoreUpdate(user){
		this.setState({
            user: user           
        });
	}

	logout(event){
		event.preventDefault();
		AuthAction.logout();
	}

	render(){
		let {user} = this.state,
		    userImage = user.image.startsWith('http')?user.image:`http://115.28.223.2:9000${user.image}`;
		return (
				<div className="main-header">
					<Link to="index" className="logo">				     
				      <span className="logo-mini">React</span>				   
				      <span className="logo-lg"><b>React</b> reflux demo</span>
				    </Link>
				    <nav className="navbar navbar-static-top">
				    	<a role="button" data-toggle="offcanvas" className="sidebar-toggle" href="#">
					       <span className="sr-only">Toggle navigation</span>
					    </a>
					    <div className="navbar-custom-menu">
					    	<ul className="nav navbar-nav">
					    		<li className="user user-menu">
					    			<a>
	              					<img alt="" className="user-image" src={userImage}/>	              					
	              					<span className="hidden-xs">{user.name}</span> 
	              					</a>
						        </li>
					    		<li>
						            <a href="#" onClick={this.logout.bind(this)}><i className="fa fa-power-off"></i></a>
						        </li>
					    	</ul>
					    </div>
				    </nav>
				</div>
			);
	}
}
