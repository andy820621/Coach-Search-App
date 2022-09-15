<script setup>
import TheHeader from "./components/layout/TheHeader.vue";
import { useAuthStore } from "@/stores/auth.js";
import { useCouchesStore } from "@/stores/coaches.js";
import { storeToRefs } from "pinia";
import { useRouter } from "vue-router";
import { onMounted, watch } from "vue";
const useAuth = useAuthStore();
const useCouches = useCouchesStore();
const router = useRouter();
const { isLogout } = storeToRefs(useAuth);

useAuth.checkLogin();
useCouches.fetchCoaches();
// onMounted(() => {
// 	console.log(`App mounted!!`);
// });

watch(
	() => isLogout.value,
	(newValue, oldValue) => {
		if (newValue && newValue !== oldValue) router.replace("/coaches");
	}
);
</script>

<template>
	<TheHeader />
	<RouterView v-slot="slotProps">
		<transition name="route" mode="out-in">
			<component :is="slotProps.Component"></component>
		</transition>
	</RouterView>
</template>

<style>
@import url("https://fonts.googleapis.com/css2?family=Roboto:wght@100;300;400;500;700;900&display=swap");
* {
	box-sizing: border-box;
}
html {
	font-family: "Roboto", sans-serif;
}
body {
	margin: 0;
}
ul {
	list-style: none;
	margin: 0;
	padding: 0;
}
a {
	text-decoration: none;
}

/* vue transition */
.route-enter-from {
	opacity: 0;
	transform: translateY(-2rem);
}
.route-leave-to {
	opacity: 0;
	transform: translateY(2rem);
}
.route-enter-active {
	transition: all 0.3s ease-out;
}
.route-leave-active {
	transition: all 0.3s ease-in;
}
.route-enter-to,
.route-leave-from {
	opacity: 1;
	transform: translateY(0);
}
</style>
