import { reactive, ref, onMounted } from "vue";

export default function useFormSubmit(initialDataObject) {
	const initialData = () => initialDataObject;
	const data = reactive(initialData());

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

	return { initialData, data, toggleInValidClass, addShakeAnimation };
}
