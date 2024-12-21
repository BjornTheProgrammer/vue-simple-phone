import { expect, test } from 'vitest';
import { render } from 'vitest-browser-vue';
import VueSimplePhone from './VueSimplePhone.vue';
import '../themes/light-square.css';

function eventLoop(func: () => Promise<void> | void) {
	return new Promise((resolve) =>
		setTimeout(async () => {
			resolve(await func);
		}),
	);
}

test('renders', async () => {
	const screen = render(VueSimplePhone, {
		props: {},
	});

	await expect
		.element(
			screen.getByRole('textbox', {
				name: 'Phone number input',
			}),
		)
		.toBeInTheDocument();

	await expect.element(screen.getByRole('button')).toBeInTheDocument();
});

test('clickable', async () => {
	const screen = render(VueSimplePhone, {
		props: {},
	});

	await expect.element(screen.getByRole('listbox')).not.toBeInTheDocument();

	await screen
		.getByRole('button', {
			name: 'Country Code Selector',
		})
		.click();

	await eventLoop(async () => {
		await expect.element(screen.getByRole('listbox')).toBeVisible();
	});
});

test('click andorra', async () => {
	const screen = render(VueSimplePhone, {
		props: {},
	});

	await expect
		.element(
			screen.getByRole('button', {
				name: 'Andorra',
			}),
		)
		.not.toBeInTheDocument();

	await screen
		.getByRole('button', {
			name: 'Country Code Selector',
		})
		.click();

	await screen
		.getByRole('button', {
			name: 'Andorra',
		})
		.click();

	await expect.element(screen.getByText('+378')).toBeVisible();

	await expect
		.element(
			screen.getByRole('textbox', {
				name: 'Phone number input',
			}),
		)
		.toHaveAttribute('placeholder', '712 345');
});
