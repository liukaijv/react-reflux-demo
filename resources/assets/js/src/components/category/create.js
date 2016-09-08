import React from 'react';
import Base from '../base';
import { hashHistory } from 'react-router'

import Breadcrumb from '../common/bread-crumb';
import ValiationErrors from '../common/validation-errors';

import CategoryStore from '../../stores/category';
import CategoryActions from '../../actions/category';

export default class CategroyCreate extends Base {	

	constructor(props,context){
		super(props,context);
		this.state = this.getDefaultState()
	}

	getDefaultState(){
		let defaultData = CategoryStore.getDefaultData();
		return {
			categories:defaultData.categories,
			name: defaultData.category.name,
			parent_id: defaultData.category.parent_id,
			errors: defaultData.errors
		}
	}

	componentWillMount(){
		this.listenTo(CategoryStore,this.onStoreUpdate);
	}

	componentDidMount(){
		CategoryActions.create()
	}

	onStoreUpdate(type,data){
		switch(type){
			case 'create':				
				this.setState({
					categories: data.categories
				});
			break;
			case 'storeSuccess':
				hashHistory.push('/category/index')
			break;
			case 'storeFail':
				this.setState({
					errors:data.errors
				})
			break;
		}
	}

	onStoreData(){
		const {name,parent_id} = this.state;		
		CategoryActions.store({
			name:name,
			parent_id:parent_id
		})		
	}

	render(){	
		const {categories,errors} = this.state;	
		return (
			<div>
				<Breadcrumb title="分类新增" breadcrumbs={['分类新增']}/>
				<section className="content">
			    	<div className="row">
			    		<div className="col-md-12">
			    			<div className="box">
			    				<div className="box-header">
			    					<h3 className="box-title">分类新增</h3>
			    				</div>
			    				<div className="box-body">	
			    					<ValiationErrors errors={errors}/>					
		    						<div className="form-group">
					                  <label>分类名称</label>
					                  <input type="text" placeholder="" className="form-control" onChange={(e)=>this.setState({name:e.target.value})}/>
					                </div>
					                <div className="form-group">
					                  <label>分类名称</label>
					                  <select className="form-control" onChange={(e)=>this.setState({parent_id:e.target.value})}>
					                  	<option value="0">请选择</option>
					                  	{categories.map((item,i)=>{
					                  		return (<option key={i} value={item.id}>{item.name}</option>);
					                  	})}
					                  </select>
					                </div>			    					
			    				</div>
			    				<div className="box-footer">
			    					<button className="btn btn-primary" type="button" onClick={this.onStoreData.bind(this)}>提交</button>
			    				</div>
			    			</div>
			    		</div>
		    		</div>
	    		</section>
			</div>
			)
	}
}