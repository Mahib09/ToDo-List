// function addTextField() {
//   const content = document.querySelectorAll(".content");
//   content.forEach((e) => {
//     const button = e.querySelector("button");
//     button.addEventListener("click", createTextArea);
//     function createTextArea() {
//       const newText = document.createElement("textarea");
//       e.appendChild(newText);
//     }
//   });
// }
window.onload = addTextField;

function addTextField() {
  const buttons = document.querySelectorAll(".new-taskbutton");
  buttons.forEach((button) => {
    button.addEventListener("click", () => {
      const content = button.closest(".content");
      const contentContainer = document.createElement("div");
      contentContainer.setAttribute("class", "contentContainer");
      const newContent = `<textarea name="" id="" cols="30" rows="10"></textarea>
      <button class="deletebtn">X</button>`;
      contentContainer.innerHTML = newContent;
      content.insertBefore(contentContainer, button);
    });
  });
}
