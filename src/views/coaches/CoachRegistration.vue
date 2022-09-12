<template>
	<section>
		<BaseCard>
			<h2>Register as a coach now!</h2>
			<CoachRegisterForm></CoachRegisterForm>
		</BaseCard>
	</section>
</template>

<script setup>
import CoachRegisterForm from "@/components/coaches/CoachRegisterForm.vue";
</script>

<style lang="scss" scoped>
h2 {
	text-align: center;
	font-size: 1.75rem;
}
</style>
