import { resolve } from 'node:path';
import vue from '@vitejs/plugin-vue';
import { defineConfig } from 'vite';
import dts from 'vite-plugin-dts';

// https://vite.dev/config/
export default defineConfig({
	build: {
		outDir: 'dist',
		lib: {
			entry: resolve(__dirname, 'src/index.ts'),
			name: 'Vue Simple Phone',
			// the proper extensions will be added
			fileName: 'vue-simple-phone',
		},
		rollupOptions: {
			// make sure to externalize deps that shouldn't be bundled
			// into your library
			external: ['vue', 'awesome-phonenumber', ''],
			output: {
				// Provide global variables to use in the UMD build
				// for externalized deps
				globals: {
					vue: 'Vue',
					'awesome-phonenumber': 'awesomePhonenumber',
					'country-flag-icons': 'countryFlagIcons',
				},
			},
		},
	},

	plugins: [
		vue(),
		dts({
			outDir: 'dist/types',
			tsconfigPath: './tsconfig.app.json',
		}),
	],
});
