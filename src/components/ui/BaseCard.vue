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
	width: clamp(20em, 81vw, 35em);
}
@media (min-width: 40em) {
	.card {
		width: clamp(38em, 50vw, 50em);
	}
}
</style>
