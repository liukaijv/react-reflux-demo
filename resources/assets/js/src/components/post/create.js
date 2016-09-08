import React from 'react';
import Base from '../base';
import ReactDOM from 'react-dom';

import {hashHistory} from 'react-router';
import Simditor from 'simditor';

import PostStore from '../../stores/post';
import PostActions from '../../actions/post';

import Breadcrumb from '../common/bread-crumb';
import ValiationErrors from '../common/validation-errors';

export default class PostCreate extends Base {

	constructor(props,context){
		super(props,context);
		this.state = this.getDefaultState()
	}

	getDefaultState(){
		let defaultData = PostStore.getDefaultData();
		return {
			post:defaultData.post,
			categories:defaultData.categories,
			tags:defaultData.tags,
			errors: defaultData.errors
		}
	}

	componentWillMount(){
		this.listenTo(PostStore,this.onStoreUpdate);
	}

	componentDidMount(){
		PostActions.create();
		let textbox = ReactDOM.findDOMNode(this.refs.textarea);
		this.editor = new Simditor({
			textarea: $(textbox),
		});
		this.editor.on("valuechanged", (e, src) => {
			this.setState({
				post:Object.assign({},this.state.post,{content:this.editor.getValue()})
			});	      
	    });
	}

	onStoreUpdate(type, data){		
		switch(type){
			case 'create':				
				this.setState({
					categories: data.categories,
					tags:data.tags
				});
			break;
			case 'storeSuccess':
				hashHistory.push('/post/index')
			break;
			case 'storeFail':
				this.setState({
					errors:data.errors
				})
			break;
		}
	}

	onStoreData(){
		const {post} = this.state;			
		PostActions.store(post);		
	}

	handleTagsChange(e){
		let selected = [].slice.call(e.target.selectedOptions).map(o => {
	            return o.value;
	        });
		this.setState({
	        post: Object.assign({},this.state.post,{tags:selected})
   		});
	}

	render(){
		const {categories,tags,post,errors} = this.state;

		return (
				<div>
					<Breadcrumb title="文章新增" breadcrumbs={['文章新增']}/>
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
					                  <label>文章标题</label>
					                  <input type="text" placeholder="" className="form-control" onChange={(e)=>this.setState({post:Object.assign({},this.state.post,{title: e.target.value})})}/>
					                </div>
					                <div className="form-group">
					                  <label>所属分类</label>
					                  <select className="form-control" onChange={(e)=>this.setState({post:Object.assign({},this.state.post,{category_id: e.target.value})})}>
					                  	<option value="0">请选择</option>
					                  	{categories.map((item,i)=>{
					                  		return (<option key={i} value={item.id}>{item.name}</option>);
					                  	})}
					                  </select>
					                </div>
					                <div className="form-group">
					                  <label>文章标签</label>
					                  <select className="form-control" multiple onChange={this.handleTagsChange.bind(this)}>
					                  	{tags.map((item,i)=>{
					                  		return (<option key={i} value={item.id}>{item.name}</option>);
					                  	})}
					                  </select>					                 
					                </div>
					                <div className="form-group">
					                  <label>文章描述</label>
					                  <textarea className="form-control" onChange={(e)=>this.setState({post:Object.assign({},this.state.post,{description: e.target.value})})}></textarea>
					                </div>	
					                <div className="form-group">
					                  <label>文章内容</label>
					                  <textarea className="form-control" ref='textarea'/>
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
			);
	}
}