<template>
	<header>
		<nav>
			<h1><router-link to="/">Find a Coach</router-link></h1>
			<ul>
				<li><router-link to="/coaches">All Coaches</router-link></li>
				<li><router-link to="/requests">Requests</router-link></li>
			</ul>
		</nav>
	</header>
</template>

<script setup></script>

<style lang="scss" scoped>
header {
	width: 100%;
	height: 5rem;
	background-color: #3d008d;
	display: flex;
	justify-content: center;
	align-items: center;
	a {
		text-decoration: none;
		color: #f391e3;
		display: inline-block;
		padding: 0.75rem 1.5rem;
		border: 1px solid transparent;
	}

	nav {
		width: 90%;
		margin: 0 auto;
		display: flex;
		justify-content: space-between;
		align-items: center;
	}
	ul {
		display: flex;
		justify-content: center;
		align-items: center;
		gap: 0.5rem;
	}
}
a:active,
a:hover,
a.router-link-active {
	border: 1px solid #f391e3;
}

h1 {
	margin: 0;
	a {
		color: #eee;
		&:hover,
		&:active,
		&.router-link-active {
			border-color: transparent;
		}
	}
}
</style>
