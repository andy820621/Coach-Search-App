import { computed, reactive } from "vue";
import { defineStore, storeToRefs } from "pinia";
import { useAuthStore } from "@/stores/auth.js";

export const useRequestsStore = defineStore("requests", () => {
	//from other stores
	const useAuth = useAuthStore();
	const { token, userId } = storeToRefs(useAuth);

	// state
	const requests = reactive([]);

	//computed
	const hasRequests = computed(
		() => requests.value && requests.value.length > 0
	);

	// Method
	async function addRequest(request, coachId) {
		const response = await fetch(
			`https://vue-findcoaches-data-default-rtdb.asia-southeast1.firebasedatabase.app/requests/${coachId}.json`,
			{
				method: "POST",
				body: JSON.stringify(request),
			}
		);
		const responseData = await response.json();

		if (!response.ok) {
			throw new Error(responseData.message || "Failed to send request.");
		}

		request.id = responseData.name;
		request.coachId = coachId;

		requests.push(request);
	}

	async function fetchRequests() {
		const response = await fetch(
			`https://vue-findcoaches-data-default-rtdb.asia-southeast1.firebasedatabase.app/requests/${userId.value}.json?auth=${token.value}`
		);
		const responseData = await response.json();

		if (!response.ok) {
			throw new Error(responseData.message || "Failed to fetch requests.");
		}

		const results = [];

		for (let key in responseData) {
			const request = {
				id: key,
				coachId: userId,
				email: responseData[key].email,
				message: responseData[key].message,
			};
			results.push(request);
		}
		requests.length = 0;
		Object.assign(requests, results);
	}

	return {
		requests,
		hasRequests,
		addRequest,
		fetchRequests,
	};
});
