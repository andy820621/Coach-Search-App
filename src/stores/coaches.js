import { computed, reactive, ref } from "vue";
import { defineStore, storeToRefs } from "pinia";
import { useAuthStore } from "@/stores/auth.js";

export const useCouchesStore = defineStore("coaches", () => {
	// from other stores
	const useAuth = useAuthStore();
	const { token, userId } = storeToRefs(useAuth);
	// state
	const coaches = reactive([]);
	const lastFetch = ref(null);

	// Computed || getters
	const hasCoaches = computed(() => coaches && coaches.length > 0);
	const userIsCoach = computed(() =>
		coaches.some((coach) => coach.id === userId.value)
	);
	const shouldUpdate = computed(() => {
		if (!lastFetch.value) return true;

		const currentTimeStamp = new Date().getTime();
		return (currentTimeStamp - lastFetch.value) / 1000 > 60;
	});

	// Methed || actions
	async function registerCoach(data) {
		const coach = {
			...data,
		};

		const response = await fetch(
			`https://vue-findcoaches-data-default-rtdb.asia-southeast1.firebasedatabase.app/coaches/${userId.value}.json?auth=${token.value}`,
			{
				method: "PUT",
				body: JSON.stringify(coach),
			}
		);
		// const responseData = await response.json();

		if (!response.ok) {
			throw new Error(responseData.message || "Failed to register!");
		}

		coaches.push({
			...coach,
			id: userId.value,
		});
	}

	async function fetchCoaches(ForceRefreshBoolean) {
		if (!ForceRefreshBoolean && !shouldUpdate.value) return;

		const response = await fetch(
			`https://vue-findcoaches-data-default-rtdb.asia-southeast1.firebasedatabase.app/coaches.json`
		);
		const responseData = await response.json();

		if (!response.ok) {
			throw new Error(responseData.message || "Failed to fetch!");
		}

		const results = [];

		for (let key in responseData) {
			const coach = {
				id: key,
				firstName: responseData[key].firstName,
				lastName: responseData[key].lastName,
				areas: responseData[key].areas,
				description: responseData[key].description,
				hourlyRate: responseData[key].hourlyRate,
			};
			results.push(coach);
		}

		Object.assign(coaches, results);

		setFetchTimestamp();
	}
	fetchCoaches();

	function setFetchTimestamp() {
		lastFetch.value = new Date().getTime();
	}

	return {
		coaches,
		userId,
		lastFetch,
		hasCoaches,
		userIsCoach,
		registerCoach,
		fetchCoaches,
		setFetchTimestamp,
	};
});
