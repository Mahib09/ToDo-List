const listContainer = document.querySelector("[data-lists]");
const lists = [];
const newlistForm = document.querySelector("[data-new-list-form]");
const newlistInput = document.querySelector("[data-new-list-input]");
function render() {
  clearElement(listContainer);
  lists.forEach((list) => {
    const listContent = document.createElement("li");
    listContainer.dataset.listId = list.id;
    listContent.classList.add("list");
    listContent.innerText = list.name;
    listContainer.appendChild(listContent);
  });
}
newlistForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const listname = newlistInput.value;
  if (listname === null || listname === "") {
    return;
  }
  const list = createList(listname);
  newlistInput.value = "";
  lists.push(list);
  render();
});
function clearElement(element) {
  while (element.firstChild) {
    element.removeChild(element.firstChild);
  }
}
function createList(name) {
  return { id: Date.now().toString(), name: name, task: [] };
}
