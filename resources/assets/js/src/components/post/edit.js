import React from 'react';
import Base from '../base';
import ReactDOM from 'react-dom';

import {hashHistory} from 'react-router';
import Simditor from 'simditor';

import PostStore from '../../stores/post';
import PostActions from '../../actions/post';

import Breadcrumb from '../common/bread-crumb';
import ValiationErrors from '../common/validation-errors';

export default class PostEdit extends Base {

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
		PostActions.edit(this.props.params.id);
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

	componentDidUpdate (nextProps, nextState){		
		if(nextState.post.content != this.state.post.content && this.editor){
			this.editor.setValue(this.state.post.content);
		}		
	}

	onStoreUpdate(type, data){		
		switch(type){
			case 'edit':				
				this.setState({
					post: data.post,
					categories: data.categories,
					tags:data.tags
				});
			break;
			case 'updateSuccess':
				hashHistory.push('/post/index')
			break;
			case 'updateFail':
				this.setState({
					errors:data.errors
				})
			break;
		}
	}

	onUpdateData(){
		let {post} = this.state;		
		PostActions.update(post.id,post);
	}

	handleTagsChange(e){
		let selected = [].slice.call(e.target.selectedOptions).map(o => {
	            return o.value;
	        });
		this.setState({
	        post: Object.assign({},this.state.post,{tagIds:selected})
   		});
	}

	render(){

		const {categories,tags,post,errors} = this.state;
		let tagIds = [];		
		if(post.tagIds){
			tagIds = post.tagIds;
		}else{
			post.tags.forEach((item)=>{
				tagIds.push(item.id)
			});	
		}		
		return (
				<div>
					<Breadcrumb title="文章修改" breadcrumbs={['文章修改']}/>
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
					                  <input type="text" value={post.title} className="form-control" onChange={(e)=>this.setState({post:Object.assign({},this.state.post,{title: e.target.value})})}/>
					                </div>
					                <div className="form-group">
					                  <label>所属分类</label>
					                  <select className="form-control" value={post.category_id}  onChange={(e)=>this.setState({post:Object.assign({},this.state.post,{category_id: e.target.value})})}>
					                  	<option value="0">请选择</option>
					                  	{categories.map((item,i)=>{
					                  		return (<option key={i} value={item.id}>{item.name}</option>);
					                  	})}
					                  </select>
					                </div>
					                <div className="form-group">
					                  <label>文章标签</label>
					                  <select className="form-control" ref="tags" value={tagIds} multiple={true} onChange={this.handleTagsChange.bind(this)}>
					                  	{tags.map((item,i)=>{
					                  		return (<option key={i} value={item.id}>{item.name}</option>);
					                  	})}
					                  </select>					                 
					                </div>
					                <div className="form-group">
					                  <label>文章描述</label>
					                  <textarea className="form-control" value={post.description} onChange={(e)=>this.setState({post:Object.assign({},this.state.post,{description: e.target.value})})}></textarea>
					                </div>	
					                <div className="form-group">
					                  <label>文章内容</label>
					                  <textarea className="form-control" ref="textarea"/>
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
			);
	}
}