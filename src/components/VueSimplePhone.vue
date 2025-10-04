<script setup lang="ts">
import {
	getAsYouType,
	getCountryCodeForRegionCode,
	getExample,
	getSupportedRegionCodes,
	type ParsedPhoneNumber,
	type PhoneNumberTypes,
} from 'awesome-phonenumber';
import { countries as countriesFromFlagIcons } from 'country-flag-icons';
import { computed, type InputHTMLAttributes, onMounted, ref, useId, useSlots, useTemplateRef, watch } from 'vue';
import { vClickOutside } from '../directives/click-outside';
import CountryFlag from './CountryFlag.vue';

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
		phoneNumberType?: PhoneNumberTypes;
		disableAutocompleteProcessing?: boolean;
		autocomplete?: boolean;
		searchAutocomplete?: boolean;
		htmlAutocomplete?: InputHTMLAttributes["autocomplete"];
		class?: string;
	}>(),
	{
		region: 'US',
		language: 'en',
		countries: (props) => {
			// This is kinda ugly, but basically all it does is it makes it so that in whatever specified
			// language that is used, the list is sorted alphabetically by default. Any improvements
			// are welcome for this code.
			const regionNames = new Intl.DisplayNames(props.language, {
				type: 'region',
			});
			const originalNamesMap = new Map<string, string>();
			return countriesFromFlagIcons
				.map((country) => {
					const countryName = regionNames.of(country) as string;
					originalNamesMap.set(countryName, country);
					return countryName;
				})
				.sort((a, b) => {
					return a.localeCompare(b, props.language, { sensitivity: 'base' });
				})
				.map((name) => {
					return originalNamesMap.get(name) as string;
				});
		},
		disabled: false,
		opened: undefined,
		displayFlags: true,
		searchAutocomplete: true,
	},
);

const emit = defineEmits<{
	open: [];
	close: [];
}>();

defineOptions({ inheritAttrs: false });

const searchAutocomplete = computed(() => {
  if (props.autocomplete !== undefined) {
    console.warn(
      "[DEPRECATED] The `autocomplete` prop is deprecated and will be repurposed " +
      "for HTML autocomplete in the future. Use `searchAutocomplete` instead."
    );
    return props.autocomplete;
  }
  return props.searchAutocomplete;
});

let regionNames = new Intl.DisplayNames(props.language, { type: 'region' });

const regionNamesKey = ref(0);
const search = ref('');

// These have to be named differently than the element name, otherwise we get
// a lot of warnings
// https://github.com/vuejs/core/issues/11795
const dialogRef = useTemplateRef('dialog');
const searchInputRef = useTemplateRef('searchInput');

const selectedRegion = ref(props.region);
const searchedCountries = ref<string[]>(props.countries);

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

watch(search, (newValue) => {
	const newCountries = props.countries.filter((country) => {
		return (
			country.toLowerCase().includes(newValue.toLowerCase()) ||
			(regionNames.of(country) as string)
				.toLowerCase()
				.includes(newValue.toLowerCase())
		);
	});

	searchedCountries.value = newCountries;
});

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

const closeDialog = () => {
	if (props.opened === undefined) dialogRef.value?.close();
};

const openDialog = () => {
	// Have to do this, because otherwise it will trigger before the v-click-outside does.
	setTimeout(() => {
		if (props.opened === undefined) dialogRef.value?.show();
	});
};

const toggleDialog = () => {
	if (dialogRef.value?.open) return closeDialog();
	openDialog();
};

onMounted(() => {
	let openCloseObserver = new MutationObserver((records, _observer) => {
		for (const record of records) {
			if (record.attributeName !== 'open') continue;
			const element = record.target as HTMLDetailsElement;
			let openAttibute = element.getAttribute('open');
			let opened = openAttibute === 'true' || openAttibute === '';
			if (opened) {
				element.addEventListener(
					'transitionend',
					() => {
						focusOnSearchInput();
					},
					{ once: true },
				);
				emit('open');
			}
			if (!opened) emit('close');
		}
	});

	if (dialogRef.value)
		openCloseObserver.observe(dialogRef.value, {
			attributes: true,
		});
});

