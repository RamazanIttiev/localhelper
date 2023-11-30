import react from '@vitejs/plugin-react-swc';

import { visualizer } from 'rollup-plugin-visualizer';
import { defineConfig, PluginOption } from 'vite';
import viteCompression from 'vite-plugin-compression';
import eslint from 'vite-plugin-eslint';
import svg from 'vite-plugin-svgr';
import tsconfigPaths from 'vite-tsconfig-paths';

export default defineConfig({
	base: './',
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
	build: {
		outDir: 'public_html',
		emptyOutDir: true,
		rollupOptions: {
			external: /@mui\.*/,
		},
	},
	plugins: [
		svg(),
		react(),
		tsconfigPaths(),
		viteCompression(),
		eslint({ cache: false, include: ['./src/**/*.ts', './src/**/*.tsx'], exclude: [] }),
		visualizer({
			template: 'sunburst', // or sunburst
			open: false,
			gzipSize: true,
			brotliSize: true,
			filename: 'analyse.html', // will be saved in project's root
		}) as PluginOption,
	],
});
