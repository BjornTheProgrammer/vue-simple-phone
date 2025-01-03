import type { Directive } from 'vue';

export const vClickOutside: Directive = {
	beforeMount: (el, binding) => {
		if (typeof binding.value !== 'function')
			throw new Error('Binding must be a function');
		el.clickOutsideEvent = (event: MouseEvent) => {
			if (!(el === event.target || el.contains(event.target))) binding.value();
		};

		setTimeout(() => document.addEventListener('click', el.clickOutsideEvent));
	},
	unmounted: (el) => {
		document.removeEventListener('click', el.clickOutsideEvent);
	},
};
