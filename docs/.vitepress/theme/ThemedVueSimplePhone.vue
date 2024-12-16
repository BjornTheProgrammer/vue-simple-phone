<script setup lang="ts">
import { VueSimplePhone } from '../../../src';
// import css from '../../../src/themes/dark.css?inline';
</script>

<template>
	<VueSimplePhone />
</template>

<style lang="scss" scoped>
:deep() {
	@import "../../../src/themes/dark";
}
</style>
