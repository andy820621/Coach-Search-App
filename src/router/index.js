import { createRouter, createWebHistory } from "vue-router";

import CoachesList from "@/views/coaches/CoachesList.vue";

const router = createRouter({
	history: createWebHistory(),
	routes: [
		{ path: "/", redirect: "/coaches" },
		{
			path: "/coaches",
			component: CoachesList,
		},
		{
			path: "/coaches/:id",
			component: () => import("@/views/coaches/CoachDetail.vue"),
			children: [
				{
					path: "contact",
					component: () => import("@/views/requests/ContactCoach.vue"),
				},
			],
		},
		{
			path: "/register",
			component: () => import("@/views/coaches/CoachRegistration.vue"),
		},
		{
			path: "/requests",
			component: () => import("@/views/requests/RequestReceived.vue"),
		},
		{
			path: "/:pathMatch(.*)*",
			component: () => import("@/views/NotFound.vue"),
		},
	],
});

export default router;
