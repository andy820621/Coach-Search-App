import { createRouter, createWebHistory } from "vue-router";
import CoachesList from "@/views/coaches/CoachesList.vue";
import { useAuthStore } from "@/stores/auth.js";

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
			props: true,
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
			meta: { requiresAuth: true },
		},
		{
			path: "/requests",
			component: () => import("@/views/requests/RequestReceived.vue"),
			meta: { requiresAuth: true },
		},
		{
			path: "/auth",
			component: () => import("@/views/auth/UserAuth.vue"),
			meta: { requiresUnauth: true },
		},
		{
			path: "/:pathMatch(.*)*",
			component: () => import("@/views/NotFound.vue"),
		},
	],
});

router.beforeEach((to, _, next) => {
	const useAuth = useAuthStore();

	if (to.meta.requiresAuth && !useAuth.isAuthenticated) {
		next("/auth");
	} else if (to.meta.requiresUnauth && useAuth.isAuthenticated) {
		next("/coaches");
	} else {
		next();
	}
});

export default router;
