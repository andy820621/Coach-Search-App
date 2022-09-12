<template>
	<section><CoachFilter></CoachFilter></section>
	<section>
		<BaseCard>
			<div class="controls">
				<base-button mode="outline">Refresh</base-button>
				<base-button link to="/register" v-if="!userIsCoach"
					>Register as Coach</base-button
				>
			</div>
			<ul v-if="hasCoaches">
				<CoachList
					v-for="coach in filteredCoaches"
					:id="coach.id"
					:firstName="coach.firstName"
					:lastName="coach.lastName"
					:rate="coach.hourlyRate"
					:areas="coach.areas"
					:key="coach.id"
				/>
			</ul>
			<h3 v-else>No coaches found.</h3>
		</BaseCard>
	</section>
</template>

<script setup>
import { storeToRefs } from "pinia";
import { useCouchesStore } from "@/stores/coaches.js";
import CoachList from "@/components/coaches/CoachList.vue";
import CoachFilter from "@/components/coaches/CoachFilter.vue";
import { provide, ref } from "vue";
import { computed } from "@vue/reactivity";

const useCouches = useCouchesStore();
const { coaches, hasCoaches, userIsCoach } = storeToRefs(useCouches);

const filters = ref({
	frontend: true,
	backend: true,
	career: true,
});
provide("filters", filters);

const filteredCoaches = computed(() =>
	coaches.value.filter((coach) =>
		coach.areas.some((area) => filters.value[area])
	)
);
</script>

<style lang="scss" scoped>
.controls {
	display: flex;
	justify-content: space-between;
}
</style>
