import { getAsYouType, type ParsedPhoneNumber } from 'awesome-phonenumber';
import { computed, type ModelRef, type Ref, watch } from 'vue';

function isNumeric(str: string) {
	if (typeof str !== 'string') return false; // we only process strings!
	return (
		!Number.isNaN(str as unknown as number) && // use type coercion to parse the _entirety_ of the string (`parseFloat` alone does not do this)...
		!Number.isNaN(Number.parseFloat(str))
	); // ...and ensure strings of whitespace fail
}

function isAcceptable(phone: ParsedPhoneNumber) {
	return (
		phone.possibility === 'is-possible' ||
		phone.possibility === 'unknown' ||
		phone.possibility === 'too-short'
	);
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

	const formattedNumber = computed(() => {
		const phone = model.value;
		return phone?.number?.national ?? ayt.number() ?? '';
	});

	const history: string[] = [formattedNumber.value];
	let redoStack: string[] = [];

	function pushHistory() {
		const phone = ayt.getPhoneNumber();
		if (!phone) return;

		if (formattedNumber.value !== history[history.length - 1]) {
			model.value = phone;
			history.push(formattedNumber.value);
			redoStack = [];
		}
	}

	watch(region, (newRegion) => {
		const number = ayt.number();
		ayt = getAsYouType(newRegion);
		ayt.reset(number);
		pushHistory();
	});

	function handleUndo() {
		if (history.length <= 1) return; // nothing to undo

		const current = history.pop() as string;
		redoStack.push(current);

		const prev = history[history.length - 1];
		ayt.reset(prev);
		const phone = ayt.getPhoneNumber();
		model.value = phone;
	}

	function handleRedo() {
		if (redoStack.length === 0) return;

		const next = redoStack.pop() as string;
		history.push(next);

		ayt.reset(next);
		const phone = ayt.getPhoneNumber();
		model.value = phone;
	}

	function handlePaste(e: ClipboardEvent) {
		e.preventDefault();
		const pasted = e.clipboardData?.getData('text') ?? '';
		const digits = [...pasted].filter(isNumeric).join('');

		const inputEl = e.currentTarget as HTMLInputElement;
		const start = inputEl.selectionStart ?? 0;
		const end = inputEl.selectionEnd ?? start;

		const before = [...formattedNumber.value.slice(0, start)]
			.filter(isNumeric)
			.join('');
		const after = [...formattedNumber.value.slice(end)]
			.filter(isNumeric)
			.join('');

		ayt.reset(before + digits + after);
		while (!isAcceptable(ayt.getPhoneNumber())) {
			ayt.removeChar();
		}

		model.value = ayt.getPhoneNumber();
		pushHistory();
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
		if (e.ctrlKey || e.metaKey) {
			if (e.key.toLowerCase() === 'z') {
				e.preventDefault();
				if (e.shiftKey) handleRedo();
				else handleUndo();
				return;
			}
			if (e.key.toLowerCase() === 'y') {
				e.preventDefault();
				handleRedo();
				return;
			}
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
		if (!isAcceptable(phone)) {
			ayt.removeChar();
			phone = ayt.getPhoneNumber();
		}

		model.value = phone;
		pushHistory();
	}

	return {
		formattedNumber,
		handlePaste,
		handleCopy,
		handleKeypress,
	};
}
