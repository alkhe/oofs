import fs from 'fs';
import { FILENAME, FD } from './protected';
import Driver from './driver';
import fscompat from './fscompat';

let ex = {};

let fsPartial = (dest, src, method, ref) => {
	dest[method] = function(...args) {
		let handle = this[ref];
		if (!handle) {
			throw new Error(`${ ref } is not defined.`);
		}
		return src[method](handle, ...args);
	};
};

let copyFs = ref =>
	method => {
		if (!fs[method]) {
			throw new Error('Method not defined on fs.');
		}
		fsPartial(ex, fs, method, ref);
		let syncfn = `${ method }Sync`;
		if (fs[syncfn]) {
			fsPartial(ex, fs, syncfn, ref);
		}
	};

fscompat.fn.forEach(copyFs(FILENAME));
fscompat.fd.forEach(copyFs(FD));

ex.Driver = Driver;

ex.load = function() {
	return require(this[FILENAME]);
};

ex.open = function(...args) {
	let callback;
	[args, callback] = args::Array.prototype.slice();
	fs.open(this[FILENAME], ...args, (err, fd) => {
		this[FD] = fd;
		callback(err, fd);
	});
};

ex.openSync = function(...args) {
	this[FD] = fs.openSync(this[FILENAME], ...args);
};

export default ex;
