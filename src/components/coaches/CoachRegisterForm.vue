<template>
	<form>
		<div class="form-control">
			<label for="firstname">Firstname</label>
			<input
				type="text"
				id="firstname"
				v-model.trim="data.firstName"
				ref="firstNameInput"
				required
			/>
			<span class="msg showError">InValid (Click to see more rules)</span>
			<span class="msg showSuccess">Valid</span>
		</div>
		<div class="form-control">
			<label for="lastname">Lastname</label>
			<input
				type="text"
				id="lastname"
				v-model.trim="data.lastName"
				ref="lastNameInput"
				required
			/>
			<span class="msg showError">InValid (Click to see more rules)</span>
			<span class="msg showSuccess">Valid</span>
		</div>
		<div class="form-control">
			<label for="description">Description</label>
			<textarea
				id="description"
				v-model.trim="data.description"
				ref="descTextarea"
				required
				row="5"
			></textarea>
			<span class="msg showError"
				>Description must not be empty. (Click to see more rules)</span
			>
			<span class="msg showSuccess">Valid</span>
		</div>
		<div class="form-control">
			<label for="hourlyRate">Hourly Rate</label>
			<input
				type="number"
				id="hourlyRate"
				v-model.number="data.hourlyRate"
				ref="rateInput"
				min="1"
				max="100"
				required
			/>
			<span class="msg showError">InValid (Click to see more rules)</span>
			<span class="msg showSuccess">Valid</span>
		</div>
		<div class="form-control checkbox" ref="checkbox">
			<h3>Areas of Expertise</h3>
			<div class="option-control">
				<input
					type="checkbox"
					id="frontend"
					value="frontend"
					v-model="data.areas"
					@change="checkboxHandler"
				/>
				<label for="frontend">Frontend Development</label>
			</div>
			<div class="option-control">
				<input
					type="checkbox"
					id="backend"
					value="backend"
					v-model="data.areas"
					@change="checkboxHandler"
				/>
				<label for="backend">Backend Development</label>
			</div>
			<div class="option-control">
				<input
					type="checkbox"
					id="career"
					value="career"
					v-model="data.areas"
					@change="checkboxHandler"
				/>
				<label for="career">Career Advisory</label>
			</div>

			<span class="msg showError"
				>At least one expertise must be selected.</span
			>
			<span class="msg showSuccess">Valid</span>
		</div>

		<BaseButton @click.prevent="submitHandler">Register</BaseButton>
	</form>
</template>

<script setup>
import { reactive, ref, onMounted } from "vue";
import { useCouchesStore } from "@/stores/coaches.js";
import { useRouter } from "vue-router";
const useCouches = useCouchesStore();
const router = useRouter();

const initialData = () => ({
	firstName: "",
	lastName: "",
	description: "",
	hourlyRate: null,
	areas: [],
});

const data = reactive(initialData());

const firstNameInput = ref(null);
const lastNameInput = ref(null);
const descTextarea = ref(null);
const rateInput = ref(null);
const checkbox = ref(null);

let inputs;
onMounted(() => {
	inputs = [
		firstNameInput.value,
		lastNameInput.value,
		descTextarea.value,
		rateInput.value,
	];

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
	checkboxHandler();
	if (data.areas.length === 0) return addShakeAnimation(checkbox.value);
	if (!allValid) return;

	useCouches.registerCoach(data); // register
	Object.assign(data, initialData()); // initialData
	router.replace("/coaches"); // redirect to coachesList page
}

function toggleInValidClass(input) {
	input.parentElement.classList.toggle("invalid", !input.checkValidity());
	input.parentElement.classList.toggle("valid", input.checkValidity());
}
function checkboxHandler() {
	checkbox.value.classList.toggle("invalid", data.areas.length === 0);
	checkbox.value.classList.toggle("valid", data.areas.length !== 0);
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
		.option-control {
			display: flex;
			gap: 1rem;
			align-items: center;
		}

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
			label,
			h3 {
				color: rgb(42, 148, 100);
			}
			.msg.showSuccess {
				color: rgb(42, 148, 100);
				opacity: 1;
				visibility: visible;
				font-size: 1em;
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
		&.checkbox {
			label {
				cursor: pointer;
			}

			&.invalid,
			&.valid {
				label {
					color: initial;
				}
				span.msg {
					cursor: auto;
				}
			}
			&.invalid h3 {
				color: rgb(180, 30, 30);
			}
			&.valid h3 {
				color: rgb(42, 148, 100);
			}
		}
	}
}
label,
h3 {
	font-weight: bold;
	font-size: 1.3rem;
	margin: 0.5rem 0;
}

input,
textarea {
	padding: 0.2rem;
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
input[type="checkbox"] {
	display: inline;
	width: auto;
	border: none;

	&:focus {
		outline: #3d008d solid 1px;
	}
	& + label {
		font-weight: normal;
		display: inline;
	}
}
button {
	width: 81%;
	margin: 2rem auto 0;
	font-size: 1.3rem;
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
