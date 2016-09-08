import axios from 'axios';

let instance = axios.create({
	baseURL: 'backend'
});

instance.interceptors.request.use(function (config) {
	let token = sessionStorage.getItem('jwt_token');
	if (token !== null && token !== 'undefined') {
		config.headers.Authorization = token;
	}		
	return config;
}, function (error) {
	return Promise.reject(error);
});


instance.interceptors.response.use(function (response) {	
	if (response.status && response.status.code === 401) {
		sessionStorage.removeItem('jwt_token');
	}
	if (response.headers && response.headers.Authorization) {
		sessionStorage.setItem('jwt_token', response.headers.Authorization);
	}	
	return response;
}, function (error) {

	return Promise.reject(error);
});

export default instance;