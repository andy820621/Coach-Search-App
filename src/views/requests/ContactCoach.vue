<template>
	<form>
		<div class="form-control">
			<label for="email">Your Email</label>
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
			<span class="msg showError">InValid Email (Click to see more rules)</span>
		</div>
		<div class="form-control">
			<label for="message">Message</label>
			<textarea
				id="message"
				rows="5"
				required
				ref="messageInput"
				v-model.trim="data.message"
				placeholder="Type somthing..."
			></textarea>
			<span class="msg showError"
				>Message must not be empty. (Click to see more rules)</span
			>
		</div>

		<div class="actions">
			<BaseButton @click.prevent="submitHandler">Send Message</BaseButton>
		</div>
	</form>
</template>

<script setup>
import { reactive, ref, onMounted } from "vue";
import { useRequestsStore } from "@/stores/requests.js";
import { useRoute, useRouter } from "vue-router";
const useRequests = useRequestsStore();
const route = useRoute();
const router = useRouter();

const initialData = () => ({
	email: "",
	message: "",
});

const data = reactive(initialData());

const emailInput = ref(null);
const messageInput = ref(null);

let inputs;
onMounted(() => {
	inputs = [emailInput.value, messageInput.value];

	inputs.forEach((input) => {
		input.addEventListener("blur", () => toggleInValidClass(input));
		input.nextElementSibling.addEventListener("click", () =>
			input.reportValidity()
		);
	});
});

function submitHandler() {
	const allValid = inputs.every((input) => input.reportValidity());
	inputs.forEach((input) => {
		toggleInValidClass(input);
		if (input.parentElement.classList.contains("invalid")) {
			addShakeAnimation(input.parentElement);
		}
	});
	if (!allValid) return;

	const coachId = route.params.id; // get id from /coaches/:id/contact

	useRequests.addRequest(data, coachId);
	router.replace("/coaches");
}

function toggleInValidClass(input) {
	input.parentElement.classList.toggle("invalid", !input.checkValidity());
	input.parentElement.classList.toggle("valid", input.checkValidity());
}
function addShakeAnimation(target) {
	target.classList.add("shake");
	target.addEventListener("animationend", (e) =>
		e.target.classList.remove("shake")
	);
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
			input,
			textarea {
				border-color: rgb(42, 148, 100);
			}
			label {
				color: rgb(42, 148, 100);
			}
		}

		&.invalid {
			input,
			textarea {
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

input,
textarea {
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
.actions {
	text-align: center;
	button {
		width: calc(8rem + 24%);
		margin: 2rem auto 0;
		font-size: 1.3rem;
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
</style>
