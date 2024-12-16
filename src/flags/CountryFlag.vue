<script setup lang="ts">
import { hasFlag } from 'country-flag-icons';
import { ref, watch } from 'vue';

const props = defineProps({
	flag: {
		type: String,
		required: true,
		validator: (value: string) => {
			return hasFlag(value);
		},
	},
});

const svg = ref('');

const moduleStrings = import.meta.glob(
	'../../node_modules/country-flag-icons/1x1/*.svg',
	{
		query: '?raw',
		import: 'default',
	},
);

watch(() => props.flag, async (newFlag, oldFlag) => {
	if (newFlag !== oldFlag) {
		svg.value = await moduleStrings[`../../node_modules/country-flag-icons/1x1/${newFlag}.svg`]()

	}
}, { immediate: true });
</script>

<template>
	<svg v-html="svg"></svg>
</template>
