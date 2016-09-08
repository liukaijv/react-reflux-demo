import React from 'react';
import Base from '../base';
import {Link} from 'react-router';

import Breadcrumb from '../common/bread-crumb';

import CategoryStore from '../../stores/category';
import CategoryActions from '../../actions/category';

export default class CategoryIndex extends Base {

	state = {
		categories:[]
	}

	componentDidMount(){
		CategoryActions.index()
	}

	componentWillMount(){
		this.listenTo(CategoryStore,this.onStoreUpdate);
	}

	onStoreUpdate(type,data){
		switch(type){
			case 'index':				
				this.setState({
					categories: data.categories
				});
			break;
			case 'deleted':
				CategoryActions.index()
			break;
		}
	}

	onDelete(id,event){		
		event.preventDefault()
		CategoryActions.delete(id);
	}	

	render(){
		const title = '分类列表',
		breadcrumbs = ['分类列表'];
		const {categories} = this.state;		
		return (
				<div>
					<Breadcrumb title={title} breadcrumbs={breadcrumbs}/>
					<section className="content">
			    	<div className="row">
			    		<div className="col-md-12">
			    			<div className="box">
			    				<div className="box-header">
			    					<h3 className="box-title">{title}</h3>
			    				</div>
			    				<div className="box-body">
			    					<table className="table table-hover">
					                	<thead>
							                <tr>
							                  <th>#</th>
							                  <th>名称</th>
							                  <th>上级分类</th>
							                  <th>创建时间</th>
							                  <th>操作</th>
							                </tr>
						                </thead>
						                <tbody> 
						                { 
						                	categories.map((item,i)=>{						                		
						                		return (
						                			<tr key={i}>
									                  <td>{item.id}</td>
									                  <td>{item.name}</td>
									                  <td>{item.category?item.category['name']:'无'}</td>
									                  <td>{item.created_at}</td>
									                  <td>
									                  		<Link to={`/category/edit/${item.id}`}>编辑</Link>&nbsp;
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