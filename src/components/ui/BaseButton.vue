<template>
	<button v-if="!link" :class="mode">
		<slot></slot>
	</button>
	<router-link v-else :to="to" :class="mode">
		<slot></slot>
	</router-link>
</template>

<script setup>
const props = defineProps({
	mode: {
		type: String,
		required: false,
		default: null,
	},
	link: {
		type: Boolean,
		required: false,
		default: false,
	},
	to: {
		type: String,
		required: false,
		default: "/",
	},
});
</script>

<style lang="scss" scoped>
button,
a {
	display: inline-block;
	padding: 0.75rem 1.5rem;
	font: inherit;
	background-color: #270041;
	border: 1px solid #270041;
	border-radius: 2em;
	color: #eee;
	cursor: pointer;
	transition: 0.3s, transform 0s;

	&:hover,
	&:active {
		background-color: #280042cf;
	}

	&:active {
		transform: translateY(0.24rem);
	}

	& ~ :where(button, a) {
		margin-left: 1.26rem;
	}
}

.flat,
.outline {
	background-color: transparent;

	&:hover,
	&:active {
		background-color: #edd2ff;
	}
}
.flat {
	color: #3a0061;
	border: none;
}
.outline {
	color: #270041;
	border-color: #270041;
}
</style>
