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

const inputButtonHandler = () => {
	let value = inputField.value
	if (value != '') {
		inputField.classList.remove('input-box__input--error')
		inputResult.classList.remove('input-box__result--error')
		inputResult.textContent = `Checksum: ${calculateChecksum(value)}`
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

const inputFieldToCardHandler = () => {
	if (inputField.value.length < 2) {
		checkCardLogo(inputField.value)
	}
	inputField.value = inputField.value.replace(/\D/g, '')
	cardNumber.textContent = inputField.value
	if (validationRadio.checked && inputField.value.length > 16) {
		inputField.value = inputField.value.slice(0, 16)
		cardNumber.textContent = inputField.value
	}
    if((inputField.value.length >= 1) && !(document.querySelector(`.card-box__card--logo-img`))) {
        cardLogo.appendChild(getLogo(Number(inputField.value[0])))
    }
}

const createImg = (logo) => {
	if (logo != null) {
		let newImg = document.createElement('img')
		newImg.src = `./dist/img/${logo}.webp`
        newImg.classList.add("card-box__card--logo-img")
		return newImg
	}
}

const getLogo = (digit) => {
    console.log(digit);
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

const checkCardLogo = (number) => {
	if (number[0] == 4) {
		console.log('visa')
	} else if (number[0] == 5 || number[0] == 2) {
		console.log('mastercard')
	}
}

const radioButtonsHandler = () => {
	if (validationRadio.checked) {
		inputField.value = ''
		cardNumber.textContent = ''
		card.classList.add('visible')
		card.classList.remove('hidden')
	} else {
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
inputField.addEventListener('input', inputFieldToCardHandler)