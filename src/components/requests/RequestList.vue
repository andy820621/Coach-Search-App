<template>
	<li>
		<div>
			<a :href="'mailto:' + email">{{ email }}</a>
		</div>
		<p>{{ message }}</p>
	</li>
</template>

<script setup>
const props = defineProps(["email", "message"]);
</script>

<style lang="scss" scoped>
li {
	margin: 1rem 0;
	border: 1px solid #ccc;
	padding: 1rem;
}
a {
	color: #3d008d;
	font-weight: bold;
	&:hover,
	&:active {
		color: #8d007a;
	}
}
p {
	margin: 0.5rem 0 0 0;
}
</style>
