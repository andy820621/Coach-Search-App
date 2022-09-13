<template>
	<div>
		<section>
			<BaseCard>
				<header>
					<h2>Requests Received</h2>
				</header>

				<BaseLoader v-if="isLoading" />

				<ul v-else-if="hasRequests && !isLoading">
					<RequestList
						v-for="request in requests"
						:email="request.email"
						:message="request.message"
						:key="request.id"
					/>
				</ul>
				<h3 v-else>You haven't receiced any requests yet!</h3>
			</BaseCard>
		</section>

		<BaseDialog
			:show="!!fetchError"
			title="An Error Occured!"
			@close="dialogHandler"
		>
			<p>{{ fetchError }}</p>
		</BaseDialog>
	</div>
</template>

<script setup>
import RequestList from "@/components/requests/RequestList.vue";
import { storeToRefs } from "pinia";
import { useRequestsStore } from "@/stores/requests.js";
import { ref } from "vue";
const useRequests = useRequestsStore();
const { requests, hasRequests } = storeToRefs(useRequests);
const isLoading = ref(false);
const fetchError = ref(null);

async function loadRequests() {
	isLoading.value = true;
	try {
		await useRequests.fetchRequests();
	} catch (error) {
		fetchError.value = error.message || "Somthing failed!";
	}
	isLoading.value = false;
}
loadRequests();

function dialogHandler() {
	fetchError.value = null;
}
</script>

<style lang="scss" scoped>
header,
h3 {
	text-align: center;
}
ul {
	margin: 2rem auto;
}
</style>
