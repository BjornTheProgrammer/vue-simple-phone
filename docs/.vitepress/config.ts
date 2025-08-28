import tailwindcss from '@tailwindcss/vite';
import { defineConfig } from 'vitepress';

// https://vitepress.dev/reference/site-config
export default defineConfig({
	title: 'Vue Simple Phone',
	description: 'A simple vue component for phone number inputs',
	base: '/vue-simple-phone/',
	head: [
		['link', { rel: 'icon', href: '/vue-simple-phone/favicon.ico' }],
		[
			'script',
			{
				async: '',
				src: 'https://www.googletagmanager.com/gtag/js?id=G-RV02ZDS2VE',
			},
		],
		[
			'script',
			{},
			`window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());
      gtag('config', 'G-RV02ZDS2VE');`,
		],
	],
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
					{ text: 'Additional Exports', link: '/usage/additional-exports' },
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
	vite: {
		plugins: [
			// @ts-expect-error
			tailwindcss(),
		],
	},
});
