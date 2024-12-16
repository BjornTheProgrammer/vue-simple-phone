// .vitepress/theme/index.ts
import type { Theme } from 'vitepress';
import DefaultTheme from 'vitepress/theme';
import { VueSimplePhone } from '../../../src';
import ThemedVueSimplePhone from './ThemedVueSimplePhone.vue';

export default {
	extends: DefaultTheme,
	enhanceApp({ app }) {
		app.component('ThemedVueSimplePhone', ThemedVueSimplePhone);
		app.component('VueSimplePhone', VueSimplePhone);
	},
} satisfies Theme;
