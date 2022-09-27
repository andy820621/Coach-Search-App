<template>
	<div>
		<section>
			<BaseCard>
				<h2>{{ fullName }}</h2>
				<h3>${{ hourlyRate }} per hour</h3>
				<BaseBadge v-for="area in areas" :key="area" :type="area" />
				<p>{{ description }}</p>
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
	</div>
</template>

<script setup>
import useGetCoach from "@/utils/useGetCoach.js";

const { hourlyRate, areas, description, fullName, contactLink } = useGetCoach();
</script>

<style lang="scss" scoped></style>
