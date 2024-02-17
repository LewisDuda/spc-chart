import fs from 'fs';

const getDB = (collection_name: string) => {
	const filePath = `./server/Database/${collection_name}.json`;
	return JSON.parse(fs.readFileSync(filePath, 'utf-8'))[collection_name];
};

const writeDB = (collection_name: string, data: any) => {
	const filePath = `./server/Database/${collection_name}.json`;
	fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf-8');
};

export { getDB, writeDB };
