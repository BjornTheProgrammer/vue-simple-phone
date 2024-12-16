<script setup lang="ts">
import {
	type ParsedPhoneNumber,
	getAsYouType,
	getCountryCodeForRegionCode,
	getExample,
} from 'awesome-phonenumber';
import { countries } from 'country-flag-icons';
import { type Directive, ref, watch, useSlots } from 'vue';
import CountryFlag from './flags/CountryFlag.vue';

const props = withDefaults(
	defineProps<{
		region?: (typeof countries)[number];
		language?: Intl.LocalesArgument;
		value?: string;
	}>(),
	{
		region: 'US',
		// @ts-ignore
		language: ['en'] as Intl.LocalesArgument,
	},
);

const regionNames = new Intl.DisplayNames(props.language, { type: 'region' });

const buttonDropdown = ref(false);
const selectedRegion = ref(props.region);

const model = defineModel<ParsedPhoneNumber>();

let ayt = getAsYouType(props.region);
if (props.value) ayt.reset(props.value);
model.value = ayt.getPhoneNumber();

watch(selectedRegion, async (newRegion) => {
	const number = ayt.number();
	ayt = getAsYouType(newRegion);
	ayt.reset(number);

	model.value = ayt.getPhoneNumber();
});

const formattedNumber = ref(ayt.number());

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

function isNumeric(str: string) {
	if (typeof str != "string") return false // we only process strings!  
	return !isNaN(str as unknown as number) && // use type coercion to parse the _entirety_ of the string (`parseFloat` alone does not do this)...
			!isNaN(parseFloat(str)) // ...and ensure strings of whitespace fail
}

const handleKeypress = (e: KeyboardEvent) => {
	const isNumber = isNumeric(e.key) && e.key !== ' ';

	if (e.key === 'Delete' || e.key === 'Backspace') ayt.removeChar();
	else if (isNumber) ayt.addChar(e.key);

	let phone = ayt.getPhoneNumber();
	if (
		phone.possibility !== 'is-possible' &&
		phone.possibility !== 'unknown' &&
		phone.possibility !== 'too-short'
	)
		ayt.removeChar();

	phone = ayt.getPhoneNumber();

	model.value = phone;

	formattedNumber.value = phone.number?.national || ayt.number();
};

const slots = useSlots()
</script>

<template>
	<div class="vue-simple-phone-container">
		<label v-if="slots" class="vue-simple-phone-label">
			<slot />
		</label>
		<div class="vue-simple-phone-input-container">
			<button type="button" class="vue-simple-phone-button" @click="buttonDropdown = !buttonDropdown">
				<CountryFlag :flag="selectedRegion" class="vue-simple-phone-button-icon" />
				<div class="vue-simple-phone-button-number">
					+{{ getCountryCodeForRegionCode(selectedRegion) }}
				</div>
				<svg class="vue-simple-phone-button-dropdown-icon" xmlns="http://www.w3.org/2000/svg"
					viewBox="0 0 448 512">
					<path
						d="M201.4 374.6c12.5 12.5 32.8 12.5 45.3 0l160-160c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L224 306.7 86.6 169.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l160 160z" />
				</svg>
			</button>
			<Transition name="vue-simple-phone">
				<button v-if="buttonDropdown" class="vue-simple-phone-button-dropdown" v-click-outside="() => buttonDropdown = false">
					<ul class="vue-simple-phone-button-dropdown-list">
						<li class="vue-simple-phone-button-dropdown-item" v-for="country in countries">
							<button class="vue-simple-phone-button-dropdown-item-button" @click="() => {
								selectedRegion = country;
								buttonDropdown = false;
							}">
								<CountryFlag :flag="country" class="vue-simple-phone-button-icon" />
								<div class="vue-simple-phone-button-number">
									{{ regionNames.of(country) }} (+{{ getCountryCodeForRegionCode(country) }})
								</div>
							</button>
						</li>
					</ul>
				</button>
			</Transition>
			<input 
				@keydown.prevent="handleKeypress"
				:value="formattedNumber"
				type="tel"
				class="vue-simple-phone-input"
				:placeholder="getExample(selectedRegion).number?.national || ''" />
		</div>
	</div>

</template>

<style>
.vue-simple-phone-enter-active,
.vue-simple-phone-leave-active {
	transition: opacity 0.14s ease;
}

.vue-simple-phone-enter-from,
.vue-simple-phone-leave-to {
	opacity: 0;
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
	background-color: #fff !important;
	color: #000 !important;
	display: flex !important;
	border-radius: 10px !important;
	position: relative !important;
	width: 100% !important;
}

.vue-simple-phone-button {
	all: unset !important;
	display: flex !important;
	justify-content: center !important;
	align-items: center !important;
	padding: 12px !important;
	border-right: solid 1px #0002 !important;
	font-size: 16px !important;
	cursor: pointer !important;
	transition: background-color 0.25s !important;
}

.vue-simple-phone-button:hover {
	background-color: rgba(0,0,0,0.05) !important;
}

.vue-simple-phone-button:focus,
.vue-simple-phone-button:focus:not(:focus-visible) {
	outline: 2px solid #007BFF !important;
	border-radius: 10px 0px 0px 10px !important;
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
	color: #0008 !important;
	opacity: 1 !important;
}

.vue-simple-phone-input:focus {
	outline: 2px solid #007BFF !important;
	border-radius: 0px 10px 10px 0px !important;
}

.vue-simple-phone-button-icon {
	height: 16px !important;
	width: 16px !important;
	border-radius: 9999px !important;
}

.vue-simple-phone-button-number {
	padding-left: 10px !important;
}

.vue-simple-phone-button-dropdown-icon {
	padding-left: 10px !important;
	fill: #000 !important;
	width: 20px !important;
	height: 20px !important;
}

.vue-simple-phone-button-dropdown {
	background: #fff !important;
	position: absolute !important;
	top: 52px !important;
	border-radius: 10px !important;
	z-index: 100 !important;
	box-shadow: 0 4px 6px rgba(0,0,0,0.1) !important;
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
</style>
