<script setup lang="ts">
const model = defineModel<number>();
</script>
<template>
	<div class="relative flex items-center">
		<button type="button" id="decrement-button" @click="model--" class="flex-shrink-0 hover:bg-gray-500 inline-flex items-center justify-center border border-gray-300 rounded-md h-5 w-5 focus:ring-gray-100 focus:ring-2 focus:outline-none">
			<svg class="w-2.5 h-2.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 2">
				<path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 1h16"/>
			</svg>
		</button>
		<input type="text" id="counter-input" class="flex-shrink-0 border-0 bg-transparent text-sm font-normal focus:outline-none focus:ring-0 max-w-[2.5rem] text-center" placeholder="" v-model="model" />
		<button type="button" id="increment-button" @click="model++" class="flex-shrink-0 hover:bg-gray-500 inline-flex items-center justify-center border border-gray-300 rounded-md h-5 w-5 focus:ring-gray-100 focus:ring-2 focus:outline-none">
			<svg class="w-2.5 h-2.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 18">
				<path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 1v16M1 9h16"/>
			</svg>
		</button>
	</div>
</template>
