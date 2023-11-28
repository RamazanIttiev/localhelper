import react from '@vitejs/plugin-react-swc';

import { resolve } from 'path';
import { visualizer } from 'rollup-plugin-visualizer';
import { defineConfig, PluginOption } from 'vite';
import viteCompression from 'vite-plugin-compression';
import eslint from 'vite-plugin-eslint';
import ViteMinifyPlugin from 'vite-plugin-minify';
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
	build: {
		outDir: './public_html',
		sourcemap: true,
		emptyOutDir: true,
		rollupOptions: {
			input: {
				file1: resolve(__dirname, 'index.html'),
			},
			output: {
				entryFileNames: '[name].js',
				chunkFileNames: '[name].js',
				assetFileNames: '[name].[ext]',
			},
		},
	},
	plugins: [
		svgr(),
		react(),
		tsconfigPaths(),
		viteCompression(),
		ViteMinifyPlugin({}),
		eslint({ cache: false, include: ['./src/**/*.ts', './src/**/*.tsx'], exclude: [] }),
		visualizer({
			template: 'treemap', // or sunburst
			open: true,
			gzipSize: true,
			brotliSize: true,
			filename: 'analyse.html', // will be saved in project's root
		}) as PluginOption,
	],
});
