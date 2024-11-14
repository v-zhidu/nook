import typescript from '@rollup/plugin-typescript';
import {glob} from 'glob';
import path from 'node:path';
import {fileURLToPath} from 'node:url';

export default {
    input: Object.fromEntries(
        glob.sync('src/**/*.ts').map(file => [
            // This remove `src/` as well as the file extension from each
            // file, so e.g. src/nested/foo.js becomes nested/foo
            path.relative(
                'src',
                file.slice(0, file.length - path.extname(file).length)
            ),
            // This expands the relative paths to absolute paths, so e.g.
            // src/nested/foo becomes /project/src/nested/foo.js
            fileURLToPath(new URL(file, path.dirname(import.meta.url)))
        ])
    ),
    output: {
        format: "cjs",
        dir: 'dist/cjs'
    },
    plugins: [typescript({
        compilerOptions: {
            outDir: 'dist/cjs',
            declarationDir: 'dist/cjs/types',
        }
    })],
    external: ['lodash'],
};
