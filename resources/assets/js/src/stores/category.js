import Reflux from 'reflux';
import CategroyActions from '../actions/category';

import {
	CATEGORY_URL
} from '../api/const';

import api from '../api';

const defaultData = {
	categories:[],
	category:{
		id:null,
		name:'',
		parent_id:0
	},
	errors:{}
}

let currentData = Object.assign({},defaultData);

export default Reflux.createStore({
	listenables: CategroyActions,
	onIndex(){
		api.get(CATEGORY_URL).then((result)=>{
			let data = result.data;
			if(data.flag == true){
				currentData.categories = data.data;
				this.trigger('index',currentData)
			}else{
				currentData =  Object.assign({},defaultData);
				this.trigger('index',currentData)
			}
			
		})
	},
	onCreate(){
		api.get(CATEGORY_URL+'/create').then((result)=>{
			let data = result.data;
			if(data.flag == true){
				currentData.category = data.data;
				this.trigger('create',currentData);
			}
		})
	},
	onStore(data){
		api.post(CATEGORY_URL,data).then((result)=>{
			let data = result.data;
			if(data.flag == true){
				currentData.category = data.data;
				this.trigger('storeSuccess',currentData);
			}else{
				currentData.errors = data.errors;	
				this.trigger('storeFail',currentData);
			}
		})
	},
	onDelete(id){
		api.delete(CATEGORY_URL+'/'+id).then((result)=>{
			let data = result.data;
			if(data.flag == true){
				this.trigger('deleted');
			}
		})
	},
	onEdit(id){
		api.get(CATEGORY_URL+'/'+id+'/edit').then((result)=>{
			let data = result.data;
			if(data.flag == true){
				currentData.category = data.data;
				currentData.categories = data.categories;
				this.trigger('edit',currentData);
			}
		})
	},
	onUpdate(id,data){
		api.put(CATEGORY_URL+'/'+id,data).then((result)=>{
			let data = result.data;
			if(data.flag == true){				
				this.trigger('updateSuccess');
			}else{
				currentData.errors = data.errors;				
				this.trigger('updateFail',currentData);
			}
		})
	},
	getDefaultData(){
		return defaultData;
	}
})