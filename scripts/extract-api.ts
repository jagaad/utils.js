import { readdir, readFile } from 'node:fs/promises';

const allFiles = await readdir('src/');
const apiFiles = allFiles.filter((file) => file !== 'index.ts');
const apiFilesWithPath = apiFiles.map((file) => `src/${file}`);

const test = apiFilesWithPath.map((file) => {
	return readFile(file, 'utf-8').then((data) => {
		const lines = data.split('\n');
		const exportLines = lines.filter((line) => line.includes('export'));
		const filteredLines = exportLines.filter(
			(line) =>
				line.includes('function') ||
				line.includes('const') ||
				line.includes('class'),
		);
		return filteredLines;
	});
});

const results = await Promise.all(test);

console.log(results);
