/** @type {import('tailwindcss').Config} */
export default {
	content: [
		'docs/.vitepress/theme/components/*.vue',
		'docs/.vitepress/theme/pages/*.vue',
		'docs/**/*.md',
	],
	theme: {
		extend: {},
	},
	plugins: [],
};
