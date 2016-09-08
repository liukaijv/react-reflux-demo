import React, {PropTypes, Component} from 'react';

export default class ValiationErrors extends Component {	 
	state = {
		showError:true
	}
	componentWillReceiveProps(nextProps){			
		if(Object.keys(nextProps).length){
			this.setState({
				showError:true
			})
		}else{
			this.setState({
				showError:false
			})
		}
		
	}
	onCloseAlert(){
		this.setState({
			showError:false
		})
	}
	render(){
		let {errors} = this.props,
		errorsKey = Object.keys(errors);
		let showError = this.state.showError && errorsKey.length;		
		return (			
				<div className="alert alert-danger alert-dismissible" style={{display:showError?'block':'none'}}>
	                <button className="close" onClick={this.onCloseAlert.bind(this)} type="button">×</button>
	                <h4> 验证提示！</h4>
	                <ul>
	                {
	                	errorsKey.map((item,i)=>{
	                		return <li key={i}>{errors[item][0]}</li>
	                	})
	                }
	                </ul>
              	</div>
			)
	}
}