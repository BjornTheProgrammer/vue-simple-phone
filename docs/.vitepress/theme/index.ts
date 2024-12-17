// .vitepress/theme/index.ts
import type { Theme } from 'vitepress';
import DefaultTheme from 'vitepress/theme';
import { VueSimplePhone } from '../../../src';
import ThemedVueSimplePhone from './components/ThemedVueSimplePhone.vue';
import NumberInput from './components/NumberInput.vue';
import ColorInput from './components/ColorInput.vue';
import ThemeBuilder from './components/ThemeBuilder.vue';
import './style.css'

export default {
	extends: DefaultTheme,
	enhanceApp({ app }) {
		app.component('NumberInput', NumberInput);
		app.component('ColorInput', ColorInput);
		app.component('ThemeBuilder', ThemeBuilder);
		app.component('ThemedVueSimplePhone', ThemedVueSimplePhone);
		app.component('VueSimplePhone', VueSimplePhone);
	},
} satisfies Theme;
