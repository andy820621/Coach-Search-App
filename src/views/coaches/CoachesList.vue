<template>
	<div>
		<section><CoachFilter></CoachFilter></section>
		<section>
			<BaseCard>
				<div class="controls">
					<BaseButton mode="outline" @click="refreshCoaches(true)"
						>Refresh</BaseButton
					>
					<BaseButton link to="/auth?redirect=register" v-if="!isAuthenticated"
						>Login to Register as Coach</BaseButton
					>
					<BaseButton
						link
						to="/register"
						v-if="isAuthenticated && !userIsCoach && !isLoading"
						>Register as Coach</BaseButton
					>
				</div>

				<div v-if="isLoading">
					<BaseLoader />
				</div>

				<ul v-else-if="hasCoaches && !isLoading">
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

		<BaseDialog
			:show="!!fetchError"
			title="An Error Occured!"
			@close="dialogHandler"
		>
			<p>{{ fetchError }}</p>
		</BaseDialog>
	</div>
</template>

<script setup>
import { storeToRefs } from "pinia";
import { useCouchesStore } from "@/stores/coaches.js";
import { useAuthStore } from "@/stores/auth.js";
import CoachList from "@/components/coaches/CoachList.vue";
import CoachFilter from "@/components/coaches/CoachFilter.vue";
import { provide, ref } from "vue";
import { computed } from "@vue/reactivity";

const useAuth = useAuthStore();
const { isAuthenticated } = storeToRefs(useAuth);
const useCouches = useCouchesStore();
const { coaches, hasCoaches, userIsCoach } = storeToRefs(useCouches);

const isLoading = ref(false);
const fetchError = ref(null);
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

async function refreshCoaches(ForceRefreshBoolean = false) {
	isLoading.value = true;
	try {
		await useCouches.fetchCoaches(ForceRefreshBoolean);
	} catch (error) {
		fetchError.value = error.message || "Somthing went wrong!";
	}
	isLoading.value = false;
}
refreshCoaches();

function dialogHandler() {
	fetchError.value = null;
}
</script>

<style lang="scss" scoped>
.controls {
	display: flex;
	justify-content: space-between;
	margin-block: 1rem 2.4rem;
	@media (max-width: 500px) {
		flex-direction: column;
		gap: 1rem;
		margin: 0 auto;
		padding: 0 1rem;

		button,
		a {
			margin: 0;
			text-align: center;
		}
	}
}
h3 {
	text-align: center;
}
</style>
