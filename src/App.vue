<script setup>
import TheHeader from "./components/layout/TheHeader.vue";
</script>

<template>
	<TheHeader />
	<RouterView></RouterView>
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
</style>
