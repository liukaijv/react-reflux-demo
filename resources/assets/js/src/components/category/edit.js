import React from 'react';
import Base from '../base';
import { hashHistory } from 'react-router'

import Breadcrumb from '../common/bread-crumb';
import ValiationErrors from '../common/validation-errors';

import CategoryStore from '../../stores/category';
import CategoryActions from '../../actions/category';

export default class CategroyEdit extends Base {

	constructor(props,context){
		super(props,context);
		this.state = this.getDefaultState()
	}

	getDefaultState(){
		let defaultData = CategoryStore.getDefaultData();		
		return {
			categories:defaultData.categories,
			id: defaultData.category.id,
			name: defaultData.category.name,
			parent_id: defaultData.category.parent_id,
			errors: defaultData.errors
		}
	}

	componentWillMount(){
		this.listenTo(CategoryStore,this.onStoreUpdate);
	}

	componentDidMount(){		
		CategoryActions.edit(this.props.params.id)
	}

	onStoreUpdate(type,data){
		switch(type){
			case 'edit':				
				this.setState({
					categories: data.categories,
					id: data.category.id,
					name: data.category.name,
					parent_id: data.category.parent_id				
				});
			break;
			case 'updateSuccess':
				hashHistory.push('/category/index')
			break;
			case 'updateFail':				
				this.setState({
					errors:data.errors
				})
			break;
		}
	}

	onUpdateData(){
		const {id,name,parent_id} = this.state;		
		CategoryActions.update(id,{
			name:name,
			parent_id:parent_id
		})		
	}

	render(){
		const {categories,errors,name,parent_id} = this.state;	
		return (
			<div>
				<Breadcrumb title="分类修改" breadcrumbs={['分类修改']}/>
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
					                  <input type="text" value={name} className="form-control" onChange={(e)=>this.setState({name:e.target.value})}/>
					                </div>
					                <div className="form-group">
					                  <label>分类名称</label>
					                  <select className="form-control" value={parent_id} onChange={(e)=>this.setState({parent_id:e.target.value})}>
					                  	<option value="0">请选择</option>
					                  	{categories.map((item,i)=>{
					                  		return (<option key={i} value={item.id}>{item.name}</option>);
					                  	})}
					                  </select>
					                </div>			    					
			    				</div>
			    				<div className="box-footer">
			    					<button className="btn btn-primary" type="button" onClick={this.onUpdateData.bind(this)}>提交</button>
			    				</div>
			    			</div>
			    		</div>
		    		</div>
	    		</section>
			</div>
			)
	}
} 