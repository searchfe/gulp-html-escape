import * as gulp from 'gulp';
import * as fs from 'fs';
import * as path from 'path';
import { escapeString } from "../src/index";

gulp.src(['./test/assert/test.js']).pipe(
	escapeString('script')
).pipe(
	gulp.dest('./test/dist')
);

gulp.src(['./test/assert/test.css']).pipe(
	escapeString('style')
).pipe(
	gulp.dest('./test/dist')
);

describe('test script', () => {
    test('转义一个js文件', () => {
        const distContent = fs.readFileSync(path.resolve('./test/dist/test.js')).toString();
        expect(distContent.trim()).not.toMatch(/<script|<\/script>/ig);
    });

    test('转义一个css文件', () => {
        const distContent = fs.readFileSync(path.resolve('./test/dist/test.css')).toString();
        expect(distContent.trim()).not.toMatch(/<style|<\/style>/ig);
    });
});