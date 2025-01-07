<script setup lang="ts">
import { onMounted, ref, watch } from 'vue';
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

const makeId = () => {
	return `id_${Math.random().toString(16).slice(2)}`;
};

const id = makeId();
</script>

<template>
	<div>
		<VueSimplePhone :id="id" />
		<component is="style">
			#{{ id }} {
				{{ css }}
			}
		</component>
	</div>
</template>
