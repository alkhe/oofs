import fs from 'fs';
import { FILENAME, STAT, FD } from './protected';

let Driver = filename => {
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
				file[child] = Driver(child);
			}
		}
	}

	return file;
};

export default Driver;
