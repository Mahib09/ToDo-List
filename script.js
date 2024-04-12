const listContainer = document.querySelector("[data-lists]"); //main list holder
const newlistForm = document.querySelector("[data-new-list-form]"); // list input form
const newlistInput = document.querySelector("[data-new-list-input]"); //list input
const deleteListButton = document.querySelector("[data-delete-list-button]"); // delete list btn
const sortTaskButton = document.querySelector("[data-sort-list-button]"); // sort tasks btn
const maintaskcontainers = document.querySelectorAll("[data-task-container]"); //ALL main body(contains all tasks)
const taskcontainerHeads = document.querySelectorAll(
  "[data-task-container-header]"
); //All task Container Headers(Containers title counter and deleteall)
const taskcontainerCounters = document.querySelectorAll(
  "[data-task-container-header-count]"
); //ALL Task Counters
const taskcontainerDeleteAllTasks = document.querySelectorAll(
  "[data-task-container-header-deleteall]"
); //All Delete All Task Btn
const taskcontainerNewTasks = document.querySelectorAll(
  "[data-task-container-header-newtask]"
); //All Add new task btn
const taskContainers = document.querySelectorAll(
  "[data-task-container-content]"
); //All task containers
const newtaskform = document.querySelectorAll(".newtaskform"); // new task form
const taskTemplate = document.getElementById("task-template"); // task template (<template>)
const model = document.querySelector(".model"); //confirm model for delete all task
const confirmbtn = document.querySelector(".confirmationDelete"); //confirm btn for delete all task
const cancelbtn = document.querySelector(".confirmationCancel"); //cancel btn for delete all task
const sortModel = document.querySelector(".sortmenu");
const pluslist = document.querySelector(".newlistbtn");
const inputlist = document.querySelector(".newListInput");
const LOCAL_STORAGE_LIST_KEY = "task.lists"; //stores listin local storage
const LOCAL_STORAGE_SELECTED_LIST_ID_KEY = "task.selectedListId"; //stores selected list in local storage
let lists = JSON.parse(localStorage.getItem(LOCAL_STORAGE_LIST_KEY)) || []; // get list from localstorage
let selectedListId = localStorage.getItem(LOCAL_STORAGE_SELECTED_LIST_ID_KEY); //get selected list from local storage

//List Select
listContainer.addEventListener("click", (e) => {
  if (e.target.tagName.toLowerCase() === "li") {
    selectedListId = e.target.dataset.listId;
    saveandrender();
  }
});

//Delete List
deleteListButton.addEventListener("click", (e) => {
  lists = lists.filter((list) => list.id !== selectedListId);
  selectedListId = null;
  saveandrender();
});

//Create New List
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

//Create New Tasks
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
    return;
  });
});

//Clear Element
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

//Task Object Model
function createTask(name) {
  return { id: Date.now().toString(), name: name };
}

//Save and Render Combined
function saveandrender() {
  save();
  render();
}

//Save the Data to Local Storage
function save() {
  localStorage.setItem(LOCAL_STORAGE_LIST_KEY, JSON.stringify(lists));
  localStorage.setItem(LOCAL_STORAGE_SELECTED_LIST_ID_KEY, selectedListId);
}

//Render the Data From Local Storage
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

//Clear Task
function clearTask() {
  const taskelements = document.querySelectorAll(".contentContainer");
  taskelements.forEach((element) => {
    element.remove();
  });
}

//Render Lists data From LocalStorage
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

//Render Task Data From Local Storage
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

//Task Template Call
function tasks(container, task) {
  const taskElement = document.importNode(taskTemplate.content, true);
  const inputField = taskElement.querySelector("textarea");
  inputField.id = task.id;
  inputField.append(task.name);
  container.appendChild(taskElement);
}

// Delete Single Task
document.addEventListener("click", (e) => {
  if (e.target.classList.contains("deletebtn")) {
    const selectedList = lists.find((list) => list.id === selectedListId);
    const NearestTaskcomponent = e.target.closest(".taskComponent");
    const ContentCon = e.target.closest(".contentContainer");
    const Content = ContentCon.querySelector("textarea").value;
    if (NearestTaskcomponent.classList.contains("todo")) {
      selectedList.task.todo = selectedList.task.todo.filter(
        (item) => item.name !== Content
      );
    } else if (NearestTaskcomponent.classList.contains("progress")) {
      selectedList.task.inprogress = selectedList.task.inprogress.filter(
        (item) => item.name !== Content
      );
    } else if (NearestTaskcomponent.classList.contains("done")) {
      selectedList.task.done = selectedList.task.done.filter(
        (item) => item.name !== Content
      );
    }
    saveandrender();
  }
});

