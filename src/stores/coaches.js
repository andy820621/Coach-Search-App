import { computed, reactive } from "vue";
import { defineStore } from "pinia";

export const useCouchesStore = defineStore("coaches", () => {
	const coaches = reactive([
		{
			id: "c1",
			firstName: "Maximilian",
			lastName: "Schwarzmuller",
			areas: ["frontend", "backend", "career"],
			descriotion:
				"I'm Maximilian and I've worked as a freelance web developer for years.",
			hourlyRate: 30,
		},
		{
			id: "c2",
			firstName: "Julie",
			lastName: "Jones",
			areas: ["frontend", "career"],
			descriotion:
				"I'm Julie and I've a senior developer in a big tech company, I can help you",
			hourlyRate: 30,
		},
	]);

	const hasCoaches = computed(() => coaches && coaches.length > 0);

	return { coaches, hasCoaches };
});
