import { computed, reactive, ref } from "vue";
import { defineStore } from "pinia";

export const useCouchesStore = defineStore("coaches", () => {
	// state
	const coaches = reactive([
		{
			id: "c1",
			firstName: "Maximilian",
			lastName: "Schwarzmuller",
			areas: ["frontend", "backend", "career"],
			description:
				"I'm Maximilian and I've worked as a freelance web developer for years. Let me help you become a developer as well~",
			hourlyRate: 30,
		},
		{
			id: "c2",
			firstName: "Julie",
			lastName: "Jones",
			areas: ["frontend", "career"],
			description:
				"I'm Julie and I've a senior developer in a big tech company, I can help you get your first job or progress in your current role.",
			hourlyRate: 30,
		},
	]);
	const userId = ref("c3");

	// Computed || getters
	const hasCoaches = computed(() => coaches && coaches.length > 0);
	const userIsCoach = computed(() =>
		coaches.some((coach) => coach.id === userId.value)
	);

	// Methed || actions
	function registerCoach(data) {
		const coach = {
			id: `c${parseInt(coaches.length) + 1}`,
			...data,
		};
		// console.log(coach);
		coaches.push(coach);
	}

	return { coaches, hasCoaches, userIsCoach, registerCoach };
});
