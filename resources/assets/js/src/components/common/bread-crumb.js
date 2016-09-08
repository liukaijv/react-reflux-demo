import React, {Component, PropTypes} from 'react';

export default class BreadCrumb extends Component{

	static propTypes = {
		title: PropTypes.string,
		breadcrumbs: PropTypes.array
	}

	static defaultProps = {
		title:'Dashboard',
		breadcrumbs:['Dashboard']
	}

	render(){
		const {title,breadcrumbs} = this.props;
		let len = breadcrumbs.length;
		return (
				<section className="content-header">
			      <h1>
			        {title}	      
			      </h1>
			      <ol className="breadcrumb">			      	
			        <li><a><i className="fa fa-dashboard"></i> 首页</a></li>
			        {breadcrumbs.map((item,i)=>{			        				        	
			        	return <li key={i} className={i==len-1?'active':''}>{item.name?item.name:item}</li>
			        })}
			        
			      </ol>
			    </section>
			);
	}
}