const listContainer = document.querySelector("[data-lists]");
const newlistForm = document.querySelector("[data-new-list-form]");
const newlistInput = document.querySelector("[data-new-list-input]");
const deleteListButton = document.querySelector("[data-delete-list-button]");
const LOCAL_STORAGE_LIST_KEY = "tak.lists";
const LOCAL_STORAGE_SELECTED_LIST_ID_KEY = "task.selectedListId";
let lists = JSON.parse(localStorage.getItem(LOCAL_STORAGE_LIST_KEY)) || [];
let selectedListId = localStorage.getItem(LOCAL_STORAGE_SELECTED_LIST_ID_KEY);

listContainer.addEventListener("click", (e) => {
  console.log("click woeking");
  if (e.target.tagName.toLowerCase() === "li") {
    selectedListId = e.target.dataset.listId;
    saveandrender();
  }
});
deleteListButton.addEventListener("click", (e) => {});
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
  return { id: Date.now().toString(), name: name, task: [] };
}
function save() {
  localStorage.setItem(LOCAL_STORAGE_LIST_KEY, JSON.stringify(lists));
}
function saveandrender() {
  save();
  render();
}
function render() {
  clearElement(listContainer);
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
