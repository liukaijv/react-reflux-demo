import Reflux from 'reflux';
import PostActions from '../actions/post';

import {
	POST_URL
} from '../api/const';

import api from '../api';

const defaultData = {
	posts:[],
	post:{
		id:null,
		title:'',
		category_id:0,
		description:'',
		content:'',
		tags:[]
	},
	categories:[],
	tags:[],
	errors:{}
}

let currentData = Object.assign({},defaultData);

export default Reflux.createStore({
	listenables: PostActions,
	onIndex(){
		api.get(POST_URL).then((result)=>{
			let data = result.data;
			if(data.flag == true){
				currentData.posts = data.data;
				this.trigger('index',currentData)
			}else{
				currentData =  Object.assign({},defaultData);
				this.trigger('index',currentData)
			}
			
		})
	},
	onCreate(){
		api.get(POST_URL+'/create').then((result)=>{
			let data = result.data;
			if(data.flag == true){
				currentData.categories = data.categories;
				currentData.tags = data.tags;				
				this.trigger('create',currentData);
			}
		})
	},
	onStore(data){
		api.post(POST_URL,data).then((result)=>{
			let data = result.data;
			if(data.flag == true){				
				this.trigger('storeSuccess',currentData);
			}else{
				currentData.errors = data.errors;	
				this.trigger('storeFail',currentData);
			}
		})
	},
	onDelete(id){
		api.delete(POST_URL+'/'+id).then((result)=>{
			let data = result.data;
			if(data.flag == true){
				this.trigger('deleted');
			}
		})
	},
	onEdit(id){
		api.get(POST_URL+'/'+id+'/edit').then((result)=>{
			let data = result.data;
			if(data.flag == true){
				currentData.post = data.data;
				currentData.tags = data.tags;
				currentData.categories = data.categories;
				this.trigger('edit',currentData);
			}
		})
	},
	onUpdate(id,data){
		api.put(POST_URL+'/'+id,data).then((result)=>{
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