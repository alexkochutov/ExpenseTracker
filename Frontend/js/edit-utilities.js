const categoryNameInput = document.getElementById('categoryNameInput');
const categoryNameAlert = document.getElementById('categoryNameAlert');
const categoryDescriptionInput = document.getElementById('categoryDescriptionInput');
const createCategoryBtn = document.getElementById('createCategoryBtn');
const categoryList = document.getElementById('categoryList');

const modalWindow = document.getElementById('modalWindow');
const modalCloseBtn = document.getElementById('modalCloseBtn');
const modalIcon = document.getElementById('modalIcon');
const modalMessage = document.getElementById('modalMessage');

categoryNameInput.addEventListener("input", checkField);
createCategoryBtn.addEventListener("click", createCategory);
modalCloseBtn.addEventListener("click", closeModal);

function createCategory() {
    if (categoryNameInput.value == '') {
        categoryNameAlert.classList.remove("category__name_alert-hidden");
        return null;
    }

    showModal();

    let body = {
        "name" : categoryNameInput.value,
        "description" : categoryDescriptionInput.value
    }

    fetch('http://54.152.165.126:8080/api/utilities/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify(body)
    })
        .then(response => response.json())
        .then(data => showResult(data.result));
    }

function getCategoryList() {
    fetch('http://54.152.165.126:8080/api/utilities/')
        .then(response => response.json())
        .then(data => showCategory(data.utilities));
}

function checkField() {
    if (categoryNameInput.value == '') {
        categoryNameAlert.classList.remove("category__name_alert-hidden");
    } else {
        categoryNameAlert.classList.add("category__name_alert-hidden");
    }
}

function showModal() {
    modalMessage.innerHTML = "Sending request";
    modalWindow.classList.remove('status-modal_hidden');
}

function closeModal() {
    modalWindow.classList.add('status-modal_hidden');
}

function showResult(message) {
    modalMessage.innerHTML = message;
}

function showError(message) {
    modalMessage.innerHTML = message;
}

