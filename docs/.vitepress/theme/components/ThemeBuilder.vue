<script setup lang="ts">
import { useData } from 'vitepress';
import { computed, ref } from 'vue';

const textColor = ref('#000000');
const placeholderColor = ref('#00000088');
const backgroundColor = ref('#FFFFFF');
const borderColor = ref('#00000022');
const outlineColor = ref('#007BFF');
const inputBorderRadius = ref(10);
const dropdownBorderRadius = ref(10);
const roundedFlags = ref(true);
const transitionTime = ref(0.14);

const flagsBorderRadius = computed(() => {
	return roundedFlags.value ? '9999px' : '0px';
});

const cssCode = computed(() => {
	return `.vue-simple-phone-button-dropdown-dialog {
	--duration: .14s;
	z-index: 10;
	color: ${textColor.value} !important;

	transition: opacity var(--duration), visibility var(--duration);
	transition-timing-function: ease-in-out;

	&[open] {
		/* Post-Entry (Normal) State */
		opacity: 1;
		visibility: visible;
		display: block;

		/* Pre-Entry State */
		@starting-style {
			opacity: 0;
			visibility: hidden;
			display: block;
		}
	}

	/* Exiting State */
	&:not([open]) {
		opacity: 0;
		visibility: hidden;
		display: block;
	}
}

.vue-simple-phone-container * {
	box-sizing: border-box;
}

.vue-simple-phone-container button {
	all: unset;
}

.vue-simple-phone-label {
	margin-bottom: 10px !important;
	display: block !important;
}

.vue-simple-phone-container {
	display: flex !important;
	flex-direction: column !important;
	text-align: left !important;
	width: 100% !important;
}

.vue-simple-phone-input-container {
	background-color: ${backgroundColor.value} !important;
	color: ${textColor.value} !important;
	display: flex !important;
	border-radius: ${inputBorderRadius.value}px !important;
	position: relative !important;
	width: 100% !important;
	box-shadow: 0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1);
	border: solid 1px ${borderColor.value} !important;
}

.vue-simple-phone-button {
	all: unset !important;
	display: flex !important;
	justify-content: center !important;
	align-items: center !important;
	padding: 12px !important;
	border-right: solid 1px ${borderColor.value} !important;
	font-size: 16px !important;
	cursor: pointer !important;
	transition: background-color 0.25s !important;
}

.vue-simple-phone-button:hover {
	background-color: rgba(0,0,0,0.05) !important;
}

.vue-simple-phone-button:focus,
.vue-simple-phone-button:focus:not(:focus-visible) {
	outline: 2px solid ${outlineColor.value} !important;
	border-radius: ${inputBorderRadius.value}px 0px 0px ${inputBorderRadius.value}px !important;
}

.vue-simple-phone-input {
	all: unset !important;
	display: flex !important;
	width: 100% !important;
	align-items: center !important;
	justify-content: flex-start !important;
	padding-left: 10px !important;
	font-size: 16px !important;
	flex-grow: 1 !important;
}

.vue-simple-phone-input::placeholder {
	color: ${placeholderColor.value} !important;
	opacity: 1 !important;
}

.vue-simple-phone-input:focus {
	outline: 2px solid ${outlineColor.value} !important;
	border-radius: 0px ${inputBorderRadius.value}px ${inputBorderRadius.value}px 0px !important;
}

.vue-simple-phone-button-icon {
	height: 16px !important;
	width: 16px !important;
	border-radius: ${flagsBorderRadius.value} !important;
}

.vue-simple-phone-button-number {
	padding-left: 10px !important;
}

.vue-simple-phone-button-dropdown-icon {
	padding-left: 10px !important;
	fill: ${textColor.value} !important;
	width: 20px !important;
	height: 20px !important;
}

.vue-simple-phone-button-dropdown-dialog {
	margin: 0px !important;
	margin-top: 51px !important;
}

.vue-simple-phone-button-dropdown {
	background: ${backgroundColor.value} !important;
	border-radius: ${dropdownBorderRadius.value}px !important;
	box-shadow: 0 4px 6px rgba(0,0,0,0.1) !important;
	border: solid 1px ${borderColor.value} !important;
}

.vue-simple-phone-button-dropdown-list {
	padding: 0px !important;
	margin: 10px 0px !important;
	height: 200px !important;
	overflow: scroll !important;
	list-style-type: none !important;
}

.vue-simple-phone-button-dropdown-item {
	margin: 0 !important;
	list-style-type: none !important;
}

.vue-simple-phone-button-dropdown-item:hover {
	background-color: rgba(0, 0, 0, 0.1) !important;
}

.vue-simple-phone-button-dropdown-item-button {
	display: flex !important;
	align-items: center !important;
	width: 100% !important;
	height: 100% !important;
	padding: 5px 10px !important;
	cursor: pointer !important;
}
`;
});

const { isDark } = useData();

const copyCode = (e: MouseEvent) => {
	const target = e.target as HTMLButtonElement;
	target.innerText = 'Copied!';
	setTimeout(() => {
		target.innerText = 'Copy Code';
	}, 500);

	try {
		navigator.clipboard.writeText(cssCode.value);
	} catch (error) {
		console.log('failed:', error);
	}
};
</script>

<template>
	<div :class="(isDark ? `bg-neutral-900 text-white`: `bg-neutral-100 text-black`) + ' rounded p-5 grid grid-cols-2 sm:grid-cols-3 gap-4 my-5'">
		<div class="flex flex-col space-x-1">
			<label>Text Color</label>
			<ColorInput v-model="textColor" />
		</div>
		<div class="flex flex-col space-x-1">
			<label>Placeholder Color</label>
			<ColorInput v-model="placeholderColor" />
		</div>
		<div class="flex flex-col space-x-1">
			<label>Background Color</label>
			<ColorInput v-model="backgroundColor" />
		</div>
		<div class="flex flex-col space-x-1">
			<label>Border Color</label>
			<ColorInput v-model="borderColor" />
		</div>
		<div class="flex flex-col space-x-1">
			<label>Outline Color</label>
			<ColorInput v-model="outlineColor" />
		</div>
		<div class="flex flex-col space-x-1">
			<label>Rounded Flags</label>
			<label class="inline-flex items-center cursor-pointer">
				<input type="checkbox" v-model="roundedFlags" class="sr-only peer" />
				<div class="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
			</label>
		</div>
		<div class="flex flex-col space-x-1">
			<label>Dropdown Open Speed</label>
			<input v-model="transitionTime" type="number" aria-describedby="helper-text-explanation" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"/>
		</div>
		<div class="flex flex-col space-x-1">
			<label>Input Border Radius</label>
			<NumberInput v-model="inputBorderRadius" />
		</div>
		<div class="flex flex-col space-x-1">
			<label>Dropdown Border Radius</label>
			<NumberInput v-model="dropdownBorderRadius" />
		</div>
	</div>

	<div>
		<component is="style">
			@scope {
				{{ cssCode }}
			}
		</component>
		<VueSimplePhone :opened="true" />
	</div>

	<div class="w-full">
		<button
			:class="(isDark ? `bg-neutral-900 text-white shadow shadow-neutral-600 hover:bg-neutral-800`: `bg-neutral-100 text-black shadow hover:bg-neutral-200`) + ' rounded p-2 my-5 block ml-auto'"
			@click="copyCode"
		>
			Copy Code!
		</button>
	</div>
</template>

<style>
	@import url('vue-accessible-color-picker/styles');
</style>
