import { ref, computed } from "vue";
import { defineStore } from "pinia";

let expirationTimer;

export const useAuthStore = defineStore("auth", () => {
	// state
	const token = ref(null);
	const userId = ref(null);
	const isLogout = ref(false);
	const API_KEY = import.meta.env.VITE_API_KEY;

	//computed
	const isAuthenticated = computed(() => !!token.value);
	// Method
	function setUserStoreData(userData) {
		token.value = userData.token;
		userId.value = userData.userId;
		isLogout.value = false;
	}

	async function login(accountData) {
		return auth(accountData, "login"); // return promise's response
	}
	async function signup(accountData) {
		return auth(accountData, "signup"); // return promise's response
	}
	async function auth(accountData, mode) {
		const url =
			mode === "login"
				? `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${API_KEY}`
				: `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${API_KEY}`;

		const response = await fetch(url, {
			method: "POST",
			body: JSON.stringify({
				...accountData,
				returnSecureToken: true,
			}),
		});
		const responseData = await response.json();

		if (!response.ok) {
			const errorMessage = responseData.error.message;
			throw new Error(
				errorMessage || "Failed to authenticate. Check your login data."
			);
		}
		const expiresIn = +responseData.expiresIn * 1000;
		const expirationDate = new Date().getTime() + expiresIn;

		localStorage.setItem("token", responseData.idToken);
		localStorage.setItem("userId", responseData.localId);
		localStorage.setItem("tokenExpiration", expirationDate);

		expirationTimer = setTimeout(() => autoLogout(), expiresIn);

		setUserStoreData({
			token: responseData.idToken,
			userId: responseData.localId,
		});
	}

	function checkLogin() {
		const userId = localStorage.getItem("userId");
		const token = localStorage.getItem("token");
		const tokenExpiration = localStorage.getItem("tokenExpiration");

		const expiresIn = +tokenExpiration - new Date().getTime();

		if (expiresIn < 0) return;
		expirationTimer = setTimeout(() => autoLogout(), expiresIn);
		if (token && userId) setUserStoreData({ token, userId });
	}

	function logout() {
		localStorage.removeItem("token");
		localStorage.removeItem("userId");
		localStorage.removeItem("tokenExpiration");

		setUserStoreData({ token: null, userId: null });
		clearTimeout(expirationTimer);
	}
	function autoLogout() {
		logout();
		isLogout.value = true;
	}

	return {
		token,
		userId,
		isLogout,
		isAuthenticated,
		login,
		signup,
		logout,
		auth,
		checkLogin,
	};
});
