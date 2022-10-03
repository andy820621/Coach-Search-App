<template>
	<div>
		<BaseDialog
			:show="!!fetchError"
			title="An error occurred"
			@close="dialogHandler"
		>
			<p>{{ fetchError }}</p>
		</BaseDialog>
		<BaseDialog fixed :show="isLoading" title="Authenticating...">
			<BaseLoader></BaseLoader>
		</BaseDialog>

		<BaseCard>
			<form>
				<div class="form-control">
					<label for="email">E-mail</label>
					<input
						type="email"
						id="email"
						pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$"
						title="After '@',at least one period, and two letters after the period."
						placeholder="Enter your email address"
						required
						ref="emailInput"
						v-model.trim="data.email"
					/>
					<span class="msg showError"
						>InValid Email (Click to see more rules)</span
					>
				</div>

				<div class="form-control">
					<label for="password">Password</label>

					<input
						type="password"
						id="password"
						pattern="^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9]).{8,16}$"
						title="* At least one lowercase letter. * At least one uppercase letter. * At least one numeric value. * The total length should be greater than or equal to 8 and less or equal to 16.
							"
						placeholder="Enter valid password"
						required
						ref="passwordInput"
						v-model.trim="data.password"
					/>
					<span class="msg showError"
						>InValid Password (Click to see more rules)</span
					>
				</div>

				<div class="button-container">
					<BaseButton @click.prevent="submitHandler">{{
						submitButtonCaption
					}}</BaseButton>
					<BaseButton
						type="button"
						mode="flat"
						@click.prevent="switchAuthMode"
						>{{ swichModeButtonCaption }}</BaseButton
					>
				</div>
			</form>
		</BaseCard>
	</div>
</template>

<script setup>
import useFormSubmit from "@/utils/useFormSubmit";
import { computed } from "@vue/reactivity";
import { reactive, ref, onMounted } from "vue";
import { useAuthStore } from "@/stores/auth.js";
import { useCouchesStore } from "@/stores/coaches.js";
import { useRoute, useRouter } from "vue-router";
const useAuth = useAuthStore();
const useCouches = useCouchesStore();
const route = useRoute();
const router = useRouter();

const { data, toggleInValidClass, addShakeAnimation } = useFormSubmit({
	email: "",
	password: "",
});

const emailInput = ref(null);
const passwordInput = ref(null);
const mode = ref("login");
const isLoading = ref(false);
const fetchError = ref(null);

const submitButtonCaption = computed(() =>
	mode.value === "login" ? "Login" : "Signup"
);
const swichModeButtonCaption = computed(() =>
	mode.value === "login" ? "Signup instead" : "Login instead"
);

let inputs;
onMounted(() => {
	inputs = [emailInput.value, passwordInput.value];

	inputs.forEach((input) => {
		input.addEventListener("blur", () => toggleInValidClass(input));
		input.nextElementSibling.addEventListener("click", () =>
			input.reportValidity()
		);
	});
});

async function submitHandler() {
	const allValid = inputs.every((input) => input.reportValidity());
	inputs.forEach((input) => {
		toggleInValidClass(input);
		if (input.parentElement.classList.contains("invalid")) {
			addShakeAnimation(input.parentElement);
		}
	});
	if (!allValid) return;

	isLoading.value = true;

	try {
		// Ligin or Signup
		if (mode.value === "login") {
			await useAuth.login(data);
		} else {
			await useAuth.signup(data);
		}
		// Redirect
		const redirectUrl = `/${route.query.redirect || "coaches"}`;
		if (useCouches.userIsCoach) {
			router.replace("coaches");
		} else {
			router.replace(redirectUrl);
		}
	} catch (err) {
		fetchError.value =
			err.message || "Failed to authenticate, try again later.";
	}

	isLoading.value = false;
}

function switchAuthMode() {
	mode.value = mode.value === "login" ? "signup" : "login";
}

function dialogHandler() {
	fetchError.value = null;
}
</script>

<style lang="scss" scoped>
form {
	color: #111;
	margin: 0 auto;
	padding: 2rem;
	border-radius: 0.8rem;
	display: grid;
	gap: 1rem;
	.form-control {
		display: grid;
		gap: 0.24rem;

		// msg
		.msg {
			opacity: 0;
			visibility: hidden;
			font-size: 0;
		}

		&.valid {
			input {
				border-color: rgb(42, 148, 100);
			}
			label {
				color: rgb(42, 148, 100);
			}
		}

		&.invalid {
			input {
				border-color: rgb(180, 30, 30);
			}
			label {
				color: rgb(180, 30, 30);
			}
			.msg.showError {
				color: rgb(180, 30, 30);
				cursor: pointer;
				opacity: 1;
				visibility: visible;
				font-size: 1em;
			}
		}
	}
}
label {
	font-weight: bold;
	font-size: 1.3rem;
	margin: 0.5rem 0;
}

input {
	padding: 0.24rem 0.3rem;
	display: block;
	width: 100%;
	border: 1px solid #ccc;
	font: inherit;
	&:focus {
		background-color: #f0e6fd;
		outline: none;
		border-color: #3d008d;
	}
}

.shake {
	animation: shake 0.5s ease-in-out;
}

@keyframes shake {
	0%,
	100% {
		transform: translateX(0);
	}
	20%,
	40%,
	60%,
	80% {
		transform: translateX(-2%);
	}
	10%,
	30%,
	50%,
	70%,
	90% {
		transform: translateX(2%);
	}
}

// Only in this component
@media (min-width: 40em) {
	.card {
		width: clamp(35em, 40vw, 50em);
	}
}
.button-container {
	margin-top: 2.4rem;
	display: flex;
	justify-content: flex-end;
	@media (max-width: 500px) {
		flex-direction: column;
		gap: 0.8rem;
		button,
		a {
			margin: 0;
		}
	}
	.flat {
		border: 1px solid #3d008d;
		&:hover {
			border-color: #edd2ff;
		}
	}
}
</style>
