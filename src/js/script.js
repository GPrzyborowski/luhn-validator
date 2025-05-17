const inputField = document.querySelector('.input-box__input')
const inputResult = document.querySelector('.input-box__result')
const inputBtn = document.querySelector('.input-box__button')
const checksumRadio = document.querySelector('.mode-box__input--checksum')
const validationRadio = document.querySelector('.mode-box__input--validation')
const card = document.querySelector('.card-box__card')
const cardNumber = document.querySelector('.card-box__card--number')
const cardLogo = document.querySelector('.card-box__card--logo')
const radioButtons = document.querySelectorAll('.mode-box__input')

const calculateChecksum = number => {
	let numberArray = number.toString().split('').map(Number)
	for (let i = numberArray.length - 1; i >= 0; i -= 2) {
		numberArray[i] *= 2
		if (numberArray[i] > 9) {
			numberArray[i] = numberArray[i]
				.toString()
				.split('')
				.map(Number)
				.reduce((sum, currentDigit) => sum + currentDigit, 0)
		}
		if (i == 1) {
			break
		}
	}
	let sum = numberArray.reduce((sum, currentDigit) => sum + currentDigit)
	let sumDigits = sum.toString().split('').map(Number)
	let lastDigit = sumDigits[sumDigits.length - 1]
	if (lastDigit == 0) {
		return 0
	} else {
		return 10 - lastDigit
	}
}

const validateCardNumber = number => {
	if (number.length != 16) {
		return false
	}
	let numberArray = number.toString().split('').map(Number)
	let numberToCompare = numberArray[numberArray.length - 1]
	numberArray.pop()
	for (let i = numberArray.length - 1; i >= 0; i -= 2) {
		numberArray[i] *= 2
		if (numberArray[i] > 9) {
			numberArray[i] = numberArray[i]
				.toString()
				.split('')
				.map(Number)
				.reduce((sum, currentDigit) => sum + currentDigit, 0)
		}
	}
	let sum = numberArray.reduce((sum, currentDigit) => sum + currentDigit)
	let sumDigits = sum.toString().split('').map(Number)
	let lastDigit = sumDigits[sumDigits.length - 1]
	if (lastDigit == 0) {
		return numberToCompare == 0
	} else {
		return numberToCompare == 10 - lastDigit
	}
}

const inputButtonHandler = () => {
	inputResult.classList.remove('input-box__result--success')
	inputResult.classList.remove('input-box__result--error')
	let value = inputField.value
	if (value != '') {
		inputField.classList.remove('input-box__input--error')
		inputResult.classList.remove('input-box__result--error')
		if (checksumRadio.checked) {
			inputResult.textContent = `Checksum: ${calculateChecksum(value)}`
		} else {
			if (validateCardNumber(value)) {
				inputResult.classList.add('input-box__result--success')
				inputResult.textContent = `Valid number`
			} else {
				inputResult.classList.add('input-box__result--error')
				inputResult.textContent = `Invalid number`
			}
		}
	} else {
		inputField.classList.add('input-box__input--error')
		inputResult.textContent = 'Please enter a number'
		inputResult.classList.add('input-box__result--error')
	}
}

const inputFieldProtectionHandler = e => {
	const allowedKeys = ['Backspace', 'Delete', 'ArrowLeft', 'ArrowRight']
	const isDigit = e.key >= '0' && e.key <= '9'
	const isAllowedKey = allowedKeys.includes(e.key)
	if (!isDigit && !isAllowedKey) {
		e.preventDefault()
	}
	if (validationRadio.checked && inputField.value.length >= 16 && isDigit) {
		e.preventDefault()
	}
}

const inputToCardAndResultResetHandler = () => {
	inputResult.textContent = ''
	if (inputField.value == '') {
		let imgToRemove = document.querySelector('.card-box__card--logo-img')
		removeImg(imgToRemove)
	}
	cardNumber.textContent = inputField.value
	inputField.value = inputField.value.replace(/\D/g, '')
	if (validationRadio.checked && inputField.value.length > 16) {
		inputField.value = inputField.value.slice(0, 16)
		cardNumber.textContent = inputField.value
	}
	if (inputField.value.length >= 1 && !document.querySelector(`.card-box__card--logo-img`)) {
		console.log(`append logo step 2`)
		cardLogo.appendChild(getLogo(Number(inputField.value[0])))
	}
}

const removeImg = img => {
	img ? img.remove() : null
}

const createImg = logo => {
	if (logo != null) {
		let newImg = document.createElement('img')
		newImg.src = `./dist/img/${logo}.webp`
		newImg.classList.add('card-box__card--logo-img')
		return newImg
	}
}

const getLogo = digit => {
	switch (digit) {
		case 2:
		case 5:
			return createImg('mastercard')
		case 3:
			return createImg('aexpress')
		case 4:
			return createImg('visa')
		default:
			return null
	}
}

const radioButtonsHandler = () => {
	if (validationRadio.checked) {
		inputResult.textContent = ''
		inputField.value = ''
		if (inputField.value == '') {
			let imgToRemove = document.querySelector('.card-box__card--logo-img')
			removeImg(imgToRemove)
		}
		cardNumber.textContent = ''
		card.classList.add('visible')
		card.classList.remove('hidden')
	} else {
		inputResult.textContent = ''
		inputField.value = ''
		cardNumber.textContent = ''
		card.classList.remove('visible')
		card.classList.add('hidden')
	}
}

radioButtons.forEach(radioButton => {
	radioButton.addEventListener('change', radioButtonsHandler)
})
inputBtn.addEventListener('click', inputButtonHandler)
inputField.addEventListener('keydown', inputFieldProtectionHandler)
inputField.addEventListener('input', inputToCardAndResultResetHandler)
