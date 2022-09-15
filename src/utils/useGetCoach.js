import { useCouchesStore } from "@/stores/coaches.js";
import { computed, ref } from "vue";
import { useRoute } from "vue-router";

export default function useGetCoach() {
	const useCouches = useCouchesStore();
	const route = useRoute();

	const id = route.params.id;
	const coach = ref(null);
	coach.value = useCouches.coaches.find((coach) => coach.id === id);
	// console.log(coach);

	const firstName = computed(() => coach.value?.firstName);
	const lastName = computed(() => coach.value?.lastName);
	const hourlyRate = computed(() => coach.value?.hourlyRate);
	const areas = computed(() => coach.value?.areas);
	const description = computed(() => coach.value?.description);
	const fullName = computed(() => firstName.value + " " + lastName.value);
	const contactLink = computed(() => `${route.matched[0].path}/contact`);

	return {
		hourlyRate,
		areas,
		description,
		fullName,
		contactLink,
	};
}
