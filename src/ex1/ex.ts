//  * Créer une app de gestion des taches
/* TODO:
 X champ de texte pour saisir une tache
 X bouton pour ajouter la tache
 X liste des taches
 X taches supprimables
 X taches persistantes (localStorage)
 X taches cochable (faite)
 * filtrage (toutes, faites, à faire)
*/
interface Task {
    title: string;
    done: boolean;
}

const body = document.body;
const tasksStorage = localStorage.getItem('tasks');
const tasks: Task[] = tasksStorage ? JSON.parse(tasksStorage) : [];

// Champ de texte
const input = document.createElement('input') as HTMLInputElement;
input.type = 'text';
input.placeholder = 'Nouvelle tâche';

// Bouton Ajouter
const addButton = document.createElement('button') as HTMLButtonElement;
addButton.textContent = 'Ajouter';
addButton.onclick = () => {addInputHandler(input, taskList)};

// Liste des taches
const taskList = document.createElement('ul') as HTMLUListElement;
if (tasks.length > 0) {
    tasks.forEach((task) => {addTask(task, taskList)});
}

// Filtre
const filterRadio_1 = document.createElement('input') as HTMLInputElement
filterRadio_1.type = "radio"
filterRadio_1.name = "filter"
const labelFilter_1 = document.createElement('label') as HTMLLabelElement
labelFilter_1.textContent = "Toutes"
labelFilter_1.appendChild(filterRadio_1)
body.appendChild(labelFilter_1)


const filterRadio_2 = document.createElement('input') as HTMLInputElement
filterRadio_2.type = "radio"
filterRadio_2.name = "filter"
const labelFilter_2 = document.createElement('label') as HTMLLabelElement
labelFilter_2.textContent = "À faire"
labelFilter_2.appendChild(filterRadio_2)
body.appendChild(labelFilter_2)

const filterRadio_3 = document.createElement('input') as HTMLInputElement
filterRadio_3.type = "radio"
filterRadio_3.name = "filter"
const labelFilter_3 = document.createElement('label') as HTMLLabelElement
labelFilter_3.textContent = "Faites"
labelFilter_3.appendChild(filterRadio_3)
body.appendChild(labelFilter_3)



const div1 = document.createElement('div');
div1.appendChild(input);
div1.appendChild(addButton);

body.appendChild(div1);
body.appendChild(taskList);


function addTask(task: Task, ul: HTMLUListElement) {
    const li = document.createElement('li') as HTMLLIElement;
    const checkbox = document.createElement('input') as HTMLInputElement;
    checkbox.type = 'checkbox';
    checkbox.checked = task.done;
    checkbox.onchange = () => {onCheckboxChange(checkbox, task)};
    const span = document.createElement('span') as HTMLSpanElement;
    span.textContent = `  ${task.title}  `;
    const deleteButton = document.createElement('button') as HTMLButtonElement;
    deleteButton.textContent = 'Supprimer';
    deleteButton.onclick = () => {deleteTaskHandler(li)};

    li.appendChild(checkbox);
    li.appendChild(span);
    li.appendChild(deleteButton);
    ul.appendChild(li);
}

function onCheckboxChange(checkbox: HTMLInputElement, task: Task) {
    task.done = checkbox.checked;
    const taskIndex = tasks.findIndex((Task: Task) => task.title == Task.title)
    if (taskIndex !== 1) {
        tasks.splice(taskIndex, 1, task)
        localStorage.setItem('tasks', JSON.stringify(tasks))
    }
}

function addInputHandler(input: HTMLInputElement, ul: HTMLUListElement) {
    const task: Task = {title: input.value, done: false}

    const li = document.createElement('li') as HTMLLIElement;
    const checkbox = document.createElement('input') as HTMLInputElement;
    checkbox.type = 'checkbox';
    checkbox.onchange = () => {onCheckboxChange(checkbox, task)};

    const span = document.createElement('span') as HTMLSpanElement;
    span.textContent = `  ${input.value}  `;
    const deleteButton = document.createElement('button') as HTMLButtonElement;
    deleteButton.textContent = 'Supprimer';
    deleteButton.onclick = () => {deleteTaskHandler(li)};

    li.appendChild(checkbox);
    li.appendChild(span);
    li.appendChild(deleteButton);
    ul.appendChild(li);
    
    tasks.push(task);
    localStorage.setItem('tasks', JSON.stringify(tasks));
    input.value = '';
}

function deleteTaskHandler(li: HTMLLIElement) {
    // Supprimer la tache du tableau
    const taskTitle = li.querySelector('span')?.textContent?.trim();
    const taskIndex = tasks.findIndex((task:Task) => task.title === taskTitle);
    if (taskIndex !== -1) {
        tasks.splice(taskIndex, 1);
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }
    
    // Supprimer la tache de l'affichage
    li.remove();
}


function onClickHandler(radio: HTMLInputElement) {
    const filter = radio.nextSibling?.textContent?.trim();
    const lis = taskList.querySelectorAll('li');
    lis.forEach((li) => {
        const checkbox = li.querySelector('input[type="checkbox"]') as HTMLInputElement;
        switch (filter) {
            case "Toutes":
                break;
            case "À faire":
                if (checkbox.checked) {
                    li.style.display = 'none';
                } else {
                    li.style.display = '';
                }
                break;
            case "Faites":
                if (checkbox.checked) {
                    li.style.display = '';
                } else {
                    li.style.display = 'none';
                }
                break;
        }
    });
}