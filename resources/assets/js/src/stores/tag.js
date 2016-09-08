import Reflux from 'reflux';
import TagActions from '../actions/tag';

import {
	TAG_URL
} from '../api/const';

import api from '../api';

const defaultData = {
	tags:[],
	tag:{
		id:null,
		name:''		
	},
	errors:{}
}

let currentData = Object.assign({},defaultData);

export default Reflux.createStore({
	listenables: TagActions,
	onIndex(){
		api.get(TAG_URL).then((result)=>{
			let data = result.data;
			if(data.flag == true){
				currentData.tags = data.data;
				this.trigger('index',currentData)
			}else{
				currentData =  Object.assign({},defaultData);
				this.trigger('index',currentData)
			}
			
		})
	},
	onCreate(){		
		currentData = Object.assign({},defaultData)
		this.trigger('create',currentData);		
	},
	onStore(data){
		api.post(TAG_URL,data).then((result)=>{
			let data = result.data;
			if(data.flag == true){			
				this.trigger('storeSuccess');
			}else{
				currentData.errors = data.errors;	
				this.trigger('storeFail',currentData);
			}
		})
	},
	onDelete(id){
		api.delete(TAG_URL+'/'+id).then((result)=>{
			let data = result.data;
			if(data.flag == true){
				this.trigger('deleted');
			}
		})
	},
	onEdit(id){
		api.get(TAG_URL+'/'+id+'/edit').then((result)=>{
			let data = result.data;
			if(data.flag == true){
				currentData.tag = data.data;			
				this.trigger('edit',currentData);
			}
		})
	},
	onUpdate(id,data){
		api.put(TAG_URL+'/'+id,data).then((result)=>{
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