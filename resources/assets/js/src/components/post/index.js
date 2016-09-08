import React from 'react';
import Base from '../base';

import PostStore from '../../stores/post';
import PostActions from '../../actions/post';

import {Link} from 'react-router';
import Breadcrumb from '../common/bread-crumb';

export default class PostIndex extends Base {

	state = {
		posts:[]
	}

	componentWillMount(){
		this.listenTo(PostStore,this.onStoreUpdate);
	}

	componentDidMount(){
		PostActions.index()
	}

	onStoreUpdate(type, data){		
		switch(type){
			case 'index':			
				this.setState({
					posts:data.posts
				})
			break;
			case 'deleted':
				PostActions.index()
			break;
		}
	}

	onDelete(id,event){
		event.preventDefault()
		PostActions.delete(id);
	}

	render(){
		const {posts} = this.state;
		return (
				<div>
					<Breadcrumb title='文章列表' breadcrumbs={['文章列表']}/>
					<section className="content">
			    	<div className="row">
			    		<div className="col-md-12">
			    			<div className="box">
			    				<div className="box-header">
			    					<h3 className="box-title">文章列表</h3>
			    				</div>
			    				<div className="box-body">
			    					<table className="table table-hover">
					                	<thead>
							                <tr>
							                  <th>#</th>
							                  <th>标题</th>
							                  <th>所属分类</th>
							                  <th>创建时间</th>
							                  <th>操作</th>
							                </tr>
						                </thead>
						                <tbody> 
						                { 
						                	posts.map((item,i)=>{						                		
						                		return (
						                			<tr key={i}>
									                  <td>{item.id}</td>
									                  <td>{item.title}</td>
									                  <td>{item.category?item.category['name']:'无'}</td>
									                  <td>{item.created_at}</td>
									                  <td>
									                  		<Link to={`/post/edit/${item.id}`}>编辑</Link>&nbsp;
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