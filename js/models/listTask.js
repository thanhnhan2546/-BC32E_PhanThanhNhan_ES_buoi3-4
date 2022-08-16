export class ListTask {
  listTask = [];

  addTask(task) {
    this.listTask = [...this.listTask, task];
  }

  comleteTask(task) {
    this.listTask = this.listTask.map((value) =>
      value.nameTask === task.nameTask ? task : value
    );
  }

  findTask(name) {
    return this.listTask.find((task) => task.nameTask === name);
  }

  removeTask(name) {
    this.listTask = this.listTask.filter((task) => task.nameTask !== name);
  }

  taskToDo() {
    return this.listTask.filter((task) => {
      if (!task.done) return true;
      return false;
    });
  }
  taskComplete() {
    return this.listTask.filter((task) => task.done);
  }
  sort(bool) {
    if (bool) {
      this.listTask = this.listTask.sort((val, nextVal) =>
        val.nameTask > nextVal.nameTask ? 1 : -1
      );
    } else {
      this.listTask = this.listTask.sort((val, nextVal) =>
        val.nameTask > nextVal.nameTask ? -1 : 1
      );
    }
  }
}
