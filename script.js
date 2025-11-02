let tasks = [
    { id: 16, description: "Hacer mercado", completed: false },
    { id: 60, description: "Estudiar para la prueba", completed: false },
    { id: 24, description: "Sacar a pasear a Tobby", completed: false }
];

const taskInput = document.getElementById('taskInput');
const addTaskBtn = document.getElementById('addTaskBtn');
const taskList = document.getElementById('taskList');
const totalTasksElem = document.getElementById('totalTasks');
const completedTasksElem = document.getElementById('completedTasks');

function renderTasks() {
    taskList.innerHTML = '';
    tasks.forEach((task, index) => {
        const li = document.createElement('li');
        li.className = task.completed ? 'completed' : '';

        const taskInfo = document.createElement('div');
        taskInfo.classList.add('task-info');

        const taskText = document.createElement('span');
        taskText.textContent = task.description;

        const taskId = document.createElement('span');
        taskId.textContent = `ID: ${task.id}`;

        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.classList.add('checkbox');
        checkbox.checked = task.completed;
        checkbox.onclick = () => toggleCompletion(index);

        const deleteButton = document.createElement('button');
        deleteButton.classList.add('delete');
        deleteButton.textContent = 'X';
        deleteButton.onclick = () => deleteTask(index);

        taskInfo.appendChild(taskId);
        taskInfo.appendChild(taskText);
        li.appendChild(checkbox);
        li.appendChild(taskInfo);
        li.appendChild(deleteButton);

        taskList.appendChild(li);
    });

    updateSummary();
}

function addTask() {
    const taskDescription = taskInput.value.trim();
    if (taskDescription !== "") {
        const newTask = {
            id: Date.now(),
            description: taskDescription,
            completed: false
        };
        tasks.push(newTask);
        taskInput.value = '';
        renderTasks();
    }
}

function deleteTask(index) {
    tasks.splice(index, 1);
    renderTasks();
}

function toggleCompletion(index) {
    tasks[index].completed = !tasks[index].completed;
    renderTasks();
}

function updateSummary() {
    totalTasksElem.textContent = tasks.length;
    const completedTasks = tasks.filter(task => task.completed).length;
    completedTasksElem.textContent = completedTasks;
}

addTaskBtn.addEventListener('click', addTask);

taskInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        addTask();
    }
});

renderTasks();
