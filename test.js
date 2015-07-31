import { Driver, readFileSync } from './oofs';

let filesys = Driver('.');

console.log(filesys['index.js']::readFileSync('utf8'));
