import Reflux from 'reflux';

export default Reflux.createActions({
	index:{children: ['completed', 'failed'], asyncResult: true}
});