import Reflux from 'reflux';

import AuthActions from '../actions/auth';
import {
	LOGIN_URL, 
	ADMIN_INFO_URL
} from '../api/const';

import api from '../api';

const defaultUser = {
	id: '',
	name: '',
	email: '',
	image: '',
	isLoggedIn: false,
	msg: ''  
};

let currentUser = Object.assign({}, defaultUser);

export default Reflux.createStore({	
	listenables: AuthActions,
	init(){
		let token = sessionStorage.getItem('jwt_token'),
			authInfo = sessionStorage.getItem('auth_info');
		if(token && authInfo){			
			authInfo = JSON.parse(authInfo);
			currentUser = {
				id: authInfo.id,
				name: authInfo.name,		                
				email: authInfo.email,
				image: authInfo.image,
				isLoggedIn: true	
			}
			this.trigger(currentUser)
		}else{
			currentUser = Object.assign({}, defaultUser);
			this.trigger(currentUser);
		}
	},
	onLogin(data){
		api.post(LOGIN_URL,data).then(function(result){	
			let data = result.data;	
			if(data.jwt_token && data.flag == true){
				let authInfo = data.data;
				sessionStorage.setItem('jwt_token',data.jwt_token);	
				sessionStorage.setItem('auth_info',JSON.stringify(authInfo));
				currentUser = {
					id: authInfo.id,
					name: authInfo.name,		                
					email: authInfo.email,
					image: authInfo.image,
					isLoggedIn: true	
				}
				this.trigger(currentUser)
				window.location.reload()				
			}else{
				currentUser = Object.assign({}, defaultUser, {msg:data.msg});
				this.trigger(currentUser);				
			}			
			
		}.bind(this));
	},
	onLogout(){		
		sessionStorage.removeItem('jwt_token');	
		sessionStorage.removeItem('auth_info');	
		currentUser = Object.assign({}, defaultUser);
		this.trigger(currentUser);
	},
	getDefaultData(){
		return currentUser;
	}
});
