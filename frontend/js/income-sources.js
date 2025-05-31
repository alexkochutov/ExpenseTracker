// HTTP
const BASE_URL = 'http://localhost:8080/'
const ENDPOINT = 'income-sources'

// FORM INPUT ELEMENTS
const NAME_INPUT = document.getElementById('name')
const CURRENCY_INPUT = document.getElementById('currency')
const TYPE_INPUT = document.getElementById('type')
const START_DATE_INPUT = document.getElementById('start_date')
const END_DATE_INPUT = document.getElementById('end_date')
const DESCRIPTION_INPUT = document.getElementById('description')
// FORM HINT ELEMENTS
const NAME_HINT = document.getElementById('name-hint')
const CURRENCY_HINT = document.getElementById('currency-hint')
const TYPE_HINT = document.getElementById('type-hint')
const START_DATE_HINT = document.getElementById('start_date-hint')
const END_DATE_HINT = document.getElementById('end_date-hint')
const DESCRIPTION_HINT = document.getElementById('description-hint')
// FORM BUTTON ELEMENTS
const SUBMIT_BUTTON = document.getElementById('submit_button')
const RESET_BUTTON = document.getElementById('reset_button')
// FORM INPUT LENGTH LIMIT
const NAME_INPUT_LIMIT = 50
const CURRENCY_INPUT_LIMIT = 5
const START_DATE_INPUT_LIMIT = 10
const END_DATE_INPUT_LIMIT = 10
const DESCRIPTION_INPUT_LIMIT = 255
//MODAL WINDOW ELEMENTS
const MODAL_FRAME = document.getElementById('modal')
const MODAL_TITLE = document.getElementById('window_title')
const MODAL_ICON = document.getElementById('window_icon')
const MODAL_TEXT = document.getElementById('window_text')
const MODAL_BUTTON = document.getElementById('window_button')

// DOM ELEMENTS
const ROOT_ELEMENT = document.querySelector('.content')
const LOADER_ELEMENT = document.querySelector('.loader_container')
const LOADER_TEXT_ELEMENT = document.querySelector('.loader_text_holder')
const ERROR_ELEMENT = document.querySelector('.error_container')
const ERROR_TEXT_ELEMENT = document.querySelector('.error_text_holder')
const LIST_ELEMENT = document.querySelector('.list_container')

// FORM RELATED MESSAGES
const DEFAULT_HINT = 'Requered field'
const DEFAULT_HINT_NOT_REQUERED = 'Not requered field'

// MODAL WINDOW RELATED CONSTANTS
const CREATE_TITLE = 'Create new Income source'
const EDIT_TITLE = 'Update Income source'
const REMOVE_TITLE = 'Delete Income source'
const SUCCESS_ICON = 'img/ok_96.png'
const ERROR_ICON = 'img/error_96.png'
const TRANSFER_ICON = 'img/transfer_96.png'
const SUCCESS_MESSAGE = 'Created Successfully'
const ERROR_MESSAGE = 'An error has happen'
const TRANSFER_MESSAGE = 'Sending data...'

const RESPONSE_ERROR = 'HTTP error'
const RESPONSE_TYPE_ERROR = 'Expected an array, but received a different type'
const REQUEST_ERROR = 'An error occurred while making the request'
const LOADER_TEXT = 'Fetching data from the server...'

async function createIncomeSource() {
    try {
        const response = await fetch(BASE_URL + ENDPOINT, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                'name': NAME_INPUT.value,
                'currency': CURRENCY_INPUT.value,
                'type': TYPE_INPUT.value,
                'start_date': START_DATE_INPUT.value,
                'end_date': END_DATE_INPUT.value === 0 ? null : END_DATE_INPUT.value,
                'description': DESCRIPTION_INPUT.value === 0 ? 'Not provided' : DESCRIPTION_INPUT.value
            })
        })
        const result = await response.json()
        if (response.status === 201) {
            setWindowIcon(SUCCESS_ICON)
            setWindowMessage(SUCCESS_MESSAGE)
        } else {
            setWindowIcon(ERROR_ICON)
            setWindowMessage(`${ERROR_MESSAGE}\n${response.message}`)
        }
    } catch(error) {
        setWindowIcon(ERROR_ICON)
        setWindowMessage(`${ERROR_MESSAGE}\n${error}`)
    }
}

