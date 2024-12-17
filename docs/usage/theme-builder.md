# Custom Theme Creator

<script setup>
import { ref } from 'vue';
const textColor = ref('#000');
</script>

<VueSimplePhone />

<div class="bg-white">
	<label>Text Color: </label>
	<input type="color" v-model="textColor" />
</div>

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
		color: v-bind(textColor) !important;
		display: flex !important;
		border-radius: 10px !important;
		position: relative !important;
		width: 100% !important;
		box-shadow: 0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1);
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
		fill: v-bind(textColor) !important;
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