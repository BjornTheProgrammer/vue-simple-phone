<script setup lang="ts">
import { type Directive, ref } from 'vue';
import { ColorPicker } from 'vue-accessible-color-picker';

const model = defineModel<string>({
	default: '#00000000',
});
const popupOpen = ref<boolean>(false);

const vClickOutside: Directive = {
	beforeMount: (el, binding) => {
		el.clickOutsideEvent = (event: MouseEvent) => {
			if (!(el === event.target || el.contains(event.target))) binding.value();
		};

		setTimeout(() => document.addEventListener('click', el.clickOutsideEvent));
	},
	unmounted: (el) => {
		document.removeEventListener('click', el.clickOutsideEvent);
	},
};
</script>

<template>
	<div class="relative w-fit h-fit">
		<div
			v-if="popupOpen == false"
			class="w-10 h-4 border-[1px]"
			:style="`background-color: ${model};`"
			@click="() => popupOpen = true"
		>	
		</div>
		<div v-else v-click-outside="() => popupOpen = false" class="bg-white absolute w-max z-[999]">
			<ColorPicker style="color: #000;" :color="model" @color-change="(color) => model = color.colors.hex" />
		</div>
	</div>
</template>
