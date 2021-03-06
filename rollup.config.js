import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import typescript from 'rollup-plugin-typescript';
import { terser } from 'rollup-plugin-terser';
import copy from 'rollup-plugin-copy'

// `npm run build` -> `production` is true
// `npm run dev` -> `production` is false
const production = !process.env.ROLLUP_WATCH;

export default {
	input: 'src/index.js',
	output: {
		file: 'build/bundle-app.js',
		// immediately-invoked function expression — suitable for <script> tags
		format: 'iife',
		sourcemap: true,
		// variable value 'main' is exported into Browser
		name: 'idcs',
		// if 'named', then access from browser is based on value of name above.
		// app.ExportedName
		exports: 'named'
	},
	plugins: [
		copy({
			targets: [{ src: 'assets/*', dest: 'build' }]
		}),
        resolve(), // tells Rollup how to find commonjs in node_modules
        typescript({module: 'esnext'}),
		commonjs({extensions: ['.js', '.ts']}), // converts commonjs to ES modules
		production && terser() // minify, but only in production
	]
};
