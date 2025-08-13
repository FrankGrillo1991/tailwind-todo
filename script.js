const taskInput = document.getElementById("taskInput");
const addTaskBtn = document.getElementById("addTaskBtn");
const taskList = document.getElementById("taskList");

let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

//Render tasks
function renderTasks() {
    taskList.innerHTML = "";
    tasks.forEach((task, index) => {
        const li = document.createElement("li");
        li.className = "flex justify-between items-center bg-gray-50 p-2 rounded shadow";
        li.innerHTML = `
        <span class="${task.completed ? 'line-through text-gray-400' : ''} cursor-pointer" data-index="${task.text}">
            ${task.text}
        </span>
        <button class="text-red-500 hover:text-red-700" data-index="${index}">Delete</button>
        `;
        taskList.appendChild(li);
    });
}

// Add task
addTaskBtn.addEventListener("click", () => {
    if (taskInput.value.trim() === "") return;
    tasks.push({ text: taskInput.value, completed: false });
    taskInput.value = "";
    saveTasks();
});

// Toggle complete / delete
taskList.addEventListener("click", (e) => {
    const index = e.target.dataset.index;
    if (e.target.tagName === "SPAN") {
        tasks[index].completed = !tasks[index].completed;
    } else if (e.target.tagName === "BUTTON") {
        tasks.splice(index, 1);
    }
    saveTasks();
});

// Save to localStorage
function saveTasks() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
    renderTasks();
}

renderTasks();