<template>
	<div class="card">
		<slot></slot>
	</div>
</template>

<script setup></script>

<style lang="scss" scoped>
.card {
	border-radius: 0.75rem;
	box-shadow: 0 2px 8px rgb(0 0 0 / 0.26);
	padding: 1rem;
	margin: 2rem auto;
	max-width: 40rem;
}
</style>