// FORM RELATED FUNCTIONS AND EVENTS
function checkInputLength(inputElement, inputElementLimit) {
    if (inputElement.value.length > inputElementLimit) {
        inputElement.value = inputElement.value.slice(0, inputElementLimit)
    }
}

function setHintText(inputElement, inputElementLimit, hintElement, defaultHint) {
    if (inputElement.value.length == 0) {
        hintElement.textContent = defaultHint
    } else {
        hintElement.textContent = `Length = ${inputElement.value.length} \\ Max = ${inputElementLimit}`
    }
}

function checkForm() {
    let checkStatus = true
    if (NAME_INPUT.value.length === 0 || NAME_INPUT.value.length > NAME_INPUT_LIMIT) {
        checkStatus = false
        NAME_INPUT.classList.add('form__element--invalid')
    }
    if (CURRENCY_INPUT.value.length === 0 || CURRENCY_INPUT.value.length > CURRENCY_INPUT_LIMIT) {
        checkStatus = false
        CURRENCY_INPUT.classList.add('form__element--invalid')
    }
    if (START_DATE_INPUT.value.length === 0 || START_DATE_INPUT.value.length !== START_DATE_INPUT_LIMIT) {
        checkStatus = false
        START_DATE_INPUT.classList.add('form__element--invalid')
    }
    return checkStatus
}

function resetForm(e) {
    e.preventDefault();
    NAME_INPUT.value = ''
    NAME_INPUT.classList.remove('form__element--invalid')
    CURRENCY_INPUT.value = ''
    CURRENCY_INPUT.classList.remove('form__element--invalid')
    START_DATE_INPUT.value = ''
    START_DATE_INPUT.classList.remove('form__element--invalid')
    END_DATE_INPUT.value = ''
    DESCRIPTION_INPUT.value = ''
    NAME_HINT.textContent = DEFAULT_HINT
    CURRENCY_HINT.textContent = DEFAULT_HINT
    START_DATE_HINT.textContent = DEFAULT_HINT
    END_DATE_HINT.textContent = DEFAULT_HINT_NOT_REQUERED
    DESCRIPTION_HINT.textContent = DEFAULT_HINT_NOT_REQUERED
}

NAME_INPUT.addEventListener('input', () => {
    checkInputLength(NAME_INPUT, NAME_INPUT_LIMIT)
    setHintText(NAME_INPUT, NAME_INPUT_LIMIT, NAME_HINT, DEFAULT_HINT)
    NAME_INPUT.classList.remove('form__element--invalid')
})

CURRENCY_INPUT.addEventListener('input', () => {
    CURRENCY_INPUT.value = CURRENCY_INPUT.value.toUpperCase()
    checkInputLength(CURRENCY_INPUT, CURRENCY_INPUT_LIMIT)
    setHintText(CURRENCY_INPUT, CURRENCY_INPUT_LIMIT, CURRENCY_HINT, DEFAULT_HINT)
    CURRENCY_INPUT.classList.remove('form__element--invalid')
})

START_DATE_INPUT.addEventListener('input', () => {
    checkInputLength(START_DATE_INPUT, START_DATE_INPUT_LIMIT)
    setHintText(START_DATE_INPUT, START_DATE_INPUT_LIMIT, START_DATE_HINT, DEFAULT_HINT)
    START_DATE_INPUT.classList.remove('form__element--invalid')
})

DESCRIPTION_INPUT.addEventListener('input', () => {
    checkInputLength(DESCRIPTION_INPUT, DESCRIPTION_INPUT_LIMIT)
    setHintText(DESCRIPTION_INPUT, DESCRIPTION_INPUT_LIMIT, DESCRIPTION_HINT, DEFAULT_HINT_NOT_REQUERED)
})

SUBMIT_BUTTON.addEventListener('click', (e) => {
    e.preventDefault()
    if (checkForm()) {
        setWindowTitle(CREATE_TITLE)
        setWindowIcon(TRANSFER_ICON)
        setWindowMessage(TRANSFER_MESSAGE)
        showModalWindow()
        createIncomeSource()
    }
})

