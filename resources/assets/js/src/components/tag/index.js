import React from 'react';
import Base from '../base';
import {Link} from 'react-router';

import Breadcrumb from '../common/bread-crumb';

import TagStore from '../../stores/tag';
import TagActions from '../../actions/tag';

export default class TagIndex extends Base {

	state = {
		tags:[]
	}

	componentDidMount(){
		TagActions.index()
	}

	componentWillMount(){
		this.listenTo(TagStore,this.onStoreUpdate);
	}

	onStoreUpdate(type,data){
		switch(type){
			case 'index':				
				this.setState({
					tags: data.tags
				});
			break;
			case 'deleted':
				TagActions.index()
			break;
		}
	}

	onDelete(id,event){		
		event.preventDefault()
		TagActions.delete(id);
	}	

	render(){		
		const {tags} = this.state;		
		return (
				<div>
					<Breadcrumb title={'标签列表'} breadcrumbs={['标签列表']}/>
					<section className="content">
			    	<div className="row">
			    		<div className="col-md-12">
			    			<div className="box">
			    				<div className="box-header">
			    					<h3 className="box-title">标签列表</h3>
			    				</div>
			    				<div className="box-body">
			    					<table className="table table-hover">
					                	<thead>
							                <tr>
							                  <th>#</th>
							                  <th>名称</th>							                
							                  <th>创建时间</th>
							                  <th>操作</th>
							                </tr>
						                </thead>
						                <tbody> 
						                { 
						                	tags.map((item,i)=>{						                		
						                		return (
						                			<tr key={i}>
									                  <td>{item.id}</td>
									                  <td>{item.name}</td>									                 
									                  <td>{item.created_at}</td>
									                  <td>
									                  		<Link to={`/tag/edit/${item.id}`}>编辑</Link>&nbsp;
									                  		<a href="#" onClick={this.onDelete.bind(this,item.id)}>删除</a>
									                  </td>
									                </tr>);
						                	})						                	
							             }
					              		</tbody>
              						</table>
			    				</div>
			    				<div className="box-footer clearfix">

			    				</div>
			    			</div>
			    		</div>
			    	</div>
			    	</section>
				</div>
			);
	}
}