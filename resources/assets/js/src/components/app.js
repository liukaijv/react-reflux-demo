import React, {Component} from 'react';
import Base from './base';

import Sidebar from './partial/sidebar';
import Header from './partial/header';
import Footer from './partial/footer';
import Confirm from './common/confirm';

import AuthAction from '../actions/auth';
import AuthStore from '../stores/auth';


export default class App extends Base { 

	constructor(props, context){
		super(props, context);
		this.state = {
			user: AuthStore.getDefaultData(),			
			name:'',
			password:''			
		}		
	}	

	componentWillMount(){
		this.listenTo(AuthStore,this.onStoreUpdate);
	}

	componentDidMount() {      
        document.addEventListener('keyup', this.onKeyUp);
    }

    componentWillUnmount() {
        document.removeEventListener('keyup', this.onKeyUp);
    }

    onKeyUp(e) {       
        if (e.keyCode === 13) {
            this.doLogin();
        }
    }
	
	onStoreUpdate(user){
		this.setState({
            user: user           
        });
	}

	doLogin(event){
		if(event)event.preventDefault();		
		AuthAction.login({name:this.state.name,password:this.state.password});
	}

	render(){	
		let {user,name,password}= this.state;			
		
		if(user.isLoggedIn){
			return (			
			<div className="wrapper">
				<Header/>
					<Sidebar />
					<div className="content-wrapper">
					{this.props.children}
					</div>
				<Footer />
			</div>			
			);	
		}else{
			return (
				<div className="login-page">
					<div className="login-box">		
						<div className="login-box-body">
							<form onSubmit={this.doLogin.bind(this)}>
							<p className="login-box-msg">Sign in to start your session</p>				
							<div className="form-group has-feedback">
								<input type="text" className="form-control" placeholder="账户" onChange={(e)=>this.setState({name:e.target.value})}/>
								<span className="glyphicon glyphicon-envelope form-control-feedback"></span>
							</div>
							<div className="form-group has-feedback">
								<input type="password" className="form-control" placeholder="密码" onChange={(e)=>this.setState({password:e.target.value})}/>
								<span className="glyphicon glyphicon-lock form-control-feedback"></span>
							</div>
							<div className="row">
								<div className="col-xs-8">							
								</div>
								<div className="col-xs-4">
									<button className="btn btn-primary btn-block btn-flat">登录</button>
								</div>
							</div>	
							</form>
						</div>
					</div>
				</div>
			);		
		}			
		
	}
}