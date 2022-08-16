import { Task } from "../models/Task.js";
import { ListTask } from "../models/listTask.js";

const getElements = (id) => document.getElementById(id);

const taskServices = new ListTask();

const renderTask = () => {
  const taskToDo = taskServices.taskToDo().reduce((value, task) => {
    return (value += `
        <li>
        ${task.nameTask}
        <div class="buttons">
          <button class="remove">
            <i class="fas fa-trash-alt" onclick= "removeTask('${task.nameTask}')" ></i>
          </button>
          <button class="complete">
            <i class="fas fa-check-circle" onclick= "completeTask('${task.nameTask}')"></i>
          </button>
        </div>
      </li>
        `);
  }, "");

  const taskComplete = taskServices.taskComplete().reduce((value, task) => {
    return (value += `
        <li>
        ${task.nameTask}
        <div class="buttons">
          <button class="remove">
            <i class="fas fa-trash-alt" onclick= "removeTask('${task.nameTask}')"></i>
          </button>
          <button class="complete">
            <i class="fas fa-check-circle"></i>
          </button>
        </div>
      </li>
        `);
  }, "");

  getElements("todo").innerHTML = taskToDo;
  getElements("completed").innerHTML = taskComplete;
};

const setLocalStore = () => {
  localStorage.setItem("listTask", JSON.stringify(taskServices.listTask));
};
// setLocalStore();
// localStorage.removeItem("listTask");
const getLocalStore = () => {
  const data = localStorage.getItem("listTask");
  const listData = JSON.parse(data) || [];

  taskServices.listTask = listData.map((value) => {
    const task = new Task();
    for (let key in value) {
      task[key] = value[key];
    }
    return task;
  });
  renderTask();
};
getLocalStore();

const getInput = () => {
  const task = new Task();

  const value = getElements("newTask").value;
  task.nameTask = value;

  return task;
};

getElements("addItem").onclick = () => {
  const task = getInput();
  taskServices.addTask(task);
  // console.log(taskServices.listTask);
  setLocalStore();
  renderTask();
};

window.completeTask = (name) => {
  const taskDone = taskServices.findTask(name);

  taskDone.done = true;

  taskServices.comleteTask(taskDone);
  setLocalStore();

  renderTask();
};

window.removeTask = (name) => {
  taskServices.removeTask(name);
  setLocalStore();

  renderTask();
};

getElements("two").onclick = () => {
  taskServices.sort(true);
  renderTask();
};
getElements("three").onclick = () => {
  taskServices.sort(false);
  renderTask();
};
