<script setup lang="ts">
/// <reference types="vite/client" />
import { VueSimplePhone } from '../../../../src';
import { ref, watch } from 'vue';

const props = defineProps<{
	theme: string
}>();

const css = ref('');

type GlobFunction = () => string;


// @ts-ignore
const imports = import.meta.glob(
	'../../../../src/themes/*.css',
	{
		query: '?inline',
		import: 'default',
	},
);

// @ts-ignore
const cssThemes = new Map<string, string>(await Promise.all(
	Object.entries(imports).map(async ([moduleString, func]) => {
		return [moduleString, await func()]
	})
));


watch(
	() => props.theme,
	async (newTheme, oldTheme) => {
		if (newTheme !== oldTheme) {
			css.value = cssThemes.get(`../../../../src/themes/${newTheme}.css`) as string;
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
