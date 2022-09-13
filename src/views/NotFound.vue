<template>
	<section>
		<BaseCard>
			<h2>Page not found</h2>
			<p>
				This page could not found -- Maybe check out all our
				<RouterLink to="/coaches"> coaches </RouterLink> page.
			</p>
		</BaseCard>
	</section>
</template>

<script setup>
import BaseCard from "../components/ui/BaseCard.vue";
</script>

<style lang="scss" scoped>
a {
	font-size: 1.3rem;
	font-weight: bold;
	transition: 0.3s ease-in-out;
	&:hover {
		color: #8d64bb;
	}
}
</style>
