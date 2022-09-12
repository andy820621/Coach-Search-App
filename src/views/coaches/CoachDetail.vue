<template>
	<section>
		<BaseCard>
			<h2>{{ fullName }}</h2>
			<h3>${{ coach.hourlyRate }} per hour</h3>
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
			<BaseBadge v-for="area in coach.areas" :key="area" :type="area" />
			<p>{{ coach.description }}</p>
		</BaseCard>
	</section>
</template>

<script setup>
import { useCouchesStore } from "@/stores/coaches.js";
import { computed } from "@vue/reactivity";
import { useRoute } from "vue-router";

const useCouches = useCouchesStore();
const route = useRoute();

const props = defineProps(["id"]);
const coach = useCouches.coaches.find((coach) => coach.id === props.id);

const fullName = computed(() => coach.firstName + " " + coach.lastName);
const contactLink = computed(() => `${route.path}/contact`);
</script>

<style lang="scss" scoped></style>
