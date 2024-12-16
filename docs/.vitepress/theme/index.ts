// .vitepress/theme/index.ts
import type { Theme } from 'vitepress'
import DefaultTheme from 'vitepress/theme'
import { VueSimplePhone } from '../../../src'

export default {
	extends: DefaultTheme,
	enhanceApp({ app }) {
		app.component('VueSimplePhone', VueSimplePhone)
	}
} satisfies Theme
