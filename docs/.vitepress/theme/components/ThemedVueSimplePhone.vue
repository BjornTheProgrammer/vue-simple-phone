<script setup lang="ts">
import { ref, watch } from 'vue';
/// <reference types="vite/client" />
import { VueSimplePhone } from '../../../../src';

const props = defineProps<{
	theme: string;
}>();

const css = ref('');

type GlobFunction = () => string;

// @ts-ignore
const imports = import.meta.glob('../../../../src/themes/*.css', {
	query: '?inline',
	import: 'default',
});

const cssThemes = new Map<string, string>(
	// @ts-ignore
	await Promise.all(
		Object.entries(imports).map(async ([moduleString, func]) => {
			// @ts-ignore
			return [moduleString, await func()];
		}),
	),
);

watch(
	() => props.theme,
	async (newTheme, oldTheme) => {
		if (newTheme !== oldTheme) {
			css.value = cssThemes.get(
				`../../../../src/themes/${newTheme}.css`,
			) as string;
		}
	},
	{ immediate: true },
);
</script>

<template>
	<div>
		<VueSimplePhone />
		<component is="style">
			@scope {
				{{ css }}
			}
		</component>
	</div>
</template>
