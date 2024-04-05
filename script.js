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
const taskContainer = document.querySelectorAll("data-task-container-content");
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
function saveandrender() {
  save();
  render();
}
function save() {
  localStorage.setItem(LOCAL_STORAGE_LIST_KEY, JSON.stringify(lists));
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
      // countTask(selectedList);
      // clearElement(maintaskcontainer);
      // renderTasks(selectedList, maintaskcontainer);
    }
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
function renderTasks(selectedList, maintaskcontainer) {}

// function countTask(selectedList) {
//   const alltasktodocount = selectedList.task.todo.length;
//   const alltaskinprogresscount = selectedList.task.inprogress.length;
//   const alltaskdonecount = selectedList.task.done.length;
//   taskcontainerCounters.forEach((counter) => {
//     const NearestTaskcomponent = counter.closest("[data-task-container]");
//     if (NearestTaskcomponent.classList.contains("todo")) {
//       counter.innerHTML = alltasktodocount;
//     } else if (NearestTaskcomponent.classList.contains("progress")) {
//       counter.innerHTML = alltaskinprogresscount;
//     } else {
//       counter.innerHTML = alltaskdonecount;
//     }
//   });
// }
