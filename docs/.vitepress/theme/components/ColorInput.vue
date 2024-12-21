<script setup lang="ts">
import { ref, useTemplateRef } from 'vue';
import { ColorPicker } from 'vue-accessible-color-picker';
import { vClickOutside } from '../../../../src/directives/click-outside';

const model = defineModel<string>({
	default: '#00000000',
});

const dialog = useTemplateRef('dialog');
const open = () => {
	setTimeout(() => {dialog.value.showModal()})
}
</script>

<template>
	<div class="relative w-fit h-fit">
		<div
			class="w-10 h-4 border-[1px]"
			:style="`background-color: ${model};`"
			@click="open"
		>	
		</div>
		<dialog
			ref="dialog"
			class="bg-white z-[100] mx-auto right-0 rounded-lg shadow-2xl shadow-[rgba(0,0,0,0.6)]"
		>
			<div v-click-outside="() => dialog.close()">
				<ColorPicker :color="model" @color-change="(color) => model = color.colors.hex" />
			</div>
		</dialog>
	</div>
</template>

<style scoped>
dialog::backdrop {
	background-color: transparent;
}
</style>
