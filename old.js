import c from 'constants';

// file modes
const FM = {
	REG: Symbol('File'),
	DIR: Symbol('Directory'),
	BLK: Symbol('Block Device'),
	CHR: Symbol('Char Device'),
	LNK: Symbol('Link'),
	FIFO: Symbol('FIFO'),
	SOCK: Symbol('Socket')
};

const fmmap = {
	[c.S_IFREG]: FM.REG,
	[c.S_IFDIR]: FM.DIR,
	[c.S_IFBLK]: FM.BLK,
	[c.S_IFCHR]: FM.CHR,
	[c.S_IFLNK]: FM.LNK,
	[c.S_IFIFO]: FM.FIFO,
	[c.S_IFSOCK]: FM.SOCK
};
