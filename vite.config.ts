import react from '@vitejs/plugin-react-swc';

import { defineConfig } from 'vite';
import eslint from 'vite-plugin-eslint';
import svgr from 'vite-plugin-svgr';
import tsconfigPaths from 'vite-tsconfig-paths';

// https://vitejs.dev/config/
export default defineConfig({
	base: '/',
	define: {
		'process.env': {},
	},
	server: {
		strictPort: true,
		host: '127.0.0.1',
	},
	resolve: {
		extensions: ['.ts', '.tsx'],
	},
	plugins: [
		svgr(),
		react(),
		tsconfigPaths(),
		eslint({ cache: false, include: ['./src/**/*.ts', './src/**/*.tsx'], exclude: [] }),
	],
});
