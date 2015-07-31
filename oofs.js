import fs from 'fs';
import { FILENAME } from './protected';
import Driver from './driver';
import fscompat from './fscompat';

let ex = {};

let filenamePartial = (obj, src, method) => {
	obj[method] = function(...args) {
		return src[method](this[FILENAME], ...args);
	};
};

fscompat.fn.forEach(method => {
	if (!fs[method]) {
		throw new Error('Method not defined on fs.');
	}
	filenamePartial(ex, fs, method);
	let syncfn = `${ method }Sync`;
	if (fs[syncfn]) {
		filenamePartial(ex, fs, syncfn);
	}
});

ex.Driver = Driver;

ex.require = function() {
	return require(this[FILENAME]);
};

export default ex;
