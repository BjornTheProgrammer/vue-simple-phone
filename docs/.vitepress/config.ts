import { defineConfig } from 'vitepress';

// https://vitepress.dev/reference/site-config
export default defineConfig({
	title: 'Vue Simple Phone',
	description: 'A simple vue component for phone number inputs',
	base: '/vue-simple-phone/',
	head: [['link', { rel: 'icon', href: '/favicon.ico' }]],
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
					{ text: 'Events', link: '/usage/events' },
					{ text: 'Slots', link: '/usage/slot' },
					{ text: 'Themes', link: '/usage/themes' },
					{ text: 'Making a Theme', link: '/usage/making-a-theme' },
					{ text: 'Theme Builder', link: '/usage/theme-builder' },
				],
			},
		],

		socialLinks: [
			{
				icon: 'github',
				link: 'https://github.com/BjornTheProgrammer/vue-simple-phone',
			},
		],
	},
});
