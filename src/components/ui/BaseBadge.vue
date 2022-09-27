<template>
	<span class="badge" :class="type">
		{{ text }}
	</span>
</template>

<script setup>
import { computed } from "@vue/reactivity";

const props = defineProps(["type"]);
const text = computed(() => props.type.toUpperCase());
</script>

<style lang="scss" scoped>
.badge {
	background-color: #ccc;
	color: #242424;
	border-radius: 2rem;
	padding: 0.5rem 1.5rem;
	display: inline-block;
	margin-right: 0.5rem;
	margin-bottom: 0.5rem;
}
@media (max-width: 768px) {
	.badge {
		font-size: 0.95rem;
		padding: 0.4rem 01rem;
	}
}
.frontend {
	background-color: #3d008d;
}
.backend {
	background-color: #71008d;
}

.career {
	background-color: #8d006e;
}
.frontend,
.career,
.backend {
	color: #eee;
}
</style>
