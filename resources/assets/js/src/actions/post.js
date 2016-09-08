import Reflux from 'reflux';

export default Reflux.createActions({
	index:{children: ['completed', 'failed'], asyncResult: true},
	create:{children: ['completed', 'failed'], asyncResult: true},
	store:{children: ['completed', 'failed'], asyncResult: true},
	edit:{children: ['completed', 'failed'], asyncResult: true},
	update:{children: ['completed', 'failed'], asyncResult: true},
	delete:{children: ['completed', 'failed'], asyncResult: true}
});