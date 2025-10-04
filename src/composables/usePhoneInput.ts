import { getAsYouType, type ParsedPhoneNumber } from 'awesome-phonenumber';
import { type ModelRef, type Ref, ref, watch } from 'vue';

function isNumeric(str: string) {
	if (typeof str !== 'string') return false; // we only process strings!
	return (
		!Number.isNaN(str as unknown as number) && // use type coercion to parse the _entirety_ of the string (`parseFloat` alone does not do this)...
		!Number.isNaN(Number.parseFloat(str))
	); // ...and ensure strings of whitespace fail
}

export function usePhoneInput(
	model: ModelRef<ParsedPhoneNumber | undefined>,
	region: Ref<string>,
	value: string | undefined,
	disabled: boolean,
) {
	let ayt = getAsYouType(region.value);
	if (value) ayt.reset(value);
	model.value = ayt.getPhoneNumber();

	const formattedNumber = ref(ayt.number());

	watch(region, async (newRegion) => {
		const number = ayt.number();
		ayt = getAsYouType(newRegion);
		ayt.reset(number);

		const phone = ayt.getPhoneNumber();
		model.value = phone;
		formattedNumber.value = phone.number?.national || ayt.number();
	});

	function handlePaste(e: ClipboardEvent) {
		e.preventDefault();
		const pasted = e.clipboardData?.getData('text') ?? '';
		for (const ch of pasted) {
			if (isNumeric(ch)) ayt.addChar(ch);
		}
		const phone = ayt.getPhoneNumber();
		model.value = phone;
		formattedNumber.value = phone.number?.national || ayt.number();
	}

	function handleCopy(e: ClipboardEvent) {
		if (!model.value) return;

		const inputEl = e.currentTarget as HTMLInputElement;
		const start = inputEl.selectionStart ?? 0;
		const end = inputEl.selectionEnd ?? 0;
		const fullValue = formattedNumber.value;

		// Check if the user selected the entire input
		const isFullSelection = start === 0 && end === fullValue.length;

		let toCopy: string;
		if (isFullSelection) {
			// Copy the normalized international form if everything is selected
			toCopy = model.value.number?.international ?? '';
		} else {
			// Otherwise, copy exactly what was selected
			toCopy = fullValue.slice(start, end);
		}

		e.preventDefault();
		e.clipboardData?.setData('text/plain', toCopy);
	}

	function handleKeypress(e: KeyboardEvent) {
		// Allow ctrl/meta combos (copy/paste/undo)
		if (
			(e.ctrlKey || e.metaKey) &&
			['v', 'V', 'c', 'C', 'x', 'X', 'z', 'Z', 'y', 'Y'].includes(e.key)
		) {
			return;
		}

		const navigationKeys = [
			'ArrowLeft',
			'ArrowRight',
			'ArrowUp',
			'ArrowDown',
			'Home',
			'End',
			'Shift',
			'Enter',
			'Tab',
		];
		if (navigationKeys.includes(e.key)) return;

		e.preventDefault();

		if (disabled) return;

		const inputEl = e.currentTarget as HTMLInputElement;
		const start = inputEl.selectionStart ?? 0;
		const end = inputEl.selectionEnd ?? start;

		if (e.key === 'Delete' || e.key === 'Backspace') {
			if (end > start) {
				const before = formattedNumber.value.slice(0, start);
				const after = formattedNumber.value.slice(end);
				ayt.reset(before + after);
			} else {
				ayt.removeChar();
			}
		} else if (isNumeric(e.key) && e.key !== ' ') {
			const before = formattedNumber.value.slice(0, start);
			const after = formattedNumber.value.slice(end);
			ayt.reset(before + e.key + after);
		}

		let phone = ayt.getPhoneNumber();
		if (
			phone.possibility !== 'is-possible' &&
			phone.possibility !== 'unknown' &&
			phone.possibility !== 'too-short'
		) {
			ayt.removeChar();
			phone = ayt.getPhoneNumber();
		}

		model.value = phone;
		formattedNumber.value = phone.number?.national || ayt.number();
	}

	return {
		formattedNumber,
		handlePaste,
		handleCopy,
		handleKeypress,
	};
}
