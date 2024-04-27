const categoryNameInput = document.getElementById('categoryNameInput');
const categoryNameAlert = document.getElementById('categoryNameAlert');
const categoryDescriptionInput = document.getElementById('categoryDescriptionInput');
const createCategoryBtn = document.getElementById('createCategoryBtn');

categoryNameInput.addEventListener("input", checkField);
createCategoryBtn.addEventListener("click", createCategory);

function createCategory() {
    if (categoryNameInput.value == '') {
        categoryNameAlert.classList.remove("category__name_alert-hidden");
        return null;
    }

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
        .then(data => console.log(data))
        .catch(error => responseInput.value = error);
    }

function getCategoryList() {
    fetch('http://54.152.165.126:8080/api/utilities/')
        .then(response => response.json())
        .then(data => console.log(data.utilities))
        .catch(error => responseInput.value = error);
}

function checkField() {
    if (categoryNameInput.value == '') {
        categoryNameAlert.classList.remove("category__name_alert-hidden");
    } else {
        categoryNameAlert.classList.add("category__name_alert-hidden");
    }
}

getCategoryList();