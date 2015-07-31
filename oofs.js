import fs from 'fs';

let fscompat = {
	fn: [
		'access',
		'exists',
		'readFile',
		'open',
		'truncate',
		'mkdir',
		'readdir',
		'lstat',
		'stat',
		'readlink',
		'symlink',
		'link',
		'unlink',
		'chmod',
		'chown',
		'utimes',
		'writeFile',
		'appendFile',
		'watch',
		'watchFile',
		'unwatchFile',
		'realpath',
		'createReadStream',
		'createWriteStream'
	],
	fd: [
		'close',
		'read',
		'write',
		'fdatasync',
		'fsync',
		'fstat',
		'fchmod',
		'fchown',
		'futimes'
	]
};

const FILENAME = Symbol('Filename');
const STAT = Symbol('Stat');
const FD = Symbol('File Descriptor');

let Driver = filename => {
	let file = {
		[FILENAME]: filename,
		[STAT]: fs.statSync(filename),
		[FD]: null
	};

	if (file[STAT].isDirectory()) {
		let children = fs.readdirSync(filename);
		for (let child of children) {
			file[child] = Driver(child);
		}
	}

	return file;
};

let ex = {};

let filenamePartial = (obj, src, method) => {
	obj[method] = function(...args) {
		return src[method](this[FILENAME], ...args);
	};
};

fscompat.fn.forEach(method => {
	if (!fs[method]) {
		throw new Error();
	}
	filenamePartial(ex, fs, method);
	let syncfn = `${ method }Sync`;
	if (fs[syncfn]) {
		filenamePartial(ex, fs, syncfn);
	}
});

ex.Driver = Driver;

export default ex;
