<script setup lang="ts">
import {
	type ParsedPhoneNumber,
	getAsYouType,
	getCountryCodeForRegionCode,
	getExample,
} from 'awesome-phonenumber';
import type { countries } from 'country-flag-icons';
import { type Directive, ref, watch } from 'vue';
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

let ayt = getAsYouType(props.region);
if (props.value) ayt.reset(props.value);

const model = defineModel<ParsedPhoneNumber>();

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

const handleKeypress = (e: KeyboardEvent) => {
	const isNumber = Number.isFinite(e.key as unknown as number) && e.key !== ' ';

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
</script>

<template>
	<div class="vue-simple-phone-container">
		<label class="vue-simple-phone-label">
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


.vue-simple-phone-label {
	margin-bottom: 10px;
}

.vue-simple-phone-container {
	display: flex;
	flex-direction: column;

	text-align: left;

	width: 100%;
}

.vue-simple-phone-input-container {
	background-color: #fff;
	color: #000;

	display: flex;

	border-radius: 10px;

	position: relative;
}

.vue-simple-phone-input {
	display: flex;

	width: 100%;

	align-items: center;
	justify-items: self-start;

	padding-left: 10px;

	font-size: 16px;
}

.vue-simple-phone-input::placeholder {
	color: #0008;
	opacity: 1;
	/* Firefox */
}

.vue-simple-phone-input:focus {
	outline: 2px solid #007BFF;
	border-radius: 0px 10px 10px 0px;
}

.vue-simple-phone-selected-icon {
	border-radius: 9999px;
	overflow: hidden;
}

.vue-simple-phone-button-icon {
	height: 16px;
	width: 16px;

	border-radius: 9999px;
}

.vue-simple-phone-button {
	display: flex;
	justify-items: center;
	align-items: center;

	padding: 12px;
	border-right: solid 1px;

	font-size: 16px;
}

.vue-simple-phone-button:focus,
.vue-simple-phone-button:focus:not(:focus-visible) {
	outline: 2px solid #007BFF !important;
	border-radius: 10px 0px 0px 10px !important;
}

.vue-simple-phone-button-dropdown {
	background: #fff;
	position: absolute;
	top: 52px;

	border-radius: 10px;
	z-index: 100;
}

.vue-simple-phone-button-number {
	padding-left: 10px;
}

.vue-simple-phone-button-dropdown-icon {
	padding-left: 10px;
	fill: #000;
	width: 20px;
	height: 20px;
}

.vue-simple-phone-button-dropdown-list {
	padding: 0px !important;
	margin: 10px 0px 10px 0px !important;
	height: 200px;
	overflow: scroll;
}

.vue-simple-phone-button-dropdown-item {
	margin-top: 0px !important;
	list-style-type: none;
}

.vue-simple-phone-button-dropdown-item:hover {
	background-color: rgba(0, 0, 0, 0.1);
}

.vue-simple-phone-button-dropdown-item-button {
	display: flex;
	align-items: center;
	width: 100%;
	height: 100%;
	padding: 5px 10px 5px 10px;
}
</style>
