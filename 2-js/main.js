const tasks = []

const boton = document.querySelector("#newTask button")
const input = document.querySelector("#newTask input")
const tasksContainer = document.querySelector("#Tasks")

function createNewTask() {
    var newTask = input.value
    if (newTask.trim() === "") {
        return
    }
    tasks.push(newTask)
    input.value = ''
    saveTasks()
    renderTasks()
}

function whatever() {
    const botonmalo = input.value
    if (botonmalo.trim() === "") {
        boton.disabled = true;
    } else {
        boton.disabled = false;
    }
}

function renderTasks(){
    tasksContainer.innerHTML = "";
    for (var i = 0; i < tasks.length; i++) {
        const position = i
        const task = tasks[i]
        const deleteButton = document.createElement("button");
        deleteButton.textContent = "X"
        deleteButton.addEventListener("click", function (){
            deleteTask(position)
        });
        const taskdiv = document.createElement("div");
        taskdiv.textContent = task;
        taskdiv.classList.add("Task");
        taskdiv.appendChild(deleteButton);
        tasksContainer.appendChild(taskdiv);
    }
}

function deleteTask(position){
    tasks.splice(position, 1);
    saveTasks()
    renderTasks()
}

function saveTasks(){
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function loadTasks(){
    const loadedTasks = localStorage.getItem("tasks")
    if (loadedTasks === null) {
        return
    }
    const loadedArray = JSON.parse(loadedTasks)
    loadedArray.forEach(loadedTask => tasks.push(loadedTask))
}

input.addEventListener("change", whatever)

boton.addEventListener("click", createNewTask)

loadTasks()
renderTasks()