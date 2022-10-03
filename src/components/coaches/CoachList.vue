<template>
	<li>
		<h3>{{ fullName }}</h3>
		<h4>${{ rate }}/hour</h4>
		<div class="bageContainer">
			<BaseBadge v-for="area in areas" :key="area" :type="area">{{
				area
			}}</BaseBadge>
		</div>
		<div class="actions">
			<BaseButton link mode="outline" :to="contactLink">Contact</BaseButton>
			<BaseButton link :to="detailLink">View Details</BaseButton>
		</div>
	</li>
</template>

<script setup>
import { useRoute } from "vue-router";
import { computed } from "@vue/reactivity";
import BaseBadge from "@/components/ui/BaseBadge.vue";

const route = useRoute();
const props = defineProps(["id", "firstName", "lastName", "rate", "areas"]);

const fullName = computed(() => props.firstName + " " + props.lastName);

const contactLink = computed(
	() => `${route.matched[0].path}/${props.id}/contact`
);
const detailLink = computed(() => `${route.matched[0].path}/${props.id}`);
</script>

<style lang="scss" scoped>
li {
	margin: 1rem 0;
	padding: 1rem;
	border: 1px solid #424242;
	border-radius: 13px;
}
h3 {
	font-size: 1.5rem;
}
div,
h3,
h4 {
	margin: 0.5rem 0;
}
.bageContainer {
	margin-top: 1rem;
}
.actions {
	display: flex;
	justify-content: flex-end;
	margin-top: 2.4rem;
}
@media (max-width: 500px) {
	li {
		text-align: center;
	}
	.actions {
		display: grid;
		justify-content: center;
		gap: 1rem;
		button,
		a {
			margin: 0;
			text-align: center;
			min-width: 50vw !important;
		}
	}
}
</style>
