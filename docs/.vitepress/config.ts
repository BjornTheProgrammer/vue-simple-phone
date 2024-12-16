import { defineConfig } from 'vitepress';

// https://vitepress.dev/reference/site-config
export default defineConfig({
	title: 'Vue Simple Phone',
	description: 'A simple vue component for phone number inputs',
	themeConfig: {
		// https://vitepress.dev/reference/default-theme-config
		nav: [
			{ text: 'Home', link: '/' },
			{ text: 'Getting Started', link: '/guide/getting-started' },
		],

		sidebar: [
			{
				text: 'Guide',
				items: [
					{ text: 'Getting Started', link: '/guide/getting-started' },
					{ text: 'Binding', link: '/guide/binding' },
				],
			},
			{
				text: 'Usage',
				items: [
					{ text: 'Props', link: '/usage/props' },
					{ text: 'Themes', link: '/usage/themes' },
					{ text: 'Making a Theme', link: '/usage/making-a-theme' },
				],
			},
		],

		socialLinks: [
			{ icon: 'github', link: 'https://github.com/BjornTheProgrammer/vue-simple-phone' },
		],
	},
});
