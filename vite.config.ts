import vue from '@vitejs/plugin-vue';
import { defineConfig } from 'vite';
import { resolve } from 'node:path'

// https://vite.dev/config/
export default defineConfig(({mode}) => {
	if (mode === 'lib') return {
		build: {
			outDir: 'dist/lib',
			lib: {
				entry: resolve(__dirname, 'lib/main.ts'),
				name: 'Vue Simple Phone',
				// the proper extensions will be added
				fileName: 'vue-simple-phone',
			},
			rollupOptions: {
				// make sure to externalize deps that shouldn't be bundled
				// into your library
				external: ['vue'],
				output: {
					// Provide global variables to use in the UMD build
					// for externalized deps
					globals: {
						vue: 'Vue',
					},
				},
			},
		},

		plugins: [vue()],
	}

	return {
		plugins: [vue()],
		build: {
			outDir: '../dist/site',
		},
		root: 'site'
	}
});
