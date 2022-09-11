<template>
	<section>Filter</section>
	<section>
		<div class="controls">
			<button>Refresh</button>
			<router-link to="/register">Register as Coach</router-link>
		</div>
		<ul v-if="hasCoaches">
			<li v-for="coach in coaches" :key="coach.id">
				{{ coach.firstName }} {{ coach.lastName }}
			</li>
		</ul>
		<h3 v-else>No coaches found.</h3>
	</section>
</template>

<script setup>
import { storeToRefs } from "pinia";
import { useCouchesStore } from "@/stores/coaches.js";
const useCouches = useCouchesStore();
const { coaches, hasCoaches } = storeToRefs(useCouches);
</script>

<style lang="scss" scoped></style>
