const listContainer = document.querySelector("[data-lists]");
const newlistForm = document.querySelector("[data-new-list-form]");
const newlistInput = document.querySelector("[data-new-list-input]");
const deleteListButton = document.querySelector("[data-delete-list-button]");
const maintaskcontainers = document.querySelectorAll("[data-task-container]");
const taskcontainerHeads = document.querySelectorAll(
  "[data-task-container-header]"
);
const taskcontainerCounters = document.querySelectorAll(
  "[data-task-container-header-count]"
);
const taskcontainerDeleteAllTasks = document.querySelectorAll(
  "[data-task-container-header-deleteall]"
);
const taskcontainerNewTasks = document.querySelectorAll(
  "[data-task-container-header-newtask]"
);
const taskContainers = document.querySelectorAll(
  "[data-task-container-content]"
);
const newtaskform = document.querySelectorAll(".newtaskform");
const taskTemplate = document.getElementById("task-template");
const LOCAL_STORAGE_LIST_KEY = "task.lists";
const LOCAL_STORAGE_SELECTED_LIST_ID_KEY = "task.selectedListId";
let lists = JSON.parse(localStorage.getItem(LOCAL_STORAGE_LIST_KEY)) || [];
let selectedListId = localStorage.getItem(LOCAL_STORAGE_SELECTED_LIST_ID_KEY);

listContainer.addEventListener("click", (e) => {
  if (e.target.tagName.toLowerCase() === "li") {
    selectedListId = e.target.dataset.listId;
    saveandrender();
  }
});
deleteListButton.addEventListener("click", (e) => {
  lists = lists.filter((list) => list.id !== selectedListId);
  selectedListId = null;
  saveandrender();
});
newlistForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const listname = newlistInput.value;
  if (listname === null || listname === "") {
    return;
  }
  const list = createList(listname);
  newlistInput.value = "";
  lists.push(list);
  saveandrender();
});
taskcontainerNewTasks.forEach((newtask) => {
  newtask.addEventListener("submit", (event) => {
    const field = event.target.querySelector("input");
    const taskname = field.value;
    if (field.value === null || field.value === "") {
      return;
    }
    const newtask = createTask(taskname);
    field.value = "";
    const NearestTaskcomponent = event.target.closest(".taskComponent");
    const selectedList = lists.find((list) => list.id === selectedListId);
    if (NearestTaskcomponent.classList.contains("todo")) {
      selectedList.task.todo.push(newtask);
    } else if (NearestTaskcomponent.classList.contains("progress")) {
      selectedList.task.inprogress.push(newtask);
    } else if (NearestTaskcomponent.classList.contains("done")) {
      selectedList.task.done.push(newtask);
    }
    saveandrender();
  });
});
function clearElement(element) {
  while (element.firstChild) {
    element.removeChild(element.firstChild);
  }
}
function createList(name) {
  return {
    id: Date.now().toString(),
    name: name,
    task: {
      todo: [],
      inprogress: [],
      done: [],
    },
  };
}
function createTask(name) {
  return { id: Date.now().toString(), name: name };
}

function saveandrender() {
  save();
  render();
}
function save() {
  localStorage.setItem(LOCAL_STORAGE_LIST_KEY, JSON.stringify(lists));
  localStorage.setItem(LOCAL_STORAGE_SELECTED_LIST_ID_KEY, selectedListId);
}

function render() {
  clearElement(listContainer);
  renderlist();
  const selectedList = lists.find((list) => list.id === selectedListId);
  maintaskcontainers.forEach((maintaskcontainer) => {
    if (selectedListId == null) {
      maintaskcontainer.style.display = "none";
    } else {
      maintaskcontainer.style.display = "";
    }
  });

  countTask(selectedList);
  clearTask();
  renderTasks(selectedList);
}
function clearTask() {
  const taskelements = document.querySelectorAll(".contentContainer");
  taskelements.forEach((element) => {
    element.remove();
  });
}
function renderlist() {
  lists.forEach((list) => {
    const listContent = document.createElement("li");
    listContent.dataset.listId = list.id;
    listContent.classList.add("list");
    listContent.innerText = list.name;
    if (list.id === selectedListId) {
      listContent.classList.add("selectedList");
    }
    listContainer.appendChild(listContent);
  });
}
function renderTasks(selectedList) {
  if (!selectedList) {
    return;
  }
  const todolist = selectedList.task.todo;
  const progresslist = selectedList.task.inprogress;
  const donelist = selectedList.task.done;
  todolist.forEach((task) => {
    maintaskcontainers.forEach((container) => {
      if (container.classList.contains("todo")) {
        let taskContainer = container.querySelector(
          "[data-task-container-content]"
        );
        return tasks(taskContainer, task);
      }
    });
  });
  progresslist.forEach((task) => {
    maintaskcontainers.forEach((container) => {
      if (container.classList.contains("progress")) {
        let taskContainer = container.querySelector(
          "[data-task-container-content]"
        );
        return tasks(taskContainer, task);
      }
    });
  });
  donelist.forEach((task) => {
    maintaskcontainers.forEach((container) => {
      if (container.classList.contains("done")) {
        let taskContainer = container.querySelector(
          "[data-task-container-content]"
        );
        return tasks(taskContainer, task);
      }
    });
  });
}
function tasks(container, task) {
  const taskElement = document.importNode(taskTemplate.content, true);
  const inputField = taskElement.querySelector("textarea");
  inputField.id = task.id;
  inputField.append(task.name);
  container.appendChild(taskElement);
}

function countTask(selectedList) {
  if (!selectedList) {
    return;
  }
  const alltasktodocount = selectedList.task.todo.length;
  const alltaskinprogresscount = selectedList.task.inprogress.length;
  const alltaskdonecount = selectedList.task.done.length;
  taskcontainerCounters.forEach((counter) => {
    const NearestTaskcomponent = counter.closest("[data-task-container]");
    if (NearestTaskcomponent.classList.contains("todo")) {
      counter.innerHTML = alltasktodocount;
    } else if (NearestTaskcomponent.classList.contains("progress")) {
      counter.innerHTML = alltaskinprogresscount;
    } else {
      counter.innerHTML = alltaskdonecount;
    }
  });
}
render();