function showCategory(utilities) {
    utilities.forEach(element => {

        // Create categoryItemHeader element
        let categoryItemHeader = document.createElement('div');
        categoryItemHeader.setAttribute('class', 'category-item__header');
        categoryItemHeader.innerHTML = `ID #${element.id}`;

        // Create categoryItemContainer element
        let categoryItemContainer = document.createElement('div');
        categoryItemContainer.setAttribute('class', 'category-item__container');

            // Create categoryItemNameContainer element
            let categoryItemNameContainer = document.createElement('div');
            categoryItemNameContainer.setAttribute('class', 'category-item__name-container');

                // Create categoryItemName element
                let categoryItemName = document.createElement('div');
                categoryItemName.setAttribute('class', 'category-item__name');

                    // Create categoryItemNameText element
                    let categoryItemNameText = document.createElement('div');
                    categoryItemNameText.setAttribute('class', 'category-item__name-text');
                    categoryItemNameText.innerHTML = 'Name';

                    // Create categoryItemNameHint element
                    let categoryItemNameHint = document.createElement('div');
                    categoryItemNameHint.setAttribute('class', 'category-item__name-hint hidden-element');
                    categoryItemNameHint.innerHTML = 'Required field. Max length 50 symbols.';

                    // Create categoryItemNameInput element
                    let categoryItemNameInput = document.createElement('div');
                    categoryItemNameInput.setAttribute('class', 'category-item__name-input');

                        // Create categoryItemNameInputField element
                        let categoryItemNameInputField = document.createElement('input');
                        categoryItemNameInputField.setAttribute('class', 'category-item__name-input_input-field');
                        categoryItemNameInputField.setAttribute('type', 'text');
                        categoryItemNameInputField.setAttribute('name', `categoryItemNameInput-${element.id}`);
                        categoryItemNameInputField.setAttribute('id', `categoryItemNameInput-id${element.id}`);
                        categoryItemNameInputField.setAttribute('value', `${element.name}`);
                        //categoryItemNameInputField.disabled = true;

                    // Assemble categoryItemNameInput element
                    categoryItemNameInput.appendChild(categoryItemNameInputField);

                    // Create categoryItemNameAlert element
                    let categoryItemNameAlert = document.createElement('div');
                    categoryItemNameAlert.setAttribute('class', 'category-item__name-alert hidden-element');
                    categoryItemNameAlert.setAttribute('name', `categoryItemNameAlert-${element.id}`);
                    categoryItemNameAlert.setAttribute('id', `categoryItemNameAlert-id${element.id}`);
                    categoryItemNameAlert.innerHTML = 'This field MUST contain at least 1 symbol.';

                // Assemble categoryItemName element
                categoryItemName.appendChild(categoryItemNameText);
                categoryItemName.appendChild(categoryItemNameHint);
                categoryItemName.appendChild(categoryItemNameInput);
                categoryItemName.appendChild(categoryItemNameAlert);

                // Create categoryItemNameTranslate element
                let categoryItemNameTranslate = document.createElement('div');
                categoryItemNameTranslate.setAttribute('class', 'category-item__name-translate');

                    // Create categoryItemNameTranslateText element
                    let categoryItemNameTranslateText = document.createElement('div');
                    categoryItemNameTranslateText.setAttribute('class', 'category-item__name-translate-text');
                    categoryItemNameTranslateText.innerHTML = 'Name Translate';

                    // Create categoryItemNameTranslateHint element
                    let categoryItemNameTranslateHint = document.createElement('div');
                    categoryItemNameTranslateHint.setAttribute('class', 'category-item__name-translate-hint hidden-element');
                    categoryItemNameTranslateHint.innerHTML = 'Not required but highly desirable. Max length 50 symbols.';

                    // Create categoryItemNameTranslateInput element
                    let categoryItemNameTranslateInput = document.createElement('div');
                    categoryItemNameTranslateInput.setAttribute('class', 'category-item__name-translate-input');
        
                        // Create categoryItemNameTranslateInputField element
                        let categoryItemNameTranslateInputField = document.createElement('input');
                        categoryItemNameTranslateInputField.setAttribute('class', 'category-item__name-translate-input_input-field');
                        categoryItemNameTranslateInputField.setAttribute('type', 'text');
                        categoryItemNameTranslateInputField.setAttribute('name', `categoryItemNameTranslateInput-${element.id}`);
                        categoryItemNameTranslateInputField.setAttribute('id', `categoryItemNameTranslateInput-id${element.id}`);
                        let nameTranslate = element.nameTranslate === '' || element.nameTranslate === null ? 'Not provided' : element.nameTranslate;
                        categoryItemNameTranslateInputField.setAttribute('value', `${nameTranslate}`);
                        //categoryItemNameTranslateInputField.disabled = true;
        
                    // Assemble categoryItemNameTranslateInputField element
                    categoryItemNameTranslateInput.appendChild(categoryItemNameTranslateInputField);

                // Assemble categoryItemNameTranslate element
                categoryItemNameTranslate.appendChild(categoryItemNameTranslateText);
                categoryItemNameTranslate.appendChild(categoryItemNameTranslateHint);
                categoryItemNameTranslate.appendChild(categoryItemNameTranslateInput);

            // Assemble categoryItemNameContainer element
            categoryItemNameContainer.appendChild(categoryItemName);
            categoryItemNameContainer.appendChild(categoryItemNameTranslate);

            // Create categoryItemDescriptionContainer element
            let categoryItemDescriptionContainer = document.createElement('div');
            categoryItemDescriptionContainer.setAttribute('class', 'category-item__description-container');

                // Create categoryItemDescription element
                let categoryItemDescription = document.createElement('div');
                categoryItemDescription.setAttribute('class', 'category-item__description');

                    // Create categoryItemDescriptionText element
                    let categoryItemDescriptionText = document.createElement('div');
                    categoryItemDescriptionText.setAttribute('class', 'category-item__description-text');
                    categoryItemDescriptionText.innerHTML = 'Description';

                    // Create categoryItemDescriptionHint element
                    let categoryItemDescriptionHint = document.createElement('div');
                    categoryItemDescriptionHint.setAttribute('class', 'category-item__description-hint hidden-element');
                    categoryItemDescriptionHint.innerHTML = 'Not required but highly desirable. Max length 150 symbols.';

                    // Create categoryItemDescriptionInput element
                    let categoryItemDescriptionInput = document.createElement('div');
                    categoryItemDescriptionInput.setAttribute('class', 'category-item__description-input');

                        // Create categoryItemDescriptionInputField element
                        let categoryItemDescriptionInputField = document.createElement('input');
                        categoryItemDescriptionInputField.setAttribute('class', 'category-item__description-input_input-field');
                        categoryItemDescriptionInputField.setAttribute('type', 'text');
                        categoryItemDescriptionInputField.setAttribute('name', `categoryItemDescriptionInput-${element.id}`);
                        categoryItemDescriptionInputField.setAttribute('id', `categoryItemDescriptionInput-id${element.id}`);
                        let description = element.description === '' || element.description === null ? 'Not provided' : element.description;
                        categoryItemDescriptionInputField.setAttribute('value', `${description}`);
                        //categoryItemDescriptionInputField.disabled = true;

                    // Assemble categoryItemDescriptionInput element
                    categoryItemDescriptionInput.appendChild(categoryItemDescriptionInputField);

                // Assemble categoryItemDescription element
                categoryItemDescription.appendChild(categoryItemDescriptionText);
                categoryItemDescription.appendChild(categoryItemDescriptionHint);
                categoryItemDescription.appendChild(categoryItemDescriptionInput);

                // Create categoryItemDescriptionTranslate element
                let categoryItemDescriptionTranslate = document.createElement('div');
                categoryItemDescriptionTranslate.setAttribute('class', 'category-item__description-translate');

                    // Create categoryItemDescriptionTranslateText element
                    let categoryItemDescriptionTranslateText = document.createElement('div');
                    categoryItemDescriptionTranslateText.setAttribute('class', 'category-item__description-translate-text');
                    categoryItemDescriptionTranslateText.innerHTML = 'Description Translate';

                    // Create categoryItemDescriptionTranslateHint element
                    let categoryItemDescriptionTranslateHint = document.createElement('div');
                    categoryItemDescriptionTranslateHint.setAttribute('class', 'category-item__description-translate-hint hidden-element');
                    categoryItemDescriptionTranslateHint.innerHTML = 'Not required but highly desirable. Max length 150 symbols.';

                    // Create categoryItemDescriptionTranslateInput element
                    let categoryItemDescriptionTranslateInput = document.createElement('div');
                    categoryItemDescriptionTranslateInput.setAttribute('class', 'category-item__description-translate-input');
        
                        // Create categoryItemDescriptionTranslateInputField element
                        let categoryItemDescriptionTranslateInputField = document.createElement('input');
                        categoryItemDescriptionTranslateInputField.setAttribute('class', 'category-item__description-translate-input_input-field');
                        categoryItemDescriptionTranslateInputField.setAttribute('type', 'text');
                        categoryItemDescriptionTranslateInputField.setAttribute('name', `categoryItemDescriptionTranslateInput-${element.id}`);
                        categoryItemDescriptionTranslateInputField.setAttribute('id', `categoryItemDescriptionTranslateInput-id${element.id}`);
                        let descriptionTranslate = element.descriptionTranslate === '' || element.descriptionTranslate === null ? 'Not provided' : element.descriptionTranslate;
                        categoryItemDescriptionTranslateInputField.setAttribute('value', `${descriptionTranslate}`);
                        //categoryItemDescriptionTranslateInputField.disabled = true;
        
                    // Assemble categoryItemDescriptionTranslateInput element
                    categoryItemDescriptionTranslateInput.appendChild(categoryItemDescriptionTranslateInputField);

                // Assemble categoryItemDescriptionTranslate element
                categoryItemDescriptionTranslate.appendChild(categoryItemDescriptionTranslateText);
                categoryItemDescriptionTranslate.appendChild(categoryItemDescriptionTranslateHint);
                categoryItemDescriptionTranslate.appendChild(categoryItemDescriptionTranslateInput);

            // Assemble categoryItemDescriptionContainer element
            categoryItemDescriptionContainer.appendChild(categoryItemDescription);
            categoryItemDescriptionContainer.appendChild(categoryItemDescriptionTranslate);

            // Create categoryItemButtonContainer element
            let categoryItemButtonContainer = document.createElement('div');
            categoryItemButtonContainer.setAttribute('class', 'category-item__button-container');

                // Create categoryItemButtonModify element
                let categoryItemButtonModify = document.createElement('button');
                categoryItemButtonModify.setAttribute('name', `modifyCategoryItemBtn-${element.id}`);
                categoryItemButtonModify.setAttribute('id', `modifyCategoryItemBtn-id1-${element.id}`);
                categoryItemButtonModify.setAttribute('class', 'category-item__button-modify');
                categoryItemButtonModify.innerHTML = 'Modify';

                // Create categoryItemButtonDelete element
                let categoryItemButtonDelete = document.createElement('button');
                categoryItemButtonDelete.setAttribute('name', `deleteCategoryItemBtn-${element.id}`);
                categoryItemButtonDelete.setAttribute('id', `deleteCategoryItemBtn-id1-${element.id}`);
                categoryItemButtonDelete.setAttribute('class', 'category-item__button-delete');
                categoryItemButtonDelete.innerHTML = 'Delete';

                // Create categoryItemButtonUpdate element
                let categoryItemButtonUpdate = document.createElement('button');
                categoryItemButtonUpdate.setAttribute('name', `updateCategoryItemBtn-${element.id}`);
                categoryItemButtonUpdate.setAttribute('id', `updateCategoryItemBtn-id1-${element.id}`);
                categoryItemButtonUpdate.setAttribute('class', 'category-item__button-update');
                categoryItemButtonUpdate.innerHTML = 'Update';

                // Create categoryItemButtonCancel element
                let categoryItemButtonCancel = document.createElement('button');
                categoryItemButtonCancel.setAttribute('name', `cancelCategoryItemBtn-${element.id}`);
                categoryItemButtonCancel.setAttribute('id', `cancelCategoryItemBtn-id1-${element.id}`);
                categoryItemButtonCancel.setAttribute('class', 'category-item__button-cancel');
                categoryItemButtonCancel.innerHTML = 'Cancel';

            // Assemble categoryItemButtonContainer element
            categoryItemButtonContainer.appendChild(categoryItemButtonModify);
            categoryItemButtonContainer.appendChild(categoryItemButtonDelete);
            categoryItemButtonContainer.appendChild(categoryItemButtonUpdate);
            categoryItemButtonContainer.appendChild(categoryItemButtonCancel);

        // Assemble categoryItemContainer element
        categoryItemContainer.appendChild(categoryItemNameContainer);
        categoryItemContainer.appendChild(categoryItemDescriptionContainer);
        categoryItemContainer.appendChild(categoryItemButtonContainer);

        // Create categoryItem element
        let categoryItem = document.createElement('div');
        categoryItem.setAttribute('class', 'category-item');

        // Assemble categoryItem element
        categoryItem.appendChild(categoryItemHeader);
        categoryItem.appendChild(categoryItemContainer);

        // Render categoryItem element
        categoryList.appendChild(categoryItem);

    });
}

getCategoryList();