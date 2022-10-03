<template>
	<teleport to="body">
		<div v-if="show" class="background" @click="clickHandler"></div>

		<transition name="dialog">
			<dialog open v-if="show">
				<header>
					<slot name="header">
						<h2>{{ title }}</h2>
					</slot>
				</header>
				<section>
					<slot></slot>
				</section>
				<menu>
					<slot name="actions">
						<BaseButton @click="clickHandler">Close</BaseButton>
					</slot>
				</menu>
			</dialog>
		</transition>
	</teleport>
</template>

<script setup>
const props = defineProps({
	show: {
		type: Boolean,
		required: true,
	},
	title: {
		type: String,
		required: false,
	},
	fixed: {
		type: Boolean,
		required: false,
		default: false,
	},
});

const emit = defineEmits(["close"]);

function clickHandler() {
	if (!props.fixed) emit("close");
}
</script>

<style lang="scss" scoped>
.background {
	position: fixed;
	inset: 0;
	background-color: rgb(0 0 0 / 0.5);
	z-index: 9;
	backdrop-filter: blur(0.15rem);
}
dialog {
	position: fixed;
	top: 20vh;
	@media (max-width: 768px) {
		left: 50%;
		transform: translateX(-50%);
	}
	width: 80%;
	z-index: 99;
	border-radius: 12px;
	border: none;
	box-shadow: 0 2px 8px rgb(0 0 0 / 0.26);
	padding: 0;
	margin: 0;
	overflow: hidden;
}
header {
	background-color: #3a0061;
	color: #eee;
	width: 100%;
	padding: 1rem;
}
header h2 {
	margin: 0;
}
section {
	padding: 1rem;
}
menu {
	padding: 1rem;
	display: flex;
	justify-content: flex-end;
	margin: 0;
}
@media (min-width: 768px) {
	dialog {
		left: calc(50% - 20rem);
		width: 40rem;
	}
}

// vue transition
.dialog-enter-from,
.dialog-leave-to {
	opacity: 0;
	transform: scale(0.8);
}
.dialog-enter-active {
	transition: all 0.3s ease-out;
}
.dialog-leave-active {
	transition: all 0.3s ease-in;
}
.dialog-enter-to,
.dialog-leave-from {
	opacity: 1;
	transform: scale(1);
}
</style>
