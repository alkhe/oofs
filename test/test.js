import { Driver, readFileSync as read, load,
	openSync as open, fstatSync as fstat, closeSync as close } from '../src';

let filesys = Driver('..');

console.log(filesys.test['random.js']::load());

console.log(filesys.src['index.js']::read('utf8'));

let file = filesys.src['driver.js'];
file::open('r');
console.log(file::fstat());
file::close();
