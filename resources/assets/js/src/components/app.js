import React, {Component} from 'react';
import Base from './base';

import Sidebar from './partial/sidebar';
import Header from './partial/header';
import Footer from './partial/footer';
import Confirm from './common/confirm';
import Message from './common/message';

import AuthAction from '../actions/auth';
import AuthStore from '../stores/auth';

import MessageAction from '../actions/message';
import MessageStore from '../stores/message';


export default class App extends Base { 

	constructor(props, context){
		super(props, context);
		this.state = {
			user: AuthStore.getDefaultData(),			
			name:'',
			password:'',
			message: MessageStore.getDefaultData()
		}		
	}	

	componentWillMount(){
		this.listenTo(AuthStore,this.onStoreUpdate);
		this.listenTo(MessageStore,this.onMessageUpdate);
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
	
	onStoreUpdate(data){
		if(data.msg){
			MessageAction.show(data.msg,'danger')
		}		
		this.setState({
            user: data           
        });
	}

	onMessageUpdate(data){		
		this.setState({
            message:data          
        });
	}

	doLogin(event){
		if(event)event.preventDefault();				
		AuthAction.login({name:this.state.name,password:this.state.password});
	}

	hideMessageComponent(e){
		if(e)e.preventDefault();
		MessageAction.hide();
	}

	getMessageComponent(data){			
		if(!data || data.msg == ''){
			return null;
		}
		let messageProps = {
			msg:data.msg,
			type:data.type,
			hideMessage: this.hideMessageComponent
		}		
		return (
				<Message {...messageProps} ></Message>
			);
	}

	render(){	
		let {user,name,password,message}= this.state;		
		if(user.isLoggedIn){
			return (			
			<div className="wrapper">
				<Header/>
					<Sidebar />
					<div className="content-wrapper">
					{this.getMessageComponent(message)}					
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
							{this.getMessageComponent(message)}				
							<div className="form-group has-feedback" style={{'margin-top':'15px'}}>
								<input type="text" className="form-control" required placeholder="账户" onChange={(e)=>this.setState({name:e.target.value})}/>
								<span className="glyphicon glyphicon-envelope form-control-feedback"></span>
							</div>
							<div className="form-group has-feedback">
								<input type="password" className="form-control" required placeholder="密码" onChange={(e)=>this.setState({password:e.target.value})}/>
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