<script setup lang="ts">
import {
	type ParsedPhoneNumber,
	getAsYouType,
	getCountryCodeForRegionCode,
	getExample,
	getSupportedRegionCodes,
} from 'awesome-phonenumber';
import { countries as countriesFromFlagIcons } from 'country-flag-icons';
import { type Directive, ref, useSlots, watch } from 'vue';
import CountryFlag from './flags/CountryFlag.vue';

const props = withDefaults(
	defineProps<{
		region?: (typeof countriesFromFlagIcons)[number];
		language?: Intl.LocalesArgument;
		value?: string;
		countries?: string[];
		disabled?: boolean;
		opened?: boolean;
		placeholder?: string;
		displayFlags?: boolean;
	}>(),
	{
		region: 'US',
		// @ts-ignore
		language: ['en'] as Intl.LocalesArgument,
		// @ts-ignore
		countries: countriesFromFlagIcons,
		disabled: false,
		opened: undefined,
		displayFlags: true,
	},
);

const emit = defineEmits<{
	open: [];
	close: [];
}>();

let regionNames = new Intl.DisplayNames(props.language, { type: 'region' });
const regionNamesKey = ref(0);

const buttonDropdown = ref(props.opened);
const selectedRegion = ref(props.region);

watch(
	() => props.language,
	(newValue, oldValue) => {
		if (oldValue !== newValue) {
			regionNames = new Intl.DisplayNames(newValue, { type: 'region' });
			regionNamesKey.value++;
		}
	},
);

watch(
	() => props.region,
	(newValue, oldValue) => {
		if (oldValue !== newValue) {
			selectedRegion.value = newValue;
		}
	},
);

watch(
	() => props.opened,
	(newValue, oldValue) => {
		if (oldValue !== newValue) {
			buttonDropdown.value = newValue ?? false;
		}
	},
);

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
	if (typeof str !== 'string') return false; // we only process strings!
	return (
		!Number.isNaN(str as unknown as number) && // use type coercion to parse the _entirety_ of the string (`parseFloat` alone does not do this)...
		!Number.isNaN(Number.parseFloat(str))
	); // ...and ensure strings of whitespace fail
}

const handleKeypress = (e: KeyboardEvent) => {
	if (e.key === 'Enter' || e.key === 'Tab') return;
	e.preventDefault();

	if (props.disabled) return;

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

const handleClose = () => {
	if (props.opened === undefined) buttonDropdown.value = false;
	emit('close');
};

const handleOpen = () => {
	if (props.opened === undefined) buttonDropdown.value = true;
	emit('open');
};

const handleToggle = () => {
	if (buttonDropdown.value === true) handleClose();
	else handleOpen();
};

const supportExamples = getSupportedRegionCodes();
const slots = useSlots();
</script>

<template>
	<div class="vue-simple-phone-container">
		<label v-if="slots.default" class="vue-simple-phone-label">
			<slot />
		</label>
		<div class="vue-simple-phone-input-container">
			<Transition name="vue-simple-phone">
				<div v-if="buttonDropdown" class="vue-simple-phone-button-dropdown-wrapper">
					<button
						type="button"
						class="vue-simple-phone-button-dropdown"
						v-click-outside="handleClose"
						:disabled="disabled"
					>
						<ul class="vue-simple-phone-button-dropdown-list">
							<li class="vue-simple-phone-button-dropdown-item" v-for="country in countries">
								<button
									type="button"
									class="vue-simple-phone-button-dropdown-item-button"
									@click="() => {
									selectedRegion = country;
									handleClose()
								}">
									<CountryFlag v-if="displayFlags" :flag="country" class="vue-simple-phone-button-icon" />
									<div class="vue-simple-phone-button-number" :key="regionNamesKey">
										{{ regionNames.of(country) }} (+{{ getCountryCodeForRegionCode(country) }})
									</div>
								</button>
							</li>
						</ul>
					</button>
				</div>
			</Transition>
			<button
				type="button"
				class="vue-simple-phone-button"
				@click="handleToggle"
				:disabled="disabled"
			>
				<CountryFlag v-if="displayFlags" :flag="selectedRegion" class="vue-simple-phone-button-icon" />
				<div class="vue-simple-phone-button-number">
					+{{ getCountryCodeForRegionCode(selectedRegion) }}
				</div>
				<svg class="vue-simple-phone-button-dropdown-icon" xmlns="http://www.w3.org/2000/svg"
					viewBox="0 0 448 512">
					<path
						d="M201.4 374.6c12.5 12.5 32.8 12.5 45.3 0l160-160c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L224 306.7 86.6 169.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l160 160z" />
				</svg>
			</button>
			<input 
				@keydown="handleKeypress"
				:value="formattedNumber"
				type="tel"
				class="vue-simple-phone-input"
				:placeholder="placeholder ? placeholder : supportExamples.includes(selectedRegion) ? getExample(selectedRegion).number?.national || '' : ''"
				:disabled="disabled"
			/>
		</div>
	</div>
</template>
