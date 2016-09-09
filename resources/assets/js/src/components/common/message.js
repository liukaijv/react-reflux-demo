import React,{PropTypes} from 'react';
import Base from '../base';
import ClassName from 'classnames';

export default class Message extends Base{

	static propsTypes = {
		hideMessage:PropTypes.func.isRequired,
		msg:PropTypes.string.isRequired,
		type:PropTypes.string.isRequired
	}

	static defaultProps = {
		msg: '',
		type: 'danger',
		hideMessage: ()=>{}	
	}

	render(){	
		const {msg,type,hideMessage} = this.props;
		const classNames = ClassName(['alert','alert-'+type]);
		return (
				<div>
					<div className={classNames} style={{'margin-bottom':0}}>
	                <button className="close" type="button" onClick={hideMessage}>×</button>
	                <p>
	                	{msg}
	                </p>
	              </div>
				</div>
			)
	}
}