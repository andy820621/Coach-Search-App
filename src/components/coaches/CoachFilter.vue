<template>
	<BaseCard>
		<h2>Find Your Coach</h2>
		<span class="filter-option">
			<input type="checkbox" id="frontend" checked @change="setFilter" />
			<label for="frontend">Frontend</label>
		</span>
		<span class="filter-option">
			<input type="checkbox" id="backend" checked @change="setFilter" />
			<label for="backend">Backend</label>
		</span>
		<span class="filter-option">
			<input type="checkbox" id="career" checked @change="setFilter" />
			<label for="career">Career</label>
		</span>
	</BaseCard>
</template>

<script setup>
import { inject } from "vue";

const filters = inject("filters");
function setFilter(e) {
	const inputId = e.target.id;
	const isActive = e.target.checked;
	filters.value[inputId] = isActive;
}
</script>

<style lang="scss" scoped>
h2 {
	margin: 0.5rem 0;
}
.filter-option {
	margin-right: 1rem;

	label,
	input {
		vertical-align: middle;
	}

	&.active label {
		font-weight: bold;
	}
}
</style>