RESET_BUTTON.addEventListener('click', resetForm)

function showModalWindow() {
    MODAL_FRAME.classList.remove('modal--hidden')
}

function hideModalWindow() {
    MODAL_FRAME.classList.add('modal--hidden')
}

function setWindowTitle(title) {
    MODAL_TITLE.textContent = title
}

function setWindowIcon(icon) {
    MODAL_ICON.src = icon
}

function setWindowMessage(message) {
    MODAL_TEXT.textContent = message
}

MODAL_BUTTON.addEventListener('click', hideModalWindow)



function setDisplayProperty(elem, value) {
    if ((value == 'none') || (value == 'block')) {
        elem.style.display = value
    }
}

function setTextContent(elem, value) {
    elem.textContent = value
}

function createListItem(item) {
    const itemContainer = document.createElement('div')
    itemContainer.classList.add('item_container')
    itemContainer.id = `item_container_${item.id}`

    const itemMainInfo = document.createElement('div')
    itemMainInfo.classList.add('item_main_info')

    const itemName = document.createElement('div')
    itemName.classList.add('item_name')
    itemName.textContent = item.name

    const itemCurrency = document.createElement('div')
    itemCurrency.classList.add('item_currency')
    itemCurrency.textContent = item.currency

    const itemType = document.createElement('div')
    itemType.classList.add('item_type')
    itemType.textContent = item.type

    const itemStartDate = document.createElement('div')
    itemStartDate.classList.add('item_start_date')
    itemStartDate.textContent = item.start_date

    const itemEndDate = document.createElement('div')
    itemEndDate.classList.add('item_end_date')
    itemEndDate.textContent = item.end_date == null ? 'Actual' : item.end_date

    itemMainInfo.appendChild(itemName)
    itemMainInfo.appendChild(itemCurrency)
    itemMainInfo.appendChild(itemType)
    itemMainInfo.appendChild(itemStartDate)
    itemMainInfo.appendChild(itemEndDate)

    const itemAdditionalInfo = document.createElement('div')
    itemAdditionalInfo.classList.add('item_add_info')

    const itemDescription = document.createElement('div')
    itemDescription.classList.add('item_description')
    itemDescription.textContent = item.description

    itemAdditionalInfo.appendChild(itemDescription)

    itemContainer.appendChild(itemMainInfo)
    itemContainer.appendChild(itemAdditionalInfo)

    return itemContainer
}

async function fetchList() {
    setTextContent(LOADER_TEXT_ELEMENT, LOADER_TEXT)
    setDisplayProperty(LOADER_ELEMENT, 'block')
    setDisplayProperty(ERROR_ELEMENT, 'none')
    setDisplayProperty(LIST_ELEMENT, 'none')

    try {
        const response = await fetch(BASE_URL + ENDPOINT)
        if (!response.ok) {
            setTextContent(ERROR_TEXT_ELEMENT, `${RESPONSE_ERROR}: ${response.status}`)
            setDisplayProperty(LOADER_ELEMENT, 'none')
            setDisplayProperty(ERROR_ELEMENT, 'block')
        }
        const data = await response.json()
        if (Array.isArray(data)) {
            for (let i = 0; i < data.length; i++) {
                LIST_ELEMENT.appendChild(createListItem(data[i]))
            }
            setDisplayProperty(LOADER_ELEMENT, 'none')
            setDisplayProperty(LIST_ELEMENT, 'block')
        } else {
            setTextContent(ERROR_TEXT_ELEMENT, RESPONSE_TYPE_ERROR)
            setDisplayProperty(LOADER_ELEMENT, 'none')
            setDisplayProperty(ERROR_ELEMENT, 'block')
        }
    } catch (error) {
        setTextContent(ERROR_TEXT_ELEMENT, `${REQUEST_ERROR}: ${error}`)
        setDisplayProperty(LOADER_ELEMENT, 'none')
        setDisplayProperty(ERROR_ELEMENT, 'block')
    }
}

fetchList()