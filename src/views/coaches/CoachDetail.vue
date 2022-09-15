<template>
	<div>
		<section>
			<BaseCard>
				<h2>{{ fullName }}</h2>
				<h3>${{ hourlyRate }} per hour</h3>
			</BaseCard>
		</section>
		<section>
			<BaseCard>
				<header>
					<h2>Interested? Reach out now!</h2>
					<BaseButton link :to="contactLink">Contact</BaseButton>
				</header>
				<router-view></router-view>
			</BaseCard>
		</section>
		<section>
			<BaseCard>
				<BaseBadge v-for="area in areas" :key="area" :type="area" />
				<p>{{ description }}</p>
			</BaseCard>
		</section>
	</div>
</template>

<script setup>
import { useCouchesStore } from "@/stores/coaches.js";
import { computed, onMounted, watch, ref } from "vue";
import { useRoute } from "vue-router";

const useCouches = useCouchesStore();
const route = useRoute();

const id = route.params.id;
const coach = ref(null);
coach.value = useCouches.coaches.find((coach) => coach.id === id);

onMounted(() => {
	// console.log(`CoachDetail mounted!!`);

	setTimeout(() => {
		coach.value = useCouches.coaches.find((coach) => coach.id === id);
	}, 300);
});

const firstName = computed(() => coach.value?.firstName);
const lastName = computed(() => coach.value?.lastName);
const hourlyRate = computed(() => coach.value?.hourlyRate);
const areas = computed(() => coach.value?.areas);
const description = computed(() => coach.value?.description);
const fullName = computed(() => firstName.value + " " + lastName.value);
const contactLink = computed(() => `${route.matched[0].path}/contact`);
</script>

<style lang="scss" scoped></style>
