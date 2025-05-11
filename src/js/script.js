const inputField = document.querySelector(".input-box__input")
const inputResult = document.querySelector(".input-box__result")
const inputBtn = document.querySelector(".input-box__button")

const calculateChecksum = (number) => {
    let numberArray = number.toString().split('').map(Number)
    for(let i = numberArray.length - 1; i >= 0; i -= 2) {
        numberArray[i] *= 2
        if(numberArray[i] > 9) {
            numberArray[i] = numberArray[i].toString().split('').map(Number).reduce((sum, currentDigit) => sum + currentDigit, 0)
        }
        if(i == 1) {
            break
        }
    }
    let sum = numberArray.reduce((sum, currentDigit) => sum + currentDigit)
    let sumDigits = sum.toString().split('').map(Number)
    let lastDigit = sumDigits[sumDigits.length - 1]
    return (10 - lastDigit)
}

const inputButtonHandler = () => {
    let value = inputField.value
    inputResult.textContent = calculateChecksum(value)
}

inputBtn.addEventListener('click', inputButtonHandler)