// Task Done
document.addEventListener("click", (e) => {
  if (e.target.classList.contains("arrowbtn")) {
    const selectedList = lists.find((list) => list.id === selectedListId);
    const NearestTaskcomponent = e.target.closest(".taskComponent");
    const ContentCon = e.target.closest(".contentContainer");
    const Content = ContentCon.querySelector("textarea").value;
    let selectedItem = 0;
    if (NearestTaskcomponent.classList.contains("todo")) {
      selectedItem = selectedList.task.todo.findIndex(
        (item) => item.name === Content
      );
      if (selectedItem !== 1) {
        selectedList.task.inprogress.push(selectedList.task.todo[selectedItem]);
        selectedList.task.todo.splice(selectedItem, 1);
      }
    } else if (NearestTaskcomponent.classList.contains("progress")) {
      selectedItem = selectedList.task.inprogress.findIndex(
        (item) => item.name === Content
      );
      if (selectedItem !== 1) {
        selectedList.task.done.push(selectedList.task.inprogress[selectedItem]);
        selectedList.task.inprogress.splice(selectedItem, 1);
      }
    } else if (NearestTaskcomponent.classList.contains("done")) {
      if (selectedItem !== 1) {
        selectedList.task.done = selectedList.task.done.filter(
          (item) => item.name !== Content
        );
      }
    }
    saveandrender();
  }
});

//Delete All Tasks
let closest; //define closest to find the closest tack component and see which container to perform the operation on
document.addEventListener("click", (e) => {
  if (e.target.classList.contains("fa-trash")) {
    model.classList.remove("hide");
    model.classList.add("show");
    return (closest = e.target.closest(".taskComponent"));
  }
});
confirmbtn.addEventListener("click", (e) => {
  const selectedList = lists.find((list) => list.id === selectedListId);
  if (closest.classList.contains("todo")) {
    selectedList.task.todo = [];
  } else if (closest.classList.contains("progress")) {
    selectedList.task.inprogress = [];
  } else if (closest.classList.contains("done")) {
    selectedList.task.done = [];
  }
  model.classList.remove("show");
  model.classList.add("hide");
  saveandrender();
});
cancelbtn.addEventListener("click", () => {
  model.classList.remove("show");
  model.classList.add("hide");
});

//Sort Alphabetically
let asc = true; // declare to check if the sorting is ascending or desending
const byname = sortModel.querySelector(".byname");
const bydate = sortModel.querySelector(".bydate");
sortTaskButton.addEventListener("click", () => {
  sortModel.classList.toggle("show");
});
bydate.addEventListener("click", () => {
  const selectedList = lists.find((list) => list.id === selectedListId);
  const ascdec = bydate.querySelector(".ascOrdec");
  byname.classList.remove("checked");
  bydate.classList.add("checked");
  if (asc) {
    selectedList.task.todo.sort((a, b) => a.id.localeCompare(b.id));
    selectedList.task.inprogress.sort((a, b) => a.id.localeCompare(b.id));
    selectedList.task.done.sort((a, b) => a.id.localeCompare(b.id));
    ascdec.innerHTML = "Desc";
    asc = false;
  } else {
    selectedList.task.todo.sort((a, b) => b.id.localeCompare(a.id));
    selectedList.task.inprogress.sort((a, b) => b.id.localeCompare(a.id));
    selectedList.task.done.sort((a, b) => b.id.localeCompare(a.id));
    ascdec.innerHTML = "Asc";
    asc = true;
  }
  sortModel.classList.toggle("show");
  saveandrender();
});
byname.addEventListener("click", () => {
  const selectedList = lists.find((list) => list.id === selectedListId);
  const ascdec = byname.querySelector(".ascOrdec");
  bydate.classList.remove("checked");
  byname.classList.add("checked");
  if (asc) {
    selectedList.task.todo.sort((a, b) => a.name.localeCompare(b.name));
    selectedList.task.inprogress.sort((a, b) => a.name.localeCompare(b.name));
    selectedList.task.done.sort((a, b) => a.name.localeCompare(b.name));
    ascdec.innerText = "Desc";
    asc = false;
  } else {
    selectedList.task.todo.sort((a, b) => b.name.localeCompare(a.name));
    selectedList.task.inprogress.sort((a, b) => b.name.localeCompare(a.name));
    selectedList.task.done.sort((a, b) => b.name.localeCompare(a.name));
    ascdec.innerHTML = "Asc";
    asc = true;
  }
  sortModel.classList.toggle("show");
  saveandrender();
});

// Count number of Tasks and Display
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
let newlist = false;
pluslist.addEventListener("click", () => {
  pluslist.classList.toggle("open");
  inputlist.classList.toggle("open");
});
//Call the Render Function
render();
