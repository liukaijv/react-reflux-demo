import React from 'react';
import Base from '../components/base';
import {Link} from 'react-router';

import DashboardStore from '../stores/dashboard'
import Breadcrumb from '../components/common/bread-crumb';

import DashboardActions from '../actions/dashboard';

export default class Dashboard extends Base {

	state = {
		data: DashboardStore.getDefaultData()		
	}

	componentDidMount(){
		DashboardActions.index()
	}

	componentWillMount(){
		this.listenTo(DashboardStore,this.onStoreUpdate);
	}

	onStoreUpdate(data){		
		this.setState({
			data: data
		});
	}	

	render(){	
		const {data} = this.state;	
		let title='Dashboard',
		breadcrumbs = ['dashboard'];		
		return (
				<div>
				<Breadcrumb title={title} breadcrumbs={breadcrumbs}/>
			    <section className="content">
			    	<div className="row">
			    		<div className="col-md-4 col-sm-6 col-xs-12">
			    			<div className="info-box">
					            <span className="info-box-icon bg-aqua"><i className="fa fa-user"></i></span>

					            <div className="info-box-content">
					              <span className="info-box-text">用户数</span>
					              <span className="info-box-number">{data.users_count}</span>
					            </div>
				         
				          	</div>
			    		</div>		    		
			    		<Link to="post/index" className="col-md-4 col-sm-6 col-xs-12">
			    			<div className="info-box">
					            <span className="info-box-icon bg-red"><i className="fa fa-book"></i></span>

					            <div className="info-box-content">
					              <span className="info-box-text">文章数</span>
					              <span className="info-box-number">{data.posts_count}</span>
					            </div>
				         
				          	</div>
			    		</Link>
			    		<Link to="category/index" className="col-md-4 col-sm-6 col-xs-12">
			    			<div className="info-box">
					            <span className="info-box-icon bg-green"><i className="fa fa-list"></i></span>

					            <div className="info-box-content">
					              <span className="info-box-text">分类数</span>
					              <span className="info-box-number">{data.categories_count}</span>
					            </div>
				         
				          	</div>
			    		</Link>		
			    	</div>
			    </section>
			    </div>
			);
	}
}