const supportExamples = getSupportedRegionCodes();
const slots = useSlots();

const focusOnSearchInput = (e?: KeyboardEvent) => {
	if (!searchAutocomplete.value) return;
	// If not an alpha numeric key, then don't handle
	if (e && !/^[a-z0-9]$/i.test(e.key)) return;
	if (e) e.preventDefault();
	searchInputRef.value?.focus();
};

const vueSimplePhoneId = useId();
</script>

<template>
	<div :class="`vue-simple-phone-container ${props.class}`">
		<label :for="vueSimplePhoneId" v-if="slots.default" class="vue-simple-phone-label">
			<slot />
		</label>
		<div
			class="vue-simple-phone-input-container"
			@keydown.esc="() => {
				if (dialogRef?.open) closeDialog();
			}"
			aria-label="Phone number input"
		>
			<button
				type="button"
				class="vue-simple-phone-button"
				aria-label="Country Code Selector"
				aria-haspopup="listbox"
				:aria-expanded="dialogRef?.open ?? false"
				:disabled="disabled"
				@click.prevent="toggleDialog"
				tabindex="0"
				@keydown="focusOnSearchInput"
			>
				<Suspense>
					<CountryFlag v-if="displayFlags" :flag="selectedRegion" class="vue-simple-phone-button-icon" />
				</Suspense>
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
				:id="vueSimplePhoneId"
				@keydown="handleKeypress"
				:value="formattedNumber"
				type="tel"
				class="vue-simple-phone-input"
				aria-label="Phone number input"
				:placeholder="placeholder ? placeholder : supportExamples.includes(selectedRegion) ? getExample(selectedRegion, phoneNumberType).number?.national || '' : ''"
				:disabled="disabled"
				:autocomplete="htmlAutocomplete"
				v-bind="$attrs"
			/>
			<dialog
				ref="dialog"
				class="vue-simple-phone-button-dropdown-dialog"
				v-click-outside="() => {
					if (dialogRef?.open) closeDialog();
				}"
				:open="opened"
			>
				<div
					class="vue-simple-phone-button-dropdown"
					:disabled="disabled"
				>
					<input
						v-if="searchAutocomplete"
						type="text"
						ref="searchInput"
						class="vue-simple-phone-button-search"
						aria-label="Search country by country code or name"
						v-model="search"
						autofocus
						tabindex="-1"
						@keydown="(event) => {
							if (disableAutocompleteProcessing === true) return;
							const key = event.key;
							if (key === 'Backspace' || key === 'Delete') {
								search = '';
							}
						}"
					/>
					<ul class="vue-simple-phone-button-dropdown-list" role="listbox">
						<li
							v-for="country in searchedCountries"
							:key="country"
							class="vue-simple-phone-button-dropdown-item"
							role="option"
							:aria-selected="country === selectedRegion"
							@keydown="focusOnSearchInput"
						>
							<button
								type="button"
								class="vue-simple-phone-button-dropdown-item-button"
								:aria-label="regionNames.of(country)"
								@click="() => {
									selectedRegion = country;
									closeDialog();
								}"
								tabindex="0"
							>
								<Suspense>
									<CountryFlag
										v-if="displayFlags"
										:flag="country"
										class="vue-simple-phone-button-icon"
										:aria-hidden="true"
									/>
								</Suspense>
								<div
									class="vue-simple-phone-button-number"
									:key="regionNamesKey"
								>
									{{ regionNames.of(country) }} (+{{ getCountryCodeForRegionCode(country) }})
								</div>
							</button>
						</li>
					</ul>
				</div>
			</dialog>
		</div>
	</div>
</template>
