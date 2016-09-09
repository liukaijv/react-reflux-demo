import Reflux from 'reflux';
import MessageActions from '../actions/message';

const defaultData = {
	msg: '',
	type: ''
};

let currentData = Object.assign({}, defaultData);

export default Reflux.createStore({	
	listenables: MessageActions,
	onShow(msg,type="info"){
		currentData = {
			msg:msg,
			type:type
		}
		this.trigger(currentData);
	},
	onHide(){
		this.trigger(Object.assign({},defaultData))
	},
	getDefaultData(){
		return Object.assign({},defaultData);
	}
});
