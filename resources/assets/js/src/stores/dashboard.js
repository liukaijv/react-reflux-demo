import Reflux from 'reflux';

import {DASHBOARD_URL} from '../api/const'
import api from '../api';

import DashboardActions from '../actions/dashboard';

const data = {
	posts_count:0,
	users_count:0,
	categories_count:0
}

export default Reflux.createStore({
	listenables: DashboardActions,	
	onIndex(){
		api.get(DASHBOARD_URL).then((result)=>{
			let data = result.data;
			if(data.flag == true){
				this.trigger(Object.assign(data,data.data));
			}else{
				this.trigger(Object.assign({},data));
			}			
		});
	},
	getDefaultData(){
		return Object.assign({},data);
	}
})