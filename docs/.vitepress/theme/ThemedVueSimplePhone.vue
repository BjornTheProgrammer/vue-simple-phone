<script setup lang="ts">
import { VueSimplePhone } from '../../../src';
import { ref, watch } from 'vue';

const props = defineProps<{
	theme: string
}>();

const css = ref('');

const moduleStrings = import.meta.glob(
	'../../../src/themes/*.css',
	{
		query: '?inline',
		import: 'default',
	},
);

watch(
	() => props.theme,
	async (newTheme, oldTheme) => {
		if (newTheme !== oldTheme) {
			css.value = (await moduleStrings[
				`../../../src/themes/${newTheme}.css`
			]()) as string;
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

<style scoped :src="url"></style>
