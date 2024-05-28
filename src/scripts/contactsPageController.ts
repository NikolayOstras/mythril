import {
	default as JustValidate,
	Rules,
	default as Validator,
} from 'just-validate'

export const contactsPageController = () => {
	const $FORM = document.querySelector<HTMLFormElement>('.form')
	const $fromButton = document.querySelector<HTMLButtonElement>('.form__button')

	if ($FORM) {
		const VALIDATE: Validator = new JustValidate('.form', {
			errorFieldCssClass: 'is-invalid',
			focusInvalidField: false,
			lockForm: true,
			validateBeforeSubmitting: true,
		})

		VALIDATE.addField('#text', [
			{
				rule: 'minLength' as Rules,
				value: 10,
			},
			{
				rule: 'required' as Rules,
				errorMessage: 'This field is required',
			},
			{
				rule: 'maxLength' as Rules,
				value: 300,
			},
		])
			.addField('#email', [
				{
					rule: 'required' as Rules,
					errorMessage: 'This field is required',
				},
				{
					rule: 'email' as Rules,
					errorMessage: 'Please enter a valid email address',
				},
			])
			.addField('#checkbox', [
				{
					rule: 'required' as Rules,
					errorMessage: 'This field is required',
				},
			])
			.onSuccess(async (event?: Event) => {
				if (event) event.preventDefault()

				// Показываем загрузчик
				if ($fromButton) $fromButton.classList.add('is-loading')

				try {
					// Выполняем моковую отправку формы с задержкой в 2 секунды
					await new Promise(resolve => setTimeout(resolve, 2000))

					// Отображаем сообщение об успешной отправке
					showSuccessMessage()
				} catch (error) {
					// Отображаем сообщение об ошибке
					showErrorMessage()
				} finally {
					// Скрываем загрузчик
					if ($fromButton) $fromButton.classList.remove('is-loading')
				}
			})
	}
}

// Функция для отображения сообщения об успешной отправке
function showSuccessMessage() {
	// Реализация отображения сообщения об успехе
	alert('Form submitted successfully!')
}

// Функция для отображения сообщения об ошибке
function showErrorMessage() {
	// Реализация отображения сообщения об ошибке
	alert('Error submitting form!')
}
