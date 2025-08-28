<script setup lang="ts">
import { ref, useId, watch } from 'vue';
/// <reference types="vite/client" />
import { VueSimplePhone } from '../../../../src';

const props = defineProps<{
	theme: string;
}>();

const css = ref('');

type GlobFunction = () => string;

// @ts-expect-error
const imports = import.meta.glob('../../../../src/themes/*.css', {
	query: '?inline',
	import: 'default',
});

const cssThemes = new Map<string, string>(
	await Promise.all(
		Object.entries(imports as (() => Promise<string>)[]).map(
			async ([moduleString, func]) => {
				return [moduleString, await func()] as [string, string];
			},
		),
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

const id = useId();
</script>

<template>
    <div>
        <VueSimplePhone :class="id" />
        <component is="style">
            .{{ id }} {
            {{ css }}
            } @scope {
            {{ css }}
            }
        </component>
    </div>
</template>
