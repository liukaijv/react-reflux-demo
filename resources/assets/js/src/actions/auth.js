import Reflux from 'reflux';

export default Reflux.createActions({
	login:{children: ['completed', 'failed'], asyncResult: true},
	logout:{children: ['completed', 'failed'], asyncResult: true}	
});