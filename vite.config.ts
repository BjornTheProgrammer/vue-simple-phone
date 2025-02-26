import { resolve } from 'node:path';
import tailwindcss from '@tailwindcss/vite';
import vue from '@vitejs/plugin-vue';
import { type InlineConfig, type UserConfig, defineConfig } from 'vite';
import dts from 'vite-plugin-dts';
import { viteStaticCopy } from 'vite-plugin-static-copy';

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
			rollupTypes: true,
			tsconfigPath: './tsconfig.app.json',
		}),
		viteStaticCopy({
			targets: [{ src: 'src/themes', dest: './' }],
		}),
		tailwindcss(),
	],

	test: {
		browser: {
			enabled: true,
			name: 'chromium',
			provider: 'playwright',
			// https://playwright.dev
			providerOptions: {},
		},
	},
} as UserConfig & { test: InlineConfig });
