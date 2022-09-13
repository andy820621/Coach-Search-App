import { ref, computed, reactive } from "vue";
import { defineStore } from "pinia";
import { useCouchesStore } from "@/stores/coaches.js";

export const useRequestsStore = defineStore("requests", () => {
	// state
	const requests = reactive([]);
	const useCoaches = useCouchesStore();
	const userNow = useCoaches.userId;

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
			`https://vue-findcoaches-data-default-rtdb.asia-southeast1.firebasedatabase.app/requests/${userNow}.json`
		);
		const responseData = await response.json();

		if (!response.ok) {
			throw new Error(responseData.message || "Failed to fetch requests.");
		}

		const results = [];

		for (let key in responseData) {
			const request = {
				id: key,
				coachId: userNow,
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
