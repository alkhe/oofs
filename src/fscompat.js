export default {
	fn: [
		'access',
		'exists',
		'readFile',
		// 'open', special case
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
