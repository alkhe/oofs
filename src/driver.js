import fs from 'fs';
import path from 'path';
import { FILENAME, STAT, FD } from './protected';

let Driver = filename => {
	filename = path.resolve(filename);
	let file = {
		[FILENAME]: filename,
		[STAT]: fs.statSync(filename),
		[FD]: null
	};

	if (file[STAT].isDirectory()) {
		let children = fs.readdirSync(filename);
		for (let child of children) {
			// ignore dotfiles for now
			if (/^[^\.]/.test(child)) {
				file[child] = Driver(path.join(filename, child));
			}
		}
	}

	return file;
};

export default Driver;
