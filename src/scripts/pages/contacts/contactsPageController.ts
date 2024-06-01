import {
	default as JustValidate,
	Rules,
	default as Validator,
} from 'just-validate'
import { headerController } from '../../headerController'
export const contactsPageController = () => {
	headerController()
	const $FORM = document.querySelector<HTMLFormElement>('.form')
	const $formButton = document.querySelector<HTMLButtonElement>('.form__button')

	let VALIDATE: Validator | null = null

	if ($FORM) {
		VALIDATE = new JustValidate('.form', {
			errorFieldCssClass: 'is-invalid',
			focusInvalidField: false,
			lockForm: true,
			validateBeforeSubmitting: true,
		})

		VALIDATE.addField('#text', [
			{ rule: 'minLength' as Rules, value: 10 },
			{ rule: 'required' as Rules, errorMessage: 'This field is required' },
			{ rule: 'maxLength' as Rules, value: 300 },
		])
			.addField('#email', [
				{ rule: 'required' as Rules, errorMessage: 'This field is required' },
				{
					rule: 'email' as Rules,
					errorMessage: 'Please enter a valid email address',
				},
			])
			.addField('#checkbox', [
				{ rule: 'required' as Rules, errorMessage: 'This field is required' },
			])
			.onSuccess(async (event?: Event) => {
				if (event) event.preventDefault()

				// Show loader
				if ($formButton) $formButton.classList.add('is-loading')

				try {
					// Mock form submission with a 2-second delay
					await new Promise(resolve => setTimeout(resolve, 2000))

					// Show success message
					showSuccessMessage()
				} catch (error) {
					// Show error message
					showErrorMessage()
				} finally {
					// Hide loader
					if ($formButton) $formButton.classList.remove('is-loading')
				}
			})
	}

	// Cleanup function
	return () => {
		if (VALIDATE) {
			// Assuming JustValidate has a destroy method to clean up
			VALIDATE.destroy()
		}
	}
}

// Function to show success message
function showSuccessMessage() {
	alert('Form submitted successfully!')
}

// Function to show error message
function showErrorMessage() {
	alert('Error submitting form!')
}
