"use strict";
var body = document.body;
var tasksStorage = localStorage.getItem('tasks');
var tasks = tasksStorage ? JSON.parse(tasksStorage) : [];
// Champ de texte
var input = document.createElement('input');
input.type = 'text';
input.placeholder = 'Nouvelle tâche';
// Bouton Ajouter
var addButton = document.createElement('button');
addButton.textContent = 'Ajouter';
addButton.onclick = function () { addInputHandler(input, taskList); };
// Liste des taches
var taskList = document.createElement('ul');
if (tasks.length > 0) {
    tasks.forEach(function (task) { addTask(task, taskList); });
}
// Filtre
var filterRadio_1 = document.createElement('input');
filterRadio_1.type = "radio";
filterRadio_1.name = "filter";
var labelFilter_1 = document.createElement('label');
labelFilter_1.textContent = "Toutes";
labelFilter_1.appendChild(filterRadio_1);
body.appendChild(labelFilter_1);
var filterRadio_2 = document.createElement('input');
filterRadio_2.type = "radio";
filterRadio_2.name = "filter";
var labelFilter_2 = document.createElement('label');
labelFilter_2.textContent = "À faire";
labelFilter_2.appendChild(filterRadio_2);
body.appendChild(labelFilter_2);
var filterRadio_3 = document.createElement('input');
filterRadio_3.type = "radio";
filterRadio_3.name = "filter";
var labelFilter_3 = document.createElement('label');
labelFilter_3.textContent = "Faites";
labelFilter_3.appendChild(filterRadio_3);
body.appendChild(labelFilter_3);
var div1 = document.createElement('div');
div1.appendChild(input);
div1.appendChild(addButton);
body.appendChild(div1);
body.appendChild(taskList);
function addTask(task, ul) {
    var li = document.createElement('li');
    var checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.checked = task.done;
    checkbox.onchange = function () { onCheckboxChange(checkbox, task); };
    var span = document.createElement('span');
    span.textContent = "  ".concat(task.title, "  ");
    var deleteButton = document.createElement('button');
    deleteButton.textContent = 'Supprimer';
    deleteButton.onclick = function () { deleteTaskHandler(li); };
    li.appendChild(checkbox);
    li.appendChild(span);
    li.appendChild(deleteButton);
    ul.appendChild(li);
}
function onCheckboxChange(checkbox, task) {
    task.done = checkbox.checked;
    var taskIndex = tasks.findIndex(function (Task) { return task.title == Task.title; });
    if (taskIndex !== 1) {
        tasks.splice(taskIndex, 1, task);
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }
}
function addInputHandler(input, ul) {
    var task = { title: input.value, done: false };
    var li = document.createElement('li');
    var checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.onchange = function () { onCheckboxChange(checkbox, task); };
    var span = document.createElement('span');
    span.textContent = "  ".concat(input.value, "  ");
    var deleteButton = document.createElement('button');
    deleteButton.textContent = 'Supprimer';
    deleteButton.onclick = function () { deleteTaskHandler(li); };
    li.appendChild(checkbox);
    li.appendChild(span);
    li.appendChild(deleteButton);
    ul.appendChild(li);
    tasks.push(task);
    localStorage.setItem('tasks', JSON.stringify(tasks));
    input.value = '';
}
function deleteTaskHandler(li) {
    var _a, _b;
    // Supprimer la tache du tableau
    var taskTitle = (_b = (_a = li.querySelector('span')) === null || _a === void 0 ? void 0 : _a.textContent) === null || _b === void 0 ? void 0 : _b.trim();
    var taskIndex = tasks.findIndex(function (task) { return task.title === taskTitle; });
    if (taskIndex !== -1) {
        tasks.splice(taskIndex, 1);
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }
    // Supprimer la tache de l'affichage
    li.remove();
}
function onClickHandler(radio) {
    var _a, _b;
    var filter = (_b = (_a = radio.nextSibling) === null || _a === void 0 ? void 0 : _a.textContent) === null || _b === void 0 ? void 0 : _b.trim();
    var lis = taskList.querySelectorAll('li');
    lis.forEach(function (li) {
        var checkbox = li.querySelector('input[type="checkbox"]');
        switch (filter) {
            case "Toutes":
                break;
            case "À faire":
                if (checkbox.checked) {
                    li.style.display = 'none';
                }
                else {
                    li.style.display = '';
                }
                break;
            case "Faites":
                if (checkbox.checked) {
                    li.style.display = '';
                }
                else {
                    li.style.display = 'none';
                }
                break;
        }
    });
}
