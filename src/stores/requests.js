import { ref, computed, reactive } from "vue";
import { defineStore } from "pinia";

export const useRequestsStore = defineStore("requests", () => {
	// state
	const requests = reactive([]);

	//computed

	// Method
	function addRequest(request) {
		const newRequest = {
			id: new Date().toISOString(),
			...request,
		};
		requests.push(newRequest);
	}

	return { requests, addRequest };
});
