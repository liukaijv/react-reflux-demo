import React from 'react';
import Base from '../base';
import { hashHistory } from 'react-router'

import Breadcrumb from '../common/bread-crumb';
import ValiationErrors from '../common/validation-errors';

import TagStore from '../../stores/tag';
import TagActions from '../../actions/tag';

export default class TagCreate extends Base {	

	constructor(props,context){
		super(props,context);
		this.state = this.getDefaultState()
	}

	getDefaultState(){
		let defaultData = TagStore.getDefaultData();		
		return {			
			id: defaultData.tag.id,
			name: defaultData.tag.name,		
			errors: defaultData.errors
		}
	}

	componentWillMount(){
		this.listenTo(TagStore,this.onStoreUpdate);
	}	

	onStoreUpdate(type,data){
		switch(type){
			case 'create':	
			break;
			case 'storeSuccess':
				hashHistory.push('/tag/index')
			break;
			case 'storeFail':
				this.setState({
					errors:data.errors
				})
			break;
		}
	}

	onStoreData(){
		const {name} = this.state;		
		TagActions.store({
			name:name
		})		
	}

	render(){	
		const {name,errors} = this.state;	
		return (
			<div>
				<Breadcrumb title="标签新增" breadcrumbs={['标签新增']}/>
				<section className="content">
			    	<div className="row">
			    		<div className="col-md-12">
			    			<div className="box">
			    				<div className="box-header">
			    					<h3 className="box-title">标签新增</h3>
			    				</div>
			    				<div className="box-body">	
			    					<ValiationErrors errors={errors}/>					
		    						<div className="form-group">
					                  <label>标签名称</label>
					                  <input type="text" placeholder="" className="form-control" onChange={(e)=>this.setState({name:e.target.value})}/>
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