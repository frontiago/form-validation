const form = document.querySelector('#form')
const username = document.querySelector('#username')
const email = document.querySelector('#email')
const password = document.querySelector('#password')
const password2 = document.querySelector('#password2')

// Add red border and show error messages
const showError = (input, message) => {
    const formControl = input.parentElement 
    const small = formControl.querySelector('small')
    formControl.className = 'form-control error'
    small.innerText = message
}

// Add green border when is everything ok
const showSuccess = (input) => {
    const formControl = input.parentElement 
    formControl.className = 'form-control success'
}

// Check if email has a valid format
const checkEmail = (input) => {
    const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    if(re.test(input.value.trim())){
        showSuccess(input)
    } else {
        showError(input, 'Email is not valid')
    }
}

// Check if the field is empty
const checkRequired = (inputArray) => {
    inputArray.forEach(input => {
        if(input.value.trim() === ''){
            showError(input, `${getFieldName(input)} is required`)
        } else {
            showSuccess(input)
        }
    })
}

// Check min and max characters of the field
const checkLength = (input, min, max) => {
    if(input.value.length < min){
        showError(input, `${getFieldName(input)} must be at least ${min} characters`)
    } 
    else if(input.value.length > max){
        showError(input, `${getFieldName(password)} must be less than ${max} characters`)
    } else {
        showSuccess(input)
    }
}

// Convert the first letter to uppercase to display in error messages
const getFieldName = (input) => {
    return input.id.charAt(0).toUpperCase() + input.id.slice(1)
}

// Check if password fields are empty and if match
const checkPasswordsMatch = (password, password2) => {
    if(password.value === '' && password2.value === ''){
        showError(password, 'Password cannot be empty')
    }
    else if(password.value === password2.value){
        showSuccess(password)
    } else {
        showError(password2, `Both passwords must be equals`)
    }
}

// Event Listener
form.addEventListener('submit', (e) => {
    e.preventDefault()
    
    checkRequired([username, email, password, password2])
    checkLength(username, 3, 15)
    checkLength(password, 6, 20)
    checkEmail(email)
    checkPasswordsMatch(password, password2)
})