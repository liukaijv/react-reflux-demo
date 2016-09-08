import React, {PropTypes} from 'react';
import classNames from 'classnames';
import Base from '../base';

export default class Confirm extends Base {

	static propTypes = {
		title: PropTypes.string.isRequired,
		confirmOk: PropTypes.func.isRequired
	}

	static defaultProps = {		
		title:"确定要这样吗?",
		confirmOk:()=>{}		
	}

	state = {
		backdropClass:{
			'modal-backdrop':true,			
			'hide':false,
			'fade':true,
			'in':true
		},
		modalClass:{
			'modal':true,
			'confirmation-modal':true,
			'fade':true,
			'in':true			
		},
		modalStyle:{
			'display':'block'
		},
		backdropStyle:{
			'display':'block'
		}
	}

	btnClick(){
		this.setState({
			backdropClass:{
				'modal-backdrop':true,
				'fade':false,
				'hide':false				
			}});
		this.setState({
			modalClass:{
			'modal':true,
			'confirmation-modal':true,
			'fade':false,
			'in':false,
			'hide':true,
		}});

		this.setState({
			backdropStyle:{
			'display':'none'
		}});

	}	

	render(){
		let {title} = this.props,
		 backdropClass = classNames(this.state.backdropClass),
		 modalClass = classNames(this.state.modalClass);
		return (
				<div>
					
					<div className={backdropClass} style={this.state.backdropStyle}></div>
					<div className={modalClass} style={this.state.modalStyle}>	
						  <div className="modal-dialog">
						    <div className="modal-content">
						      <div className="modal-body">{title}</div>
						      <div className="modal-footer">
						        <button className="confirm btn btn-primary" type="button" onClick={this.btnClick.bind(this)}>确定</button>
						        <button className="cancel btn btn-default" type="button" onClick={this.btnClick.bind(this)}>取消</button></div>
						    </div>
						  </div>
					</div>
				</div>
			);
	}

}

