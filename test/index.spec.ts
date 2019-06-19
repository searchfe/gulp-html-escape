import * as gulp from 'gulp';
import * as fs from 'fs';
import * as path from 'path';
import { escapeString } from "../src/index";

gulp.src(['./test/assert/test.js']).pipe(
	escapeString()
).pipe(
	gulp.dest('./test/dist')
);

describe('test script', () => {
    test('转义一个js文件', () => {
        const distContent = fs.readFileSync(path.resolve('./test/dist/test.js')).toString();
        expect(distContent.trim()).not.toMatch(/<script|<\/script>/);
    });